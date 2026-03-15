import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";

export default function EncryptedTextDemoSecond() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <p className="mx-auto max-w-lg py-10 text-center font-mono text-xl">
        <EncryptedText
          text="Welcome to the Matrix, Neo."
          encryptedClassName="text-neutral-500"
          revealedClassName="dark:text-white text-black"
          revealDelayMs={50}
        />
      </p>
    </div>
  );
}
