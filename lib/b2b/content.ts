import type { B2BLandingContent } from "@/lib/landing-content";

const shared = {
  brand: "Chalo"
};

const defaultHeroHeadline = {
  id: "default-lowest-price",
  title: "Lowest-price Vietnam tours",
  titleAccent: "direct from Vietnam"
} as const;

export const b2bContent: B2BLandingContent = {
  ...shared,
  logo: {
    src: "/logo/chalo-logo-transparent.png",
    alt: "ChaloTrip Travel Company"
  },
  variantLabel: "B2B Partners",
  language: "en",
  navigation: {
    links: [
      { label: "Proof", href: "#partner-fit" },
      { label: "Guest types", href: "#traveler-types" },
      { label: "Process", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" }
    ],
    cta: { label: "Get partner rates", href: "#contact" }
  },
  hero: {
    eyebrow: "Lowest local rates. Directly operated in Vietnam.",
    title: defaultHeroHeadline.title,
    titleAccent: defaultHeroHeadline.titleAccent,
    headlineVariants: [
      defaultHeroHeadline,
      {
        id: "direct-operator",
        title: "Direct Vietnam operator",
        titleAccent: "for better local rates"
      },
      {
        id: "image-first-sell",
        title: "Beautiful Vietnam tours",
        titleAccent: "without middleman markup"
      }
    ],
    description:
      "No middleman. Just direct Vietnam pricing, beautiful routes, and real local execution for private, family, and group tours.",
    primaryCta: "Get partner rates",
    secondaryCta: "View tour gallery",
    trustSignals: [
      { label: "Direct Vietnam operator" },
      { label: "No middleman markup" },
      { label: "Private, family, group tours" }
    ],
    overlay: {
      eyebrow: "Why our rates stay low",
      title: "Direct local operation, not reseller pricing",
      details: [
        {
          label: "Rate model",
          value: "Quoted by our Vietnam team"
        },
        {
          label: "Tour types",
          value: "Private, family, and group tours"
        },
        {
          label: "Support",
          value: "Before, during, and after the trip"
        }
      ],
      highlights: [
        "Direct local pricing",
        "Fast quotation decisions",
        "Guest support on the ground"
      ]
    },
    image: {
      src: "/tour/group-vin.jpg",
      alt: "International group travelers enjoying a Vietnam tour hosted by the local Chalo team.",
      eyebrow: "Real guests on tour",
      contextLabel: "Direct Vietnam operator",
      title: "Beautiful routes. Real travelers.",
      description:
        "Sell Vietnam with strong imagery, direct local rates, and a team that runs the trip on the ground.",
      highlights: [
        "North, central, and south Vietnam",
        "Culture, nature, and beach flow",
        "Private, family, and group formats"
      ]
    }
  },
  stats: [
    { value: "Lowest rates", label: "local operator pricing" },
    { value: "No middleman", label: "quoted in Vietnam" },
    { value: "Direct team", label: "run by Chalo locally" },
    { value: "Guest-ready", label: "private, family, and group tours" }
  ],
  showcase: {
    primaryLabel: "Request flow",
    secondaryLabel: "Partner support"
  },
  sections: {
    featuresTitle: "Built for Vietnam travel partners",
    featuresCopy:
      "A dedicated B2B source keeps Chalo's partner positioning, consultation workflow, and support promises clear.",
    faqTitle: "Quick questions, short answers",
    faqCopy:
      "The sales message is simple because the operating model is direct."
  },
  features: [
    {
      title: "Best-value planning",
      description: "Shape practical Vietnam routes around your market, traveler profile, timing, and budget."
    },
    {
      title: "Fast, clear consultation",
      description: "Share the request and get direct guidance on routes, inclusions, exclusions, and next steps."
    },
    {
      title: "Local Vietnam support",
      description: "Coordinate with a team that understands Vietnam suppliers, routing, and guest support needs."
    }
  ],
  proof: {
    title: "Built for agent requests across traveler types",
    description:
      "Chalo supports travel partners with practical consultation for FIT, family, group, honeymoon, and leisure itineraries across Vietnam."
  },
  trustBand: {
    eyebrow: "Why partners choose Chalo",
    title: "Lower rates, direct control, local execution",
    description:
      "The offer is straightforward: we sell and run the tour in Vietnam ourselves, so pricing and decisions stay closer to the ground.",
    signals: [
      {
        title: "Lowest local rates",
        description:
          "Direct operator pricing without reseller layers."
      },
      {
        title: "Direct Vietnam operator",
        description:
          "One local team quotes, confirms, and runs the trip."
      },
      {
        title: "Real guest support",
        description:
          "Private, family, and group travelers are handled on the ground."
      }
    ]
  },
  partnerFit: {
    title: "Beautiful tours your clients actually want to book",
    description:
      "Lead with strong Vietnam imagery, then back it up with direct local pricing and local tour operation."
  },
  travelerTypes: {
    title: "Guest types we run most",
    description:
      "Keep the sales pitch short. The route still stays flexible.",
    items: [
      {
        title: "Private FIT",
        description: "Fast-moving routes with direct local rate control."
      },
      {
        title: "Families",
        description: "Comfortable pacing, photogenic stops, and easy logistics."
      },
      {
        title: "Small groups",
        description: "Directly operated departures with clear local handling."
      }
    ]
  },
  howItWorks: {
    title: "Short process, net rates first",
    description:
      "Collect the trip basics, receive our net rates, then add your own margin before offering the package to clients.",
    media: {
      src: "/b2b-operations-partners.jpg",
      alt: "Travel guests and partners hosted in Vietnam by the local Chalo operations team.",
      eyebrow: "Guests already on tour",
      title: "Real trips, directly handled in Vietnam",
      description:
        "The same local team quotes the trip and supports the guests on the ground."
    },
    steps: [
      {
        title: "Send the trip basics",
        description: "Share the number of guests, travel dates, and number of days."
      },
      {
        title: "Receive net rates",
        description: "We reply with our direct net rates from the Vietnam team."
      },
      {
        title: "Add your markup",
        description: "You add your own margin, offer the package, and we operate the trip locally."
      }
    ]
  },
  tourStyles: {
    title: "Image-led Vietnam routes",
    description:
      "Use these route styles to sell faster with less explanation.",
    items: [
      {
        title: "Vietnam highlights",
        description: "Classic first-timer route with big visual appeal."
      },
      {
        title: "Northern nature",
        description: "Mountains, rivers, and limestone scenery."
      },
      {
        title: "Central heritage",
        description: "Lantern streets, cuisine, and culture."
      },
      {
        title: "Southern escape",
        description: "City, delta, and lighter pacing."
      },
      {
        title: "Beach extension",
        description: "Easy finish with resort downtime."
      },
      {
        title: "Private family trips",
        description: "Flexible pace with direct local handling."
      }
    ]
  },
  serviceCommitments: {
    title: "Why our price stays lower",
    description:
      "The model is direct, so the message stays simple.",
    items: [
      {
        title: "No middleman layers",
        description: "Rates come from our Vietnam operation, not a reseller chain."
      },
      {
        title: "Direct local decisions",
        description: "Faster changes on route flow, services, and guest handling."
      },
      {
        title: "Real on-ground team",
        description: "The people who quote the tour are close to the team that runs it."
      }
    ]
  },
  finalCta: {
    eyebrow: "Get direct rates",
    title: "Send the trip basics. Get net rates back.",
    description:
      "Please share the number of guests, travel dates, and number of days. Once we receive the details, we will send our net rates."
  },
  stickyCta: {
    label: "Get net rates",
    href: "#contact",
    ariaLabel: "Get direct net rates from Chalo"
  },
  leadForm: {
    submitLabel: "Get net rates",
    successMessage: "Thanks. We will review the trip details and send our net rates by email.",
    errorSummary:
      "Please enter your work email, number of guests, travel dates, and number of days.",
    helperText:
      "Once we receive the details, we will send you our net rates. You can then add your own markup or margin before offering the package to your clients.",
    fields: {
      workEmail: {
        label: "Work email",
        placeholder: "Your work email"
      },
      guestCount: {
        label: "Number of guests",
        placeholder: "e.g. 12"
      },
      travelDates: {
        label: "Travel dates",
        placeholder: "e.g. 12 Aug 2026 - 18 Aug 2026"
      },
      numberOfDays: {
        label: "Number of days",
        placeholder: "e.g. 7"
      }
    },
    validationMessages: {
      workEmailInvalid: "Please enter a valid work email address.",
      guestCountInvalid: "Please enter a valid number of guests.",
      travelDatesInvalid: "Please enter the travel dates.",
      numberOfDaysInvalid: "Please enter a valid number of days."
    }
  },
  faq: [
    {
      question: "Do you operate tours directly in Vietnam?",
      answer:
        "Yes. Chalo is the local operator, not a middleman reseller."
    },
    {
      question: "Can you support private, family, and group tours?",
      answer:
        "Yes. Those are the main B2B request types we handle."
    },
    {
      question: "Why are your rates lower?",
      answer:
        "Because pricing is quoted locally in Vietnam without reseller layers on top."
    },
    {
      question: "Can you customize the itinerary?",
      answer:
        "Yes. Dates, route flow, hotel level, and travel pace can all be adjusted."
    },
    {
      question: "How fast can you quote?",
      answer:
        "For straightforward requests, we aim to reply fast with direct local pricing."
    }
  ],
  footer: {
    description:
      "Lowest-price Vietnam tours directly operated in Vietnam for travel agents and trade partners.",
    nav: [
      { label: "Proof", href: "#partner-fit" },
      { label: "Guest types", href: "#traveler-types" },
      { label: "Process", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" }
    ],
    utilityLinks: [
      { label: "Get rates", href: "#contact" },
      { label: "Email team", href: "#contact" }
    ],
    partnerMarquee: {
      items: [
        "Booking.com",
        "Agoda",
        "Trip.com",
        "Klook",
        "Traveloka",
        "Viator",
        "GetYourGuide",
        "Expedia TAAP",
        "TBO Holidays",
        "MakeMyTrip"
      ]
    },
    copyright: "© 2026 Chalo. All rights reserved."
  },
  seo: {
    title: "Chalo | Lowest-price Vietnam tours direct from local operator",
    description:
      "Lowest-price Vietnam tours directly operated in Vietnam. Fast B2B quotation for private, family, and group travel with no middleman.",
    ogImagePath: "/og-image.svg"
  }
};
