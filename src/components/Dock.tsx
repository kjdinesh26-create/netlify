'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './Dock.module.css';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  mouseX: any;
  baseSize: number;
  magnification: number;
}

function DockIcon({ icon, label, onClick, mouseX, baseSize, magnification }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform<number, number>(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || val === Infinity) return Infinity;
    return val - bounds.left - bounds.width / 2;
  });

  const sizeValue = useTransform(distance, [-150, 0, 150], [baseSize, magnification, baseSize]);
  const size = useSpring(sizeValue, {
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className={styles.dockItem}
      style={{ width: size, height: size }}
    >
      <div className={styles.tooltip}>{label}</div>
      {icon}
    </motion.div>
  );
}

interface DockProps {
  items: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
}

export default function Dock({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className={styles.dockWrapper}>
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className={styles.dockContainer}
        style={{ height: panelHeight }}
      >
        {items.map((item, index) => (
          <DockIcon
            key={index}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            baseSize={baseItemSize}
            magnification={magnification}
          />
        ))}
      </motion.div>
    </div>
  );
}
