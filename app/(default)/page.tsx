import type { Metadata } from "next";
import { B2BLandingPage } from "@/components/b2b/landing-page";
import { B2CLandingPage } from "@/components/b2c/landing-page";
import { b2bContent } from "@/lib/b2b/content";
import { contents } from "@/lib/content";
import { createLandingMetadata } from "@/lib/metadata";
import { resolveVariant } from "@/lib/variant";

export function generateMetadata(): Metadata {
  const variant = resolveVariant(process.env.LANDING_VARIANT);
  return createLandingMetadata(contents[variant]);
}

export default function HomePage() {
  const variant = resolveVariant(process.env.LANDING_VARIANT);

  if (variant === "b2b") {
    return (
      <div lang={b2bContent.language}>
        <B2BLandingPage content={b2bContent} />
      </div>
    );
  }

  return (
    <div lang={contents.b2c.language}>
      <B2CLandingPage content={contents.b2c} />
    </div>
  );
}
