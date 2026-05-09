import type { ReactNode } from "react";
import "../globals.css";

export default function B2BPreviewRootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
