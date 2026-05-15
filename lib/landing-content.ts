export interface ActionLink {
  label: string;
  href: string;
}

export interface HeroTrustSignal {
  label: string;
}

export interface LandingHeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  headlineVariants?: LandingHeadlineVariant[];
  description: string;
  primaryCta: string;
  secondaryCta: string;
  trustSignals?: HeroTrustSignal[];
  overlay?: LandingHeroOverlayContent;
  image?: LandingHeroImageContent;
}

export interface LandingHeadlineVariant {
  id: string;
  title: string;
  titleAccent: string;
}

export interface LandingHeroOverlayDetail {
  label: string;
  value: string;
}

export interface LandingHeroOverlayContent {
  eyebrow: string;
  title: string;
  details: LandingHeroOverlayDetail[];
  highlights: string[];
}

export interface LandingHeroImageContent {
  src?: string;
  alt?: string;
  eyebrow: string;
  contextLabel?: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface LandingLogoContent {
  src: string;
  alt: string;
}

export interface LandingSectionMediaContent {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
}

export interface LandingStat {
  value: string;
  label: string;
}

export interface LandingFeature {
  title: string;
  description: string;
}

export interface LandingFaqItem {
  question: string;
  answer: string;
}

export interface LandingShowcase {
  primaryLabel: string;
  secondaryLabel: string;
}

export interface LandingSectionIntro {
  title: string;
  description: string;
}

export interface LandingTrustBandContent {
  eyebrow: string;
  title: string;
  description: string;
  signals: LandingFeature[];
}

export interface LandingStep {
  title: string;
  description: string;
}

export interface LandingFooterContent {
  description: string;
  nav: ActionLink[];
  utilityLinks?: ActionLink[];
  partnerMarquee?: {
    items: string[];
  };
  copyright: string;
}

export interface LandingSeoContent {
  title: string;
  description: string;
  ogImagePath: string;
  canonical?: string;
}

export interface TourPackage {
  id: string;
  destination: string;
  duration: string;
  durationNights: number;
  durationDays: number;
  title: string;
  description: string;
  overview: string;
  heroImage: {
    src: string;
    alt: string;
  };
  galleryImages?: {
    src: string;
    alt: string;
  }[];
  priceOriginal: number;
  priceSale: number;
  priceCurrency: "USD";
  highlights: string[];
  accommodation: string;
  inclusions: string[];
  itineraryDays: TourItineraryDay[];
  availability: number;
  badge?: "best-seller" | "limited" | "sale";
}

export interface TourItineraryDay {
  dayLabel: string;
  title: string;
  description: string;
}

export interface TourPackagesContent {
  title: string;
  subtitle: string;
  packages: TourPackage[];
  showPriceRange: boolean;
  sortOptions: ("popular" | "price-asc" | "price-desc" | "destination")[];
}

export interface LandingTestimonial {
  quote: string;
  authorName: string;
  authorLocation: string;
  tripInfo: string;
  rating: number;
  avatarSrc?: string;
  albumImages?: {
    src: string;
    alt: string;
  }[];
}

export interface LandingTrustMetric {
  icon: string;
  value: string;
  label: string;
}

export interface LandingStickyCtaContent {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface LandingLeadFormFieldContent {
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface LandingLeadFormContent {
  submitLabel: string;
  successMessage: string;
  errorSummary: string;
  helperText?: string;
  fields: {
    workEmail: LandingLeadFormFieldContent;
    guestCount?: LandingLeadFormFieldContent;
    travelDates?: LandingLeadFormFieldContent;
    numberOfDays?: LandingLeadFormFieldContent;
    numberOfPeople?: LandingLeadFormFieldContent;
    travelMonth?: LandingLeadFormFieldContent;
    travelDate?: LandingLeadFormFieldContent;
    numberOfNights?: LandingLeadFormFieldContent;
    notes?: LandingLeadFormFieldContent;
    phone?: LandingLeadFormFieldContent;
    city?: LandingLeadFormFieldContent;
    destinations?: LandingLeadFormFieldContent;
  };
  validationMessages: {
    workEmailInvalid: string;
    guestCountInvalid?: string;
    travelDatesInvalid?: string;
    numberOfDaysInvalid?: string;
    numberOfPeopleInvalid?: string;
    travelMonthInvalid?: string;
    travelDateInvalid?: string;
    numberOfNightsInvalid?: string;
    phoneInvalid?: string;
    cityInvalid?: string;
    destinationsInvalid?: string;
    notesTooLong?: string;
  };
}

export interface LandingContent {
  brand: string;
  logo?: LandingLogoContent;
  variantLabel: string;
  language: "en" | "vi";
  navigation?: {
    links: ActionLink[];
    cta: ActionLink;
  };
  hero: LandingHeroContent;
  stats: LandingStat[];
  showcase: LandingShowcase;
  sections: {
    featuresTitle: string;
    featuresCopy: string;
    faqTitle: string;
    faqCopy?: string;
  };
  features: LandingFeature[];
  proof: {
    title: string;
    description: string;
  };
  trustBand?: LandingTrustBandContent;
  partnerFit?: LandingSectionIntro;
  travelerTypes?: LandingSectionIntro & {
    items: LandingFeature[];
  };
  howItWorks?: LandingSectionIntro & {
    steps: LandingStep[];
    media?: LandingSectionMediaContent;
  };
  tourStyles?: LandingSectionIntro & {
    items: LandingFeature[];
  };
  serviceCommitments?: LandingSectionIntro & {
    items: LandingFeature[];
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
  stickyCta?: LandingStickyCtaContent;
  leadForm?: LandingLeadFormContent;
  tourPackages?: TourPackagesContent;
  testimonials?: LandingTestimonial[];
  trustMetrics?: LandingTrustMetric[];
  faq: LandingFaqItem[];
  footer?: LandingFooterContent;
  seo: LandingSeoContent;
}

export interface B2BLandingContent extends LandingContent {
  navigation: {
    links: ActionLink[];
    cta: ActionLink;
  };
  partnerFit: LandingSectionIntro;
  travelerTypes: LandingSectionIntro & {
    items: LandingFeature[];
  };
  howItWorks: LandingSectionIntro & {
    steps: LandingStep[];
    media?: LandingSectionMediaContent;
  };
  hero: LandingHeroContent & {
    headlineVariants: LandingHeadlineVariant[];
    overlay: LandingHeroOverlayContent;
    image: LandingHeroImageContent & {
      src: string;
      alt: string;
    };
  };
  trustBand: LandingTrustBandContent;
  tourStyles: LandingSectionIntro & {
    items: LandingFeature[];
  };
  serviceCommitments: LandingSectionIntro & {
    items: LandingFeature[];
  };
  stickyCta: LandingStickyCtaContent;
  leadForm: LandingLeadFormContent;
  footer: LandingFooterContent;
}
