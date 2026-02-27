import type { Metadata } from "next";
import Header from "./Header";

export const metadata: Metadata = {
  title: "Dirk Trackchasing",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Header>
          {children}
        </Header>
      </body>
    </html>
  );
}
