import type { LandingContent, TourPackagesContent } from "@/lib/landing-content";

const tourPackages: TourPackagesContent = {
  title: "Amazing Vietnam multi-destination tours",
  subtitle: "Comprehensive itineraries covering Vietnam's highlights in one package. Hanoi to Ho Chi Minh, mountains to beaches.",
  packages: [
    {
      id: "amazing-vietnam-5d4n",
      destination: "Hanoi, Halong Bay, Ninh Binh",
      duration: "5D4N",
      durationNights: 4,
      durationDays: 5,
      title: "Amazing Vietnam 5 days 4 nights",
      description: "Hanoi Old Quarter, Halong Bay overnight cruise, and Ninh Binh's Tam Coc rice paddies with full inclusions.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark on an Amazing Vietnam tour."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark on an Amazing Vietnam tour."
        },
        {
          src: "/tour/halong-bay.jpg",
          alt: "Halong Bay limestone islands and emerald water."
        },
        {
          src: "/tour/ninh-binh.jpg",
          alt: "Ninh Binh limestone scenery and river landscape."
        }
      ],
      priceOriginal: 6890000,
      priceSale: 5990000,
      highlights: ["5 days", "Hanoi", "Halong Bay cruise", "Ninh Binh", "All transfers"],
      accommodation: "4-star hotels + cruise cabin",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Accommodation", "Meals", "Halong cruise"],
      availability: 18,
      badge: "best-seller"
    },
    {
      id: "amazing-vietnam-7d6n",
      destination: "Hanoi, Sapa, Halong Bay",
      duration: "7D6N",
      durationNights: 6,
      durationDays: 7,
      title: "Amazing Vietnam 7 days 6 nights",
      description: "Hanoi heritage, Sapa mountain trails and hill tribes, plus Halong Bay 2-night cruise with train ticket included.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark before the northern Vietnam journey."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark before the northern Vietnam journey."
        },
        {
          src: "/tour/sapa.jpg",
          alt: "Sapa mountain scenery and terraced rice fields."
        },
        {
          src: "/tour/halong-bay.jpg",
          alt: "Halong Bay limestone islands and cruise route."
        }
      ],
      priceOriginal: 12500000,
      priceSale: 10990000,
      highlights: ["7 days", "Sapa 2 nights", "Halong 2-night cruise", "Fansipan cable car", "Train ticket"],
      accommodation: "4-star hotels + cruise + train",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Accommodation", "Meals", "Sapa train", "Cruise"],
      availability: 12,
      badge: "sale"
    },
    {
      id: "amazing-vietnam-6d5n",
      destination: "Da Nang, Hoi An, Hue",
      duration: "6D5N",
      durationNights: 5,
      durationDays: 6,
      title: "Amazing Vietnam 6 days 5 nights",
      description: "Central Vietnam heritage tour: Imperial Hue, UNESCO Hoi An old town, Da Nang beaches with private car support.",
      heroImage: {
        src: "/tour/da-nang.jpg",
        alt: "Da Nang coastal city and beach scenery."
      },
      galleryImages: [
        {
          src: "/tour/da-nang.jpg",
          alt: "Da Nang coastal city and beach scenery."
        },
        {
          src: "/tour/hoi-an.jpg",
          alt: "Hoi An ancient town with lanterns and historic architecture."
        },
        {
          src: "/tour/hue-imperial-citadel.jpg",
          alt: "Hue Imperial Citadel heritage landmark."
        }
      ],
      priceOriginal: 8900000,
      priceSale: 7790000,
      highlights: ["6 days", "Hue Imperial Citadel", "Hoi An UNESCO town", "Da Nang beach", "Private car"],
      accommodation: "4-star beach hotels",
      inclusions: ["All entrance fees", "Tour guide", "Private transfers", "Accommodation", "Meals"],
      availability: 20
    },
    {
      id: "amazing-vietnam-10d9n",
      destination: "Hanoi, Halong, Da Nang, Hoi An, Ho Chi Minh, Mekong",
      duration: "10D9N",
      durationNights: 9,
      durationDays: 10,
      title: "Amazing Vietnam 10 days 9 nights",
      description: "Complete Vietnam highlights from North to South: Hanoi, Halong Bay cruise, Hoi An, Hue, Ho Chi Minh City, and Mekong Delta floating market.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark starting a full Vietnam highlights route."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark starting a full Vietnam highlights route."
        },
        {
          src: "/tour/halong-bay.jpg",
          alt: "Halong Bay limestone islands on the northern route."
        },
        {
          src: "/tour/hoi-an.jpg",
          alt: "Hoi An ancient town stop on the central Vietnam route."
        },
        {
          src: "/tour/mekong.jpg",
          alt: "Mekong Delta river scenery on the southern route."
        }
      ],
      priceOriginal: 18500000,
      priceSale: 15990000,
      highlights: ["10 days", "All regions covered", "Halong Bay cruise", "Mekong Delta", "Domestic flight"],
      accommodation: "4-star hotels + cruise",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Domestic flight", "Accommodation", "Meals", "Halong cruise"],
      availability: 8,
      badge: "limited"
    }
  ],
  showPriceRange: true,
  sortOptions: ["popular", "price-asc", "price-desc", "destination"]
};

export const b2cContent: LandingContent = {
  brand: "Chalo Travel",
  variantLabel: "B2C Vietnam Tours",
  language: "en",
  hero: {
    eyebrow: "Best-value Vietnam tours",
    title: "Book Vietnam tours faster",
    titleAccent: "with clear prices.",
    description:
      "Package tours from VND 2,490,000 with 5-minute consultation, clear itineraries, and flexible date support for families, couples, and friends.",
    primaryCta: "View tours and prices",
    secondaryCta: "Get free advice",
    image: {
      src: "/b2b-hero-vietnam-tour.jpg",
      alt: "Travelers enjoying Vietnam mountain and coastal scenery on a package tour.",
      eyebrow: "Serving 15,000+ travelers per year",
      contextLabel: "Vietnam Tours",
      title: "Good prices, clear plans, fast support",
      description: "Choose the right tour, leave your details, and get advice within 15 minutes.",
      highlights: ["Transparent pricing", "24/7 support", "Flexible date changes"]
    }
  },
  stats: [
    { value: "15,000+", label: "travelers/year" },
    { value: "< 5 min", label: "average response" },
    { value: "4.8/5", label: "post-trip rating" },
    { value: "15%", label: "average savings" }
  ],
  showcase: {
    primaryLabel: "Featured tours",
    secondaryLabel: "Weekly best-value deals"
  },
  sections: {
    featuresTitle: "An easier tour booking journey from the first step",
    featuresCopy: "Built around clear pricing, trust signals, and fast booking for individual travelers.",
    faqTitle: "Frequently asked questions",
    faqCopy: "What travelers usually ask before confirming a trip."
  },
  tourPackages,
  trustMetrics: [
    { icon: "bar-chart", value: "15,000+", label: "travelers/year" },
    { icon: "zap", value: "< 5 min", label: "average response" },
    { icon: "star", value: "4.8/5", label: "CSAT rating" },
    { icon: "wallet", value: "15%", label: "average savings" },
    { icon: "shield", value: "100%", label: "secure payment" },
    { icon: "heart", value: "98%", label: "satisfaction rate" }
  ],
  testimonials: [
    {
      quote: "Clean hotel, punctual transfers, and a schedule with enough rest. My family will book again.",
      authorName: "Hoang Nam Tran",
      authorLocation: "Ho Chi Minh City",
      tripInfo: "Amazing Vietnam 10 Days 9 Nights",
      rating: 4.8
    },
    {
      quote: "Everything was well-organized. The Hanoi city tour, Da Nang beaches, and Hoi An ancient town made this trip unforgettable. Excellent value for money!",
      authorName: "Minh Chau Vo",
      authorLocation: "Hanoi",
      tripInfo: "Amazing Vietnam 6 Days 5 Nights",
      rating: 4.9
    },
    {
      quote: "This 7-day tour covered all of Vietnam's highlights. From Ha Long Bay to Mekong Delta, every day was an adventure. The guide was knowledgeable and friendly.",
      authorName: "James Wilson",
      authorLocation: "Singapore",
      tripInfo: "Amazing Vietnam 7 Days 6 Nights",
      rating: 4.8
    }
  ],
  features: [
    {
      title: "Clear prices from the start",
      description: "Each tour shows the original price, deal price, matching destinations, and included services."
    },
    {
      title: "Consultation within 5 minutes",
      description: "Submit your details once, then the Chalo Travel team calls back to hold seats and confirm dates."
    },
    {
      title: "Flexible date changes",
      description: "Date-change support follows each tour policy and prioritizes low-extra-cost options for travelers."
    },
    {
      title: "Vetted local partners",
      description: "Hotels, vehicles, guides, and attractions are reviewed route by route."
    }
  ],
  proof: {
    title: "Better prices without cutting trip quality",
    description:
      "Chalo Travel works directly with local suppliers to reduce middle layers while keeping clear itineraries and support before, during, and after the trip."
  },
  finalCta: {
    eyebrow: "Get free tour advice",
    title: "Pick a tour you like. Chalo Travel will confirm availability and quote within 15 minutes.",
    description:
      "No need to call multiple agencies. Leave your email, phone number, and preferred tour, then an advisor will follow up with a suitable itinerary."
  },
  leadForm: {
    submitLabel: "Get tour advice",
    successMessage: "Thank you. Chalo Travel will contact you within 15 minutes.",
    errorSummary: "Please check your tour request details.",
    fields: {
      workEmail: {
        label: "Email",
        placeholder: "you@example.com"
      }
    },
    validationMessages: {
      workEmailInvalid: "Please enter a valid email address."
    }
  },
  faq: [
    {
      question: "Do best-value tours still keep good quality?",
      answer:
        "Yes. Every tour clearly lists hotels, transport, meals, and attractions. An advisor confirms the services again before you pay."
    },
    {
      question: "Can I change the travel date after booking?",
      answer:
        "Date changes depend on each tour's policy and hotel or vehicle availability. Chalo Travel prioritizes the lowest-extra-cost option for you."
    },
    {
      question: "Is payment secure?",
      answer:
        "You can pay by bank transfer or a verified payment gateway. Personal information is used only for consultation and seat holding."
    },
    {
      question: "Are private tours available for families or friend groups?",
      answer:
        "Yes. Choose Private consultation in the form and we will suggest an itinerary, hotel, and vehicle setup for your group size."
    }
  ],
  footer: {
    description: "Best-value Vietnam tours with clear itineraries and fast advice for individual travelers.",
    nav: [
      { label: "Featured tours", href: "#packages" },
      { label: "Reviews", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
      { label: "Consultation", href: "#contact" }
    ],
    utilityLinks: [{ label: "View tours now", href: "#packages" }],
    copyright: "© 2026 Chalo Travel. All rights reserved."
  },
  seo: {
    title: "Best-Value Vietnam Tours | Chalo Travel 2026",
    description:
      "Vietnam tours from VND 2,490,000 with clear pricing, 24/7 support, flexible date changes, and 15,000+ travelers served every year.",
    ogImagePath: "/og-image-b2c-tours.svg"
  }
};

export function getB2CVietnamToursContent(): LandingContent {
  return b2cContent;
}
