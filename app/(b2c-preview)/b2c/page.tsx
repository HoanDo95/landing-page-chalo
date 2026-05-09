import type { Metadata } from "next";
import { B2CLandingPage } from "@/components/b2c/landing-page";
import { b2cContent } from "@/lib/b2c/content";
import { createLandingMetadata } from "@/lib/metadata";

export const metadata: Metadata = createLandingMetadata(b2cContent);

export default function B2CPage() {
  return (
    <div lang={b2cContent.language}>
      <B2CLandingPage content={b2cContent} />
    </div>
  );
}
