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
      overview:
        "A compact North Vietnam route for travelers who want Hanoi culture, a Halong Bay cruise, and Ninh Binh scenery in one clear itinerary.",
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
      priceOriginal: 329,
      priceSale: 289,
      priceCurrency: "USD",
      highlights: ["5 days", "Hanoi", "Halong Bay cruise", "Ninh Binh", "All transfers"],
      accommodation: "4-star hotels + cruise cabin",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Accommodation", "Meals", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Arrive in Hanoi and explore the Old Quarter",
          description: "Airport pickup, hotel check-in, and a relaxed first evening around the Old Quarter food streets."
        },
        {
          dayLabel: "Day 2",
          title: "City landmarks and overnight Halong Bay cruise",
          description: "Morning Hanoi highlights, then transfer to Halong Bay for embarkation, dinner, and overnight cruise."
        },
        {
          dayLabel: "Day 3",
          title: "Cruise activities and return to Hanoi",
          description: "Sunrise deck time, cave or kayak activity depending on weather, brunch onboard, and evening return."
        },
        {
          dayLabel: "Day 4",
          title: "Full-day Ninh Binh excursion",
          description: "Tam Coc or Trang An boat ride, countryside viewpoints, and temple stops with guide support."
        },
        {
          dayLabel: "Day 5",
          title: "Departure support",
          description: "Breakfast, flexible hotel checkout timing, and airport transfer based on your flight schedule."
        }
      ],
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
      overview:
        "A slower-paced North Vietnam circuit with mountain scenery in Sapa, Hanoi heritage stops, and extra cruise time in Halong Bay.",
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
      priceOriginal: 589,
      priceSale: 519,
      priceCurrency: "USD",
      highlights: ["7 days", "Sapa 2 nights", "Halong 2-night cruise", "Fansipan cable car", "Train ticket"],
      accommodation: "4-star hotels + cruise + train",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Accommodation", "Meals", "Sapa train", "Cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Hanoi arrival and evening orientation",
          description: "Meet-and-greet at the airport, check in, and optional evening food-walk planning with the advisor."
        },
        {
          dayLabel: "Day 2",
          title: "Transfer to Sapa and valley viewpoints",
          description: "Travel north with scenic stops before arriving in Sapa for a light village and mountain-view program."
        },
        {
          dayLabel: "Day 3",
          title: "Sapa trails and ethnic village visits",
          description: "Guided trekking or softer walking route depending on the group, plus local-market and village time."
        },
        {
          dayLabel: "Day 4",
          title: "Return to Hanoi and prepare for the bay",
          description: "Morning return, rest window in Hanoi, and briefing for the Halong Bay cruise leg."
        },
        {
          dayLabel: "Day 5",
          title: "Embark on Halong Bay cruise",
          description: "Boarding, bay sightseeing, cave visit or kayak stop, and overnight cruise with meals included."
        },
        {
          dayLabel: "Day 6",
          title: "Second cruise day and Hanoi return",
          description: "More relaxed deck time and excursions before transfer back to Hanoi in the late afternoon."
        },
        {
          dayLabel: "Day 7",
          title: "Departure day",
          description: "Breakfast, hotel checkout, and airport transfer with timing matched to the outbound flight."
        }
      ],
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
      overview:
        "A Central Vietnam itinerary combining imperial sites, Hoi An heritage streets, and Da Nang coastal downtime with private transfer support.",
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
      priceOriginal: 429,
      priceSale: 369,
      priceCurrency: "USD",
      highlights: ["6 days", "Hue Imperial Citadel", "Hoi An UNESCO town", "Da Nang beach", "Private car"],
      accommodation: "4-star beach hotels",
      inclusions: ["All entrance fees", "Tour guide", "Private transfers", "Accommodation", "Meals"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Arrive in Da Nang and coastal check-in",
          description: "Airport pickup, hotel check-in, and free time near My Khe Beach or the Han River area."
        },
        {
          dayLabel: "Day 2",
          title: "Da Nang highlights and Marble Mountains",
          description: "Easy-paced city route with cultural stops, viewpoint time, and flexible lunch timing."
        },
        {
          dayLabel: "Day 3",
          title: "Hoi An old town discovery",
          description: "Transfer to Hoi An, guided old-quarter walk, lantern district visit, and evening free time."
        },
        {
          dayLabel: "Day 4",
          title: "Scenic drive to Hue",
          description: "Hai Van Pass route or tunnel transfer depending on conditions, then Hue landmark visits."
        },
        {
          dayLabel: "Day 5",
          title: "Imperial Hue program and return",
          description: "Imperial Citadel, tomb or pagoda stop, and comfortable private-car return segment."
        },
        {
          dayLabel: "Day 6",
          title: "Departure support from Da Nang",
          description: "Breakfast, hotel checkout, and transfer planning based on the outbound flight window."
        }
      ],
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
      overview:
        "A full-country itinerary for travelers who want North, Central, and South Vietnam combined into one managed route with clear transfers.",
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
      priceOriginal: 799,
      priceSale: 699,
      priceCurrency: "USD",
      highlights: ["10 days", "All regions covered", "Halong Bay cruise", "Mekong Delta", "Domestic flight"],
      accommodation: "4-star hotels + cruise",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Domestic flight", "Accommodation", "Meals", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Arrive in Hanoi",
          description: "Airport pickup, city arrival support, and a flexible evening depending on arrival time."
        },
        {
          dayLabel: "Day 2",
          title: "Hanoi heritage route",
          description: "Capital-city highlights with guide support, old-quarter pacing, and food-friendly scheduling."
        },
        {
          dayLabel: "Day 3",
          title: "Halong Bay overnight cruise",
          description: "Transfer to the bay, cruise embarkation, and overnight program with meals and scenic stops."
        },
        {
          dayLabel: "Day 4",
          title: "Return and fly central",
          description: "Cruise checkout, transfer back, and domestic-flight coordination into Central Vietnam."
        },
        {
          dayLabel: "Day 5",
          title: "Da Nang and Hoi An",
          description: "Coastal city orientation followed by Hoi An old-town program and evening lantern atmosphere."
        },
        {
          dayLabel: "Day 6",
          title: "Central heritage continuation",
          description: "Extra Central Vietnam sightseeing with flexibility for beach or heritage preferences."
        },
        {
          dayLabel: "Day 7",
          title: "Fly to Ho Chi Minh City",
          description: "Domestic flight south, urban highlights, and evening free time around District 1."
        },
        {
          dayLabel: "Day 8",
          title: "Ho Chi Minh City route",
          description: "City landmarks, market or history stops, and adjustable pace for shopping or cafés."
        },
        {
          dayLabel: "Day 9",
          title: "Mekong Delta day trip",
          description: "River channels, local workshops, and village-style experiences before returning to the city."
        },
        {
          dayLabel: "Day 10",
          title: "Departure support",
          description: "Hotel checkout, final transfer coordination, and buffer time for the outbound airport journey."
        }
      ],
      availability: 8,
      badge: "limited"
    }
  ],
  showPriceRange: true,
  sortOptions: ["popular", "price-asc", "price-desc", "destination"]
};

export const B2C_TOUR_PACKAGE_IDS = tourPackages.packages.map((tour) => tour.id);

export const b2cContent: LandingContent = {
  brand: "Chalo Travel",
  variantLabel: "B2C Vietnam Tours",
  language: "en",
  hero: {
    eyebrow: "Best-value Vietnam tours",
    title: "Book Vietnam tours faster",
    titleAccent: "with clear prices.",
    description:
      "Package tours from USD 289 with 5-minute consultation, clear itineraries, and flexible date support for families, couples, and friends.",
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
      quote:
        "Our Da Nang and Hoi An trip felt smooth from the first pickup to the final transfer. Everything was thoughtfully arranged, so our group could simply relax and enjoy the journey.",
      authorName: "May Thu Myat Mon Group",
      authorLocation: "Myanmar",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.9
    },
    {
      quote:
        "We accept direct India corporate bookings with full end-to-end handling. The trip felt seamless, premium, and cost-effective, while our team could focus on bonding together.",
      authorName: "India Corporate Groups",
      authorLocation: "India",
      tripInfo: "Vietnam corporate journeys",
      rating: 4.9
    },
    {
      quote:
        "Da Nang and Hoi An felt like a moving painting for us. The balance between vibrant coastal moments and quiet old-town streets made the whole journey memorable.",
      authorName: "Sein Phyun Moe & Swe Zin Hlaing",
      authorLocation: "Myanmar",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.9
    },
    {
      quote:
        "From mountain views to temple visits and calm evening walks, every part of the route felt peaceful, meaningful, and worth remembering.",
      authorName: "Harish Kumar Group",
      authorLocation: "India",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.8
    },
    {
      quote:
        "We've just come back from Vietnam and already miss it. Everything was so well organized, and your team's support made the whole trip feel easy and enjoyable.",
      authorName: "Ankith Sisodiya Family",
      authorLocation: "India",
      tripInfo: "Vietnam family journey",
      rating: 4.8
    },
    {
      quote:
        "Everything was smooth, well-planned, and thoughtfully arranged. The constant support throughout the trip made our short Vietnam journey even more enjoyable.",
      authorName: "Harneet Singh Group",
      authorLocation: "India",
      tripInfo: "Vietnam group getaway",
      rating: 4.9
    },
    {
      quote: "We wanted a first Vietnam trip without too much planning stress. The route, hotel choices, and local guide support made it very easy.",
      authorName: "Aditya Rao",
      authorLocation: "Hyderabad",
      tripInfo: "Amazing Vietnam 10 Days 9 Nights",
      rating: 4.8
    },
    {
      quote: "Hoi An was beautiful, Da Nang was relaxing, and the team kept the daily timings realistic. It never felt rushed.",
      authorName: "Kavya Nair",
      authorLocation: "Chennai",
      tripInfo: "Amazing Vietnam 6 Days 5 Nights",
      rating: 4.7
    },
    {
      quote: "The itinerary balanced city visits and free time very well. My parents especially appreciated the smooth transfers and clear communication.",
      authorName: "Siddharth Iyer",
      authorLocation: "Pune",
      tripInfo: "Amazing Vietnam 10 Days 9 Nights",
      rating: 4.9
    },
    {
      quote: "From the first inquiry to the final day in Ho Chi Minh City, everything felt organized. The support team answered quickly whenever we needed help.",
      authorName: "Neha Bansal",
      authorLocation: "Ahmedabad",
      tripInfo: "Amazing Vietnam 7 Days 6 Nights",
      rating: 4.8
    },
    {
      quote: "This was a great fit for a couple's trip. Hotels were clean, breakfast was reliable, and the Mekong Delta visit added something different to the route.",
      authorName: "Arjun Malhotra",
      authorLocation: "Jaipur",
      tripInfo: "Amazing Vietnam 10 Days 9 Nights",
      rating: 4.8
    },
    {
      quote: "We compared several packages before booking, and this one felt the clearest. The inclusions matched what was delivered on the ground.",
      authorName: "Sneha Reddy",
      authorLocation: "Gurgaon",
      tripInfo: "Amazing Vietnam 6 Days 5 Nights",
      rating: 4.9
    },
    {
      quote: "Our guide explained each stop clearly, and the mix of Hanoi, Halong Bay, and central Vietnam worked well even for first-time travelers.",
      authorName: "Rahul Khanna",
      authorLocation: "Noida",
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
    eyebrow: "Get your quote",
    title: "Pick a tour. Get price and availability in 15 minutes.",
    description: "Share your email and phone. Chalo Travel sends the route, quote, and next steps."
  },
  leadForm: {
    submitLabel: "Get quote",
    successMessage: "Thank you. You can now browse the tours.",
    errorSummary: "Please check your tour request details.",
    fields: {
      workEmail: {
        label: "Email",
        placeholder: "you@example.com"
      },
      numberOfPeople: {
        label: "Số người"
      },
      travelMonth: {
        label: "Tháng đi"
      },
      numberOfNights: {
        label: "Số đêm"
      },
      notes: {
        label: "Ghi chú",
        placeholder: "Bạn muốn đi biển, nghỉ dưỡng, hay có yêu cầu đặc biệt?"
      },
      phone: {
        label: "Số điện thoại",
        placeholder: "+91 98765 43210"
      },
      city: {
        label: "Thành phố",
        placeholder: "Bạn đang ở thành phố nào?"
      }
    },
    validationMessages: {
      workEmailInvalid: "Please enter a valid email address.",
      numberOfPeopleInvalid: "Vui lòng chọn số người.",
      travelMonthInvalid: "Vui lòng chọn tháng đi.",
      numberOfNightsInvalid: "Vui lòng chọn số đêm.",
      phoneInvalid: "Vui lòng nhập số điện thoại hợp lệ.",
      cityInvalid: "Vui lòng nhập thành phố.",
      notesTooLong: "Ghi chú tối đa 500 ký tự."
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
      { label: "Consultation", href: "#contact" }
    ],
    utilityLinks: [{ label: "View tours now", href: "#packages" }],
    copyright: "© 2026 Chalo Travel. All rights reserved."
  },
  seo: {
    title: "Best-Value Vietnam Tours | Chalo Travel 2026",
    description:
      "Vietnam tours from USD 289 with clear pricing, 24/7 support, flexible date changes, and 15,000+ travelers served every year.",
    ogImagePath: "/og-image-b2c-tours.svg"
  }
};

export function getB2CVietnamToursContent(): LandingContent {
  return b2cContent;
}
