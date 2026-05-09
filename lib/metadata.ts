import type { Metadata } from "next";
import type { LandingContent } from "@/lib/landing-content";

function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export function createLandingMetadata(content: LandingContent): Metadata {
  const siteUrl = getSiteUrl();
  const images = siteUrl
    ? [
        {
          url: new URL(content.seo.ogImagePath, siteUrl).toString(),
          width: 1200,
          height: 630,
          alt: `${content.brand} landing page preview`
        }
      ]
    : undefined;

  return {
    ...(siteUrl ? { metadataBase: siteUrl } : {}),
    title: content.seo.title,
    description: content.seo.description,
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      siteName: content.brand,
      type: "website",
      ...(images ? { images } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      ...(images ? { images: images.map((image) => image.url) } : {})
    }
  };
}
