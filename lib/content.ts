import type { Variant } from "@/lib/variant";
import type { LandingContent } from "@/lib/landing-content";
import { b2bContent } from "@/lib/b2b/content";
import { b2cContent } from "@/lib/b2c/content";

export type { LandingContent } from "@/lib/landing-content";
export { b2bContent, b2cContent };

export const contents: Record<Variant, LandingContent> = {
  b2b: b2bContent,
  b2c: b2cContent
};
