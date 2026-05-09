import type { ReactNode } from "react";
import { contents } from "@/lib/content";
import { resolveVariant } from "@/lib/variant";
import "../globals.css";

export default function DefaultRootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const variant = resolveVariant(process.env.LANDING_VARIANT);

  return (
    <html lang={contents[variant].language}>
      <body>{children}</body>
    </html>
  );
}
