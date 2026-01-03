// 'use client'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dirk Trackchasing",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
