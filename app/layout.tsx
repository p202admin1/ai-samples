import React from "react";
import type { Metadata } from "next";
import Navigation from './components/Navigation';
import {navLinks} from "./links";


export const metadata: Metadata = {
  title: "AI Samples",
  description: "LOL wut",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <React.StrictMode>
        <Navigation links={navLinks} />
        {children}
      </React.StrictMode>
      </body>
    </html>
  );
}
