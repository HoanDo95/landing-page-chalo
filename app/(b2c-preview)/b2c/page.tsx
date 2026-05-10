import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { B2CLandingPage } from "@/components/b2c/landing-page";
import { b2cContent } from "@/lib/b2c/content";
import { createLandingMetadata } from "@/lib/metadata";
import { resolveVariant } from "@/lib/variant";

export const metadata: Metadata = createLandingMetadata(b2cContent);

export default function B2CPage() {
  if (process.env.NODE_ENV === "production") {
    const deploymentVariant = resolveVariant(process.env.LANDING_VARIANT);

    if (deploymentVariant !== "b2c") {
      notFound();
    }

    permanentRedirect("/");
  }

  return (
    <div lang={b2cContent.language}>
      <B2CLandingPage content={b2cContent} />
    </div>
  );
}
