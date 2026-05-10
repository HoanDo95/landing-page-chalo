import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { B2BLandingPage } from "@/components/b2b/landing-page";
import { b2bContent } from "@/lib/b2b/content";
import { createLandingMetadata } from "@/lib/metadata";
import { resolveVariant } from "@/lib/variant";

export const metadata: Metadata = createLandingMetadata(b2bContent);

export default function B2BPage() {
  if (process.env.NODE_ENV === "production") {
    const deploymentVariant = resolveVariant(process.env.LANDING_VARIANT);

    if (deploymentVariant !== "b2b") {
      notFound();
    }

    permanentRedirect("/");
  }

  return (
    <div lang={b2bContent.language}>
      <B2BLandingPage content={b2bContent} />
    </div>
  );
}
