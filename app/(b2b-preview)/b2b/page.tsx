import type { Metadata } from "next";
import { B2BLandingPage } from "@/components/b2b/landing-page";
import { b2bContent } from "@/lib/b2b/content";
import { createLandingMetadata } from "@/lib/metadata";

export const metadata: Metadata = createLandingMetadata(b2bContent);

export default function B2BPage() {
  return (
    <div lang={b2bContent.language}>
      <B2BLandingPage content={b2bContent} />
    </div>
  );
}
