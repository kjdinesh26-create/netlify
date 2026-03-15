import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dineshkumar K J | Portfolio",
  description:
    "Portfolio of Dineshkumar K J — B.Tech IT student, full-stack developer, and ML enthusiast. Explore my projects, skills, and get in touch.",
  keywords: [
    "Dineshkumar K J",
    "Portfolio",
    "B.Tech IT",
    "Full Stack Developer",
    "Machine Learning",
    "JavaScript",
    "Python",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Dinesh Kumar" }],
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
