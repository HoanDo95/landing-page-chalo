import type { ReactNode } from "react";
import "../globals.css";

export default function B2CPreviewRootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
