import type { B2BLandingContent } from "@/lib/landing-content";

const shared = {
  brand: "Chalo"
};

const defaultHeroHeadline = {
  id: "default-best-value",
  title: "Best-value Vietnam tours",
  titleAccent: "for travel partners"
} as const;

export const b2bContent: B2BLandingContent = {
  ...shared,
  logo: {
    src: "/chalo-logo-transparent.png",
    alt: "ChaloTrip Travel Company"
  },
  variantLabel: "B2B Partners",
  language: "en",
  navigation: {
    links: [
      { label: "Partners", href: "#partner-fit" },
      { label: "Traveler types", href: "#traveler-types" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" }
    ],
    cta: { label: "Talk to a specialist", href: "#contact" }
  },
  hero: {
    eyebrow: "Vietnam tour partner for global travel agents",
    title: defaultHeroHeadline.title,
    titleAccent: defaultHeroHeadline.titleAccent,
    headlineVariants: [
      defaultHeroHeadline,
      {
        id: "flexible-itineraries",
        title: "Flexible Vietnam itineraries",
        titleAccent: "for travel partners worldwide"
      },
      {
        id: "fast-booking-support",
        title: "Fast, clear Vietnam booking support",
        titleAccent: "for travel partners"
      }
    ],
    description:
      "Work with a local Vietnam team that helps you plan flexible FIT, family, group, honeymoon, and leisure itineraries with fast consultation and clear booking support.",
    primaryCta: "Talk to a specialist",
    secondaryCta: "Explore tour styles",
    overlay: {
      eyebrow: "Sample itinerary brief",
      title: "Partner-ready planning at a glance",
      details: [
        {
          label: "Source market",
          value: "Australia, North America, Europe, and Asia"
        },
        {
          label: "Traveler mix",
          value: "FIT, families, honeymoon travelers, and small groups"
        },
        {
          label: "Route direction",
          value: "Ha Noi -> Ha Long -> Hoi An -> Ho Chi Minh City"
        }
      ],
      highlights: [
        "Fast quotation framing",
        "Flexible hotel and service levels",
        "Local support before arrival"
      ]
    },
    image: {
      src: "/b2b-hero-vietnam-tour.jpg",
      alt: "Golden Bridge in Da Nang at sunset with mountain and coastal views across central Vietnam.",
      eyebrow: "Vietnam destination window",
      contextLabel: "Vietnam route planning",
      title: "Flexible Vietnam routes",
      description:
        "Shape practical Vietnam itineraries around budget, timing, traveler mix, and service level.",
      highlights: [
        "Ha Noi and Ha Long Bay",
        "Central heritage and coastal stops",
        "Southern city and leisure extensions"
      ]
    }
  },
  stats: [
    { value: "Best value", label: "Vietnam tour pricing" },
    { value: "Fast quote", label: "clear B2B response" },
    { value: "Local team", label: "supplier-grounded support" }
  ],
  showcase: {
    primaryLabel: "Request flow",
    secondaryLabel: "Partner support"
  },
  sections: {
    featuresTitle: "Built for Vietnam travel partners",
    featuresCopy:
      "A dedicated B2B source keeps Chalo's partner positioning, consultation workflow, and support promises clear.",
    faqTitle: "A few final questions",
    faqCopy:
      "Quick answers before you send a request. Keep the brief simple and the team will help shape the next step."
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
    eyebrow: "Trusted operating scope",
    title: "Built for travel agents, operators, DMC partners, and wholesalers across multiple source markets",
    description:
      "Partner with a Vietnam team that keeps communication clear, itineraries flexible, and local coordination close at hand.",
    signals: [
      {
        title: "Fast quotation support",
        description:
          "Consultation stays clear on route shape, service level, and next-step decisions."
      },
      {
        title: "Flexible itinerary shaping",
        description:
          "Programs can adjust around traveler type, pacing, and market-specific expectations."
      },
      {
        title: "Local Vietnam coordination",
        description:
          "On-ground planning and supplier alignment stay with a destination-based support team."
      }
    ]
  },
  partnerFit: {
    title: "Built for partners who need a reliable Vietnam ground team",
    description:
      "Chalo supports travel agents, tour operators, DMC partners, and wholesalers that need flexible itinerary shaping, clear communication, and dependable local coordination."
  },
  travelerTypes: {
    title: "Support across the traveler profiles you already sell",
    description:
      "Work with one Vietnam partner across FIT, family, group, honeymoon, and leisure requests with clear operational support.",
    items: [
      {
        title: "FIT travelers",
        description: "Flexible private routes with room to adjust pacing, hotel mix, and local experiences."
      },
      {
        title: "Families",
        description: "Balanced itineraries that consider comfort, logistics, and age-friendly sightseeing flow."
      },
      {
        title: "Group tours",
        description: "Operationally clear programs for shared departures, incentive groups, or series business."
      },
      {
        title: "Honeymoon travelers",
        description: "Private itineraries with romantic pacing, privacy, and selective upgrades suited to honeymoon requests."
      },
      {
        title: "Leisure travelers",
        description: "General Vietnam holiday planning for guests who want highlights, culture, and easy coordination."
      }
    ]
  },
  howItWorks: {
    title: "Fast, clear booking operations",
    description:
      "Keep requests moving from brief to guest arrival with short steps and practical handoff points.",
    media: {
      src: "/b2b-operations-partners.jpg",
      alt: "International travel partners and families hosted by the Chalo Vietnam team.",
      eyebrow: "Partner group support",
      title: "Real guests, clear handoffs, local coordination",
      description:
        "Use one Vietnam team for quotation, route shaping, supplier alignment, and guest updates."
    },
    steps: [
      {
        title: "Share the request brief",
        description: "Send the source market, traveler type, dates, route goals, and budget direction."
      },
      {
        title: "Review plan and rates",
        description: "Get route guidance, service scope, and partner-ready rate framing."
      },
      {
        title: "Confirm the itinerary",
        description: "Approve the route, inclusions, exclusions, and final adjustments before departure."
      },
      {
        title: "Travel with local coordination",
        description: "Guests move through Vietnam with local support while your team stays updated."
      }
    ]
  },
  tourStyles: {
    title: "Sample tour styles for common Vietnam requests",
    description:
      "Explore the route directions partners commonly request across Vietnam, from classic highlights to lighter leisure extensions.",
    items: [
      {
        title: "Vietnam highlights",
        description: "Classic north-to-south itineraries covering major cities, scenery, and easy first-time pacing."
      },
      {
        title: "Northern culture",
        description: "Ha Noi, nearby heritage, mountain culture, and landscape-focused experiences."
      },
      {
        title: "Central heritage",
        description: "Culture-led programs built around heritage cities, architecture, cuisine, and coastal balance."
      },
      {
        title: "Southern escape",
        description: "Ho Chi Minh City extensions, Mekong flow, and shorter warm-weather itineraries."
      },
      {
        title: "Beach extension",
        description: "Leisure add-ons for guests who want recovery time after touring or city-heavy programs."
      },
      {
        title: "Honeymoon or family private trips",
        description: "Private departures with more flexible pacing, room setup needs, and selective experience upgrades."
      }
    ]
  },
  serviceCommitments: {
    title: "Service commitments partners can explain with confidence",
    description:
      "Reinforce the operational points partners need to explain clearly before guests travel.",
    items: [
      {
        title: "Clear inclusions and exclusions",
        description: "Partners receive practical visibility into what is covered and what remains outside scope."
      },
      {
        title: "Practical local recommendations",
        description: "Route advice reflects real on-ground conditions, pacing, and guest suitability."
      },
      {
        title: "Flexible itinerary adjustments",
        description: "Programs can be tuned around traveler profile, travel dates, and route priorities."
      },
      {
        title: "Support while guests are in Vietnam",
        description: "Local coordination continues after booking so issues can be handled during travel."
      }
    ]
  },
  finalCta: {
    eyebrow: "Send the next brief",
    title: "Send a simple Vietnam request.",
    description:
      "Share the market, group size, travel dates, route idea, and budget direction. Chalo will help with the next practical step."
  },
  stickyCta: {
    label: "Talk to a specialist",
    href: "#contact",
    ariaLabel: "Contact a Chalo travel specialist"
  },
  leadForm: {
    submitLabel: "Send partner brief",
    successMessage: "Thanks. Your brief is ready for specialist follow-up.",
    errorSummary: "Please review the highlighted fields and try again.",
    requestDetailsMinLength: 20,
    fields: {
      name: {
        label: "Name",
        placeholder: "Your name"
      },
      company: {
        label: "Company",
        placeholder: "Agency or company"
      },
      workEmail: {
        label: "Work email",
        placeholder: "name@company.com"
      },
      sourceMarket: {
        label: "Source market",
        placeholder: "India, Australia, United States, or another market"
      },
      requestDetails: {
        label: "Travel brief",
        placeholder:
          "Traveler type, group size, dates, route goals, service level, and budget direction."
      }
    },
    validationMessages: {
      nameRequired: "Please enter your name.",
      companyRequired: "Please enter your company name.",
      workEmailInvalid: "Please enter a valid work email address.",
      requestDetailsTooShort: "Please provide at least 20 characters of request details."
    }
  },
  faq: [
    {
      question: "Can you support travelers from different source markets?",
      answer:
        "Yes. Chalo is positioned for global travel partners sending guests to Vietnam rather than a single source market."
    },
    {
      question: "Can you customize tours for FIT, family, honeymoon, leisure, and groups?",
      answer:
        "Yes. Share traveler profile, group size, dates, route goals, and budget direction so the itinerary can be shaped accordingly."
    },
    {
      question: "Do you provide partner-friendly rates for travel agents?",
      answer:
        "Chalo works around practical partner requirements and clear service scope so travel agents can review value with confidence."
    },
    {
      question: "How fast can your team respond to new requests?",
      answer:
        "Response timing depends on route complexity and supplier needs, but the workflow is built around fast, clear consultation instead of long discovery loops."
    },
    {
      question: "Do you support guests while they are traveling in Vietnam?",
      answer:
        "Yes. Local support remains in place while guests are in Vietnam so operational questions and adjustments can be handled during travel."
    }
  ],
  footer: {
    description:
      "B2B Vietnam tour planning, quotation support, and local ground coordination for travel agents, operators, DMC partners, and wholesalers.",
    nav: [
      { label: "Partners", href: "#partner-fit" },
      { label: "Traveler types", href: "#traveler-types" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" }
    ],
    utilityLinks: [
      { label: "Email team", href: "#contact" },
      { label: "Specialist call", href: "#contact" }
    ],
    copyright: "© 2026 Chalo. All rights reserved."
  },
  seo: {
    title: "Chalo | Best-value Vietnam tours for global travel partners",
    description:
      "Plan flexible Vietnam itineraries with a local team offering fast consultation, clear booking support, and strong value for travel partners.",
    ogImagePath: "/og-image.svg"
  }
};
