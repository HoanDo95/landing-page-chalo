import { VALID_DESTINATIONS } from "@/lib/b2c/b2c-lead-validation";
import type { LandingContent, TourPackagesContent } from "@/lib/landing-content";

const tourPackages: TourPackagesContent = {
  title: "Amazing Vietnam multi-destination tours",
  subtitle: "Updated ChaloTrip packages with standard routes, daily pacing, and group-based per-person pricing.",
  commitmentBadge: "Indian Food & Vegetarian/Jain Options Available",
  packages: [
    {
      id: "amazing-vietnam-5d4n",
      destination: "Hanoi, Halong Bay, Ninh Binh",
      duration: "5D4N",
      durationNights: 4,
      durationDays: 5,
      title: "Amazing Vietnam 5 days 4 nights",
      description: "Hanoi Old Quarter, Hanoi city tour, Ninh Binh, and a 5-star Halong Bay luxury day cruise.",
      overview:
        "A compact North Vietnam route for travelers who want Hanoi culture, Trang An scenery, Hoa Lu history, and Halong Bay in one clear itinerary.",
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
      priceOriginal: 210,
      priceSale: 190,
      priceCurrency: "USD",
      highlights: ["5 days", "Hanoi Old Quarter", "Trang An", "Hoa Lu", "Halong day cruise"],
      accommodation: "Hanoi hotel overnights",
      inclusions: ["All entrance fees", "Tour guide", "Transfers", "Accommodation", "Meals", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Hanoi arrival and Old Quarter",
          description: "Arrive at Hanoi airport, transfer to the hotel, check in, relax, and enjoy free time around the Old Quarter."
        },
        {
          dayLabel: "Day 2",
          title: "Hanoi city tour",
          description: "Visit key historical and cultural stops such as Ho Chi Minh Complex, One Pillar Pagoda, Temple of Literature, Hoan Kiem Lake, and the Old Quarter."
        },
        {
          dayLabel: "Day 3",
          title: "Ninh Binh, Trang An, and Hoa Lu",
          description: "Transfer to Ninh Binh, visit Hoa Lu Ancient Capital, take a Trang An boat trip, and return to Hanoi in the afternoon."
        },
        {
          dayLabel: "Day 4",
          title: "Halong Bay luxury day cruise",
          description: "Transfer to Halong Bay for a 5-star luxury day cruise with lunch on board, sightseeing, cave visit, and bay activities."
        },
        {
          dayLabel: "Day 5",
          title: "Hanoi departure",
          description: "Free time for shopping until airport transfer for the departure flight."
        }
      ],
      availability: 18,
      badge: "best-seller"
    },
    {
      id: "amazing-vietnam-7d6n",
      destination: "Hanoi, Halong Bay, Ninh Binh, Da Nang, Hoi An, Ho Chi Minh, Mekong",
      duration: "7D6N",
      durationNights: 6,
      durationDays: 7,
      title: "Amazing Vietnam 7 days 6 nights",
      description: "A north-to-south Vietnam route with Hanoi, Halong Bay, Ninh Binh, Da Nang, Hoi An, Ba Na Hills, Ho Chi Minh City, and Mekong Delta.",
      overview:
        "A complete highlights route that moves from Hanoi and Halong Bay through Central Vietnam, then finishes with Ho Chi Minh City and Mekong Delta.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark before the Amazing Vietnam 7 day journey."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark before the Amazing Vietnam 7 day journey."
        },
        {
          src: "/tour/halong-bay.jpg",
          alt: "Halong Bay limestone islands and cruise route."
        },
        {
          src: "/tour/hoi-an.jpg",
          alt: "Hoi An ancient town with lanterns and historic architecture."
        },
        {
          src: "/tour/ba-na-hills.jpg",
          alt: "Ba Na Hills and Golden Bridge on the Central Vietnam route."
        },
        {
          src: "/tour/mekong.jpg",
          alt: "Mekong Delta river scenery on the southern route."
        }
      ],
      priceOriginal: 400,
      priceSale: 345,
      priceCurrency: "USD",
      highlights: ["7 days", "Halong day cruise", "Trang An", "Hoi An", "Mekong Delta"],
      accommodation: "Hotel overnights in Hanoi, Da Nang, and Ho Chi Minh City",
      inclusions: ["All entrance fees", "Tour guide", "Private airport transfers", "Accommodation", "Meals in tour", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Hanoi arrival",
          description: "Arrive at Hanoi airport, transfer to the hotel, check in, relax, and enjoy free time around the Old Quarter."
        },
        {
          dayLabel: "Day 2",
          title: "Halong Bay 5-star luxury day cruise",
          description: "Transfer to Halong Bay for a 5-star luxury day cruise with lunch on board, sightseeing, cave visit, and bay activities."
        },
        {
          dayLabel: "Day 3",
          title: "Ninh Binh, Trang An, Hoa Lu, and flight to Da Nang",
          description: "Visit Hoa Lu Ancient Capital, take a Trang An boat trip, then transfer to the airport for the flight to Da Nang."
        },
        {
          dayLabel: "Day 4",
          title: "Coconut Forest and Hoi An tour",
          description: "Visit Cam Thanh Coconut Forest for a basket boat experience, then explore Hoi An Ancient Town, Japanese Bridge, lantern streets, and local shops."
        },
        {
          dayLabel: "Day 5",
          title: "Ba Na Hills and flight to Ho Chi Minh City",
          description: "Visit Ba Na Hills, Golden Bridge, and French Village, then transfer to the airport for the flight to Ho Chi Minh City."
        },
        {
          dayLabel: "Day 6",
          title: "Mekong Delta tour",
          description: "Enjoy boat rides, local villages, fruit gardens, and peaceful river scenery before returning to Ho Chi Minh City."
        },
        {
          dayLabel: "Day 7",
          title: "Departure and free shopping",
          description: "Free time for shopping or relaxing until airport transfer for the departure flight."
        }
      ],
      availability: 12,
      badge: "sale"
    },
    {
      id: "amazing-vietnam-6d5n",
      destination: "Hanoi, Halong Bay, Ninh Binh, Da Nang, Hoi An, Ba Na Hills",
      duration: "6D5N",
      durationNights: 5,
      durationDays: 6,
      title: "Amazing Vietnam 6 days 5 nights",
      description: "A six-day Vietnam route covering Hanoi, Halong Bay, Ninh Binh, Da Nang, Hoi An, Coconut Forest, and Ba Na Hills.",
      overview:
        "A balanced North and Central Vietnam route with Hanoi arrival, Halong Bay day cruise, Trang An, Hoi An, Coconut Forest, and Ba Na Hills.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark before the Amazing Vietnam 6 day journey."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark before the Amazing Vietnam 6 day journey."
        },
        {
          src: "/tour/halong-bay.jpg",
          alt: "Halong Bay limestone islands and cruise route."
        },
        {
          src: "/tour/hoi-an.jpg",
          alt: "Hoi An ancient town with lanterns and historic architecture."
        },
        {
          src: "/tour/ba-na-hills.jpg",
          alt: "Ba Na Hills and Golden Bridge on the Central Vietnam route."
        }
      ],
      priceOriginal: 325,
      priceSale: 290,
      priceCurrency: "USD",
      highlights: ["6 days", "Halong day cruise", "Trang An", "Hoi An", "Ba Na Hills"],
      accommodation: "Hotel overnights in Hanoi and Da Nang",
      inclusions: ["All entrance fees", "Tour guide", "Private airport transfers", "Accommodation", "Meals in tour", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Hanoi arrival",
          description: "Arrive at Hanoi airport, transfer to the hotel, check in, relax, and enjoy free time around the Old Quarter."
        },
        {
          dayLabel: "Day 2",
          title: "Halong Bay 5-star day cruise",
          description: "Transfer to Halong Bay for a 5-star day cruise with lunch on board, sightseeing, cave visit, and bay activities."
        },
        {
          dayLabel: "Day 3",
          title: "Ninh Binh, Trang An, Hoa Lu, and flight to Da Nang",
          description: "Visit Hoa Lu Ancient Capital, take a Trang An boat trip, then transfer to the airport for the flight to Da Nang."
        },
        {
          dayLabel: "Day 4",
          title: "Coconut Forest and Hoi An tour",
          description: "Visit Cam Thanh Coconut Forest for the basket boat experience, then explore Hoi An Ancient Town, lantern streets, old houses, and local shops."
        },
        {
          dayLabel: "Day 5",
          title: "Ba Na Hills",
          description: "Visit Ba Na Hills, Golden Bridge, French Village, and enjoy the cable car experience."
        },
        {
          dayLabel: "Day 6",
          title: "Departure and free shopping",
          description: "Free time for shopping or relaxing until airport transfer for the departure flight."
        }
      ],
      availability: 20
    },
    {
      id: "amazing-vietnam-8d7n",
      destination: "Hanoi, Halong, Da Nang, Hoi An, Ho Chi Minh, Mekong",
      duration: "8D7N",
      durationNights: 7,
      durationDays: 8,
      title: "Amazing Vietnam 8 days 7 nights",
      description: "An eight-day Vietnam highlights route from Hanoi and Halong Bay to Central Vietnam, Ho Chi Minh City, and Mekong Delta.",
      overview:
        "A north-to-south itinerary for travelers who want Hanoi, Halong Bay, Ninh Binh, Hoi An, Ba Na Hills, Ho Chi Minh City, and Mekong Delta in one managed route.",
      heroImage: {
        src: "/tour/hanoi.jpg",
        alt: "Hanoi city landmark starting an eight-day Vietnam highlights route."
      },
      galleryImages: [
        {
          src: "/tour/hanoi.jpg",
          alt: "Hanoi city landmark starting an eight-day Vietnam highlights route."
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
          src: "/tour/ba-na-hills.jpg",
          alt: "Ba Na Hills and Golden Bridge on the Central Vietnam route."
        },
        {
          src: "/tour/mekong.jpg",
          alt: "Mekong Delta river scenery on the southern route."
        }
      ],
      priceOriginal: 415,
      priceSale: 365,
      priceCurrency: "USD",
      highlights: ["8 days", "Halong day cruise", "Hoi An", "Ba Na Hills", "Mekong Delta"],
      accommodation: "Hotel overnights in Hanoi, Da Nang, and Ho Chi Minh City",
      inclusions: ["All entrance fees", "Tour guide", "Private airport transfers", "Accommodation", "Meals in tour", "Halong cruise"],
      itineraryDays: [
        {
          dayLabel: "Day 1",
          title: "Hanoi arrival",
          description: "Arrive at Hanoi airport, transfer to the hotel, check in, relax, and enjoy free time around the Old Quarter."
        },
        {
          dayLabel: "Day 2",
          title: "Halong Bay 5-star luxury day cruise",
          description: "Transfer to Halong Bay for a 5-star luxury day cruise with lunch on board, sightseeing, cave visit, and bay activities."
        },
        {
          dayLabel: "Day 3",
          title: "Ninh Binh, Trang An, Hoa Lu, and flight to Da Nang",
          description: "Visit Hoa Lu Ancient Capital and enjoy a Trang An boat trip, then transfer to the airport for the flight to Da Nang."
        },
        {
          dayLabel: "Day 4",
          title: "Coconut Forest and Hoi An tour",
          description: "Visit Cam Thanh Coconut Forest for the basket boat experience, then explore Hoi An Ancient Town, lantern streets, old houses, and local shops."
        },
        {
          dayLabel: "Day 5",
          title: "Ba Na Hills",
          description: "Visit Ba Na Hills, Golden Bridge, French Village, and enjoy the cable car experience."
        },
        {
          dayLabel: "Day 6",
          title: "Da Nang flight to Ho Chi Minh City",
          description: "Free time until transfer to Da Nang airport for the flight to Ho Chi Minh City, then hotel transfer on arrival."
        },
        {
          dayLabel: "Day 7",
          title: "Mekong Delta day trip",
          description: "Take a day trip to Mekong Delta with boat rides, local villages, fruit gardens, and peaceful river scenery."
        },
        {
          dayLabel: "Day 8",
          title: "Departure and free shopping",
          description: "Free time for shopping or relaxing until airport transfer for the departure flight."
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
  brand: "ChaloTrip",
  variantLabel: "B2C Vietnam Tours",
  language: "en",
  hero: {
    eyebrow: "Best-value Vietnam tours",
    title: "Book Vietnam tours faster",
    titleAccent: "with clear prices.",
    description:
      "Package tours from USD 190 with 5-minute consultation, clear itineraries, and flexible date support for families, couples, and friends.",
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
        "A family journey through Da Nang and Hoi An, from Marble Mountains and Ba Na Hills to basket boats in the Coconut Forest and the flavors of the ancient town.",
      authorName: "Ms. Myat and Family",
      authorLocation: "Myanmar",
      tripInfo: "Da Nang, Ba Na Hills & Hoi An",
      rating: 4.9,
      avatarSrc: "/customer/customer-1/z6907822752180_d29a5cc177b7d54f13914db3ba0cc981.jpg",
      albumImages: [
        {
          src: "/customer/customer-1/z6907822752180_d29a5cc177b7d54f13914db3ba0cc981.jpg",
          alt: "Da Nang and Hoi An family travel album photo 1 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822762603_f420efa7e635747ea31c6b8edbce5626.jpg",
          alt: "Da Nang and Hoi An family travel album photo 2 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822765825_2d4d6d156e4411ccda809b4f3f8363d8.jpg",
          alt: "Da Nang and Hoi An family travel album photo 3 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822776022_faf7ca3f214475082845189d81043ff5.jpg",
          alt: "Da Nang and Hoi An family travel album photo 4 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822781442_7d8302cf5de5775db21dcfd42ebe2f2c.jpg",
          alt: "Da Nang and Hoi An family travel album photo 5 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822790075_8cc8457a30bb73eff945bbe2906d0a2d.jpg",
          alt: "Da Nang and Hoi An family travel album photo 6 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822796021_3185e6541e0604c9e71829763fb06911.jpg",
          alt: "Da Nang and Hoi An family travel album photo 7 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822804713_e11ea35e5e35eaf3e75d228372965848.jpg",
          alt: "Da Nang and Hoi An family travel album photo 8 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822813989_35c009227e94663cd8990a908b52b459.jpg",
          alt: "Da Nang and Hoi An family travel album photo 9 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822824302_24bdf326ef2febdef0abc654d478c0d6.jpg",
          alt: "Da Nang and Hoi An family travel album photo 10 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822850919_1b2f78db92b5445f478dbd029b2197fa.jpg",
          alt: "Da Nang and Hoi An family travel album photo 11 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822864045_0eb0cdda40366f633c36dd91cb5d8d1e.jpg",
          alt: "Da Nang and Hoi An family travel album photo 12 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822868220_31e3615a9878968a0700f85f3178f407.jpg",
          alt: "Da Nang and Hoi An family travel album photo 13 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822891200_d2e6b39795240a5406d094b2aa9bfde6.jpg",
          alt: "Da Nang and Hoi An family travel album photo 14 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822900666_f83ab13c5b6ef0eb29b4448e131cdfb9.jpg",
          alt: "Da Nang and Hoi An family travel album photo 15 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822919737_0be9e67ea9a4a8851ee695933f1268c4.jpg",
          alt: "Da Nang and Hoi An family travel album photo 16 from Ms. Myat and family."
        },
        {
          src: "/customer/customer-1/z6907822924995_e3404e1e71dd3d28ab6a3d9bc74d9847.jpg",
          alt: "Da Nang and Hoi An family travel album photo 17 from Ms. Myat and family."
        }
      ]
    },
    {
      quote:
        "Walking through quiet local villages and sharing tea with a native family was a highlight I will always cherish. The Vietnamese guides were professional, warm, and the team handled every detail flawlessly.",
      authorName: "Mr. Trinath Sahu",
      authorLocation: "India",
      tripInfo: "Village walk & local family visit",
      rating: 4.9,
      avatarSrc: "/customer/customer-2/z7061888659873_53ae81e63b486628bcbaa1027c237b89.jpg",
      albumImages: [
        {
          src: "/customer/customer-2/z7061888659873_53ae81e63b486628bcbaa1027c237b89.jpg",
          alt: "Vietnam village walk and local family visit album photo 1 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546325296_7efc666f2ac104055bcfdcb1d6c4e108.jpg",
          alt: "Vietnam village walk and local family visit album photo 2 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546351671_55a36d279f166d40b127a2d29f8b71b0.jpg",
          alt: "Vietnam village walk and local family visit album photo 3 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546355545_c4711abf1d0a0842b7663a0133d7bf92.jpg",
          alt: "Vietnam village walk and local family visit album photo 4 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546371771_fff584e388f847825cb83efca5971c46.jpg",
          alt: "Vietnam village walk and local family visit album photo 5 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546378439_64c0466eb5ab47bdfb39a639b8ee9a16.jpg",
          alt: "Vietnam village walk and local family visit album photo 6 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546392506_d8ed821f66f406dff22b3d447358ddea.jpg",
          alt: "Vietnam village walk and local family visit album photo 7 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546396339_8796675dbf50672470094efd0452eaa3.jpg",
          alt: "Vietnam village walk and local family visit album photo 8 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546411370_28b0be8920c7244d786b461700fa8943.jpg",
          alt: "Vietnam village walk and local family visit album photo 9 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546427570_0175866c128dcb78983fc467c6f22be7.jpg",
          alt: "Vietnam village walk and local family visit album photo 10 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7069546472583_3eae0a7aea889ac42a73c4b22b2b9bd2.jpg",
          alt: "Vietnam village walk and local family visit album photo 11 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7074483418998_9088775f62efbfd4fccf0b43ba0c93d7.jpg",
          alt: "Vietnam village walk and local family visit album photo 12 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7074483455847_1ac69e2ad7acb55c6d461780a381c8cc.jpg",
          alt: "Vietnam village walk and local family visit album photo 13 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7074483469073_fc8613c24c14de888da5dee80c1d31e9.jpg",
          alt: "Vietnam village walk and local family visit album photo 14 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7074483491519_833c018c7623fc48201a907fdc4c514c.jpg",
          alt: "Vietnam village walk and local family visit album photo 15 from Mr. Trinath Sahu."
        },
        {
          src: "/customer/customer-2/z7074483500072_79408c31c38f2ccb8d4164cca3f5189c.jpg",
          alt: "Vietnam village walk and local family visit album photo 16 from Mr. Trinath Sahu."
        }
      ]
    },
    {
      quote:
        "A five-day journey through Da Nang and Hoi An brought unforgettable memories, from white sandy beaches and Marble Mountains to Ba Na Hills and the charm of the ancient town.",
      authorName: "Mr. Nay Thu Hein & Friends",
      authorLocation: "Myanmar",
      tripInfo: "5D4N Da Nang & Hoi An",
      rating: 4.9,
      avatarSrc: "/customer/customer-3/z6825489819692_7eb39a91001420b2718c3a5caa260a57.jpg",
      albumImages: [
        {
          src: "/customer/customer-3/z6825489819692_7eb39a91001420b2718c3a5caa260a57.jpg",
          alt: "Da Nang and Hoi An travel album photo 1 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489825209_992eb114294473547e4eaa0a0f700365.jpg",
          alt: "Da Nang and Hoi An travel album photo 2 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489835560_67d41179179404c03d19d349011783c6.jpg",
          alt: "Da Nang and Hoi An travel album photo 3 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489849915_b42f5d65260eac4164754280703c6c50.jpg",
          alt: "Da Nang and Hoi An travel album photo 4 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489850124_09821f1ffaae74f8905e195fe27dc654.jpg",
          alt: "Da Nang and Hoi An travel album photo 5 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489862257_8f39e57cc9e276d74925462b312afe1a.jpg",
          alt: "Da Nang and Hoi An travel album photo 6 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489874206_5b2f40869677d764d7e91529c9fe56ac.jpg",
          alt: "Da Nang and Hoi An travel album photo 7 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489879023_f5d657028a63a99d334dfda2fe9f6187.jpg",
          alt: "Da Nang and Hoi An travel album photo 8 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489895300_47048abb23e59d5bfc5b23dc0ae0ffe1.jpg",
          alt: "Da Nang and Hoi An travel album photo 9 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489909391_7bfc7f452a82130c5751d30d7253dd14.jpg",
          alt: "Da Nang and Hoi An travel album photo 10 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825489977211_78387fa14eea4fbe0efa32455c24554f.jpg",
          alt: "Da Nang and Hoi An travel album photo 11 from Mr. Nay Thu Hein and friends."
        },
        {
          src: "/customer/customer-3/z6825490021211_a791aad015ed83c3fb877d1b61e2edef.jpg",
          alt: "Da Nang and Hoi An travel album photo 12 from Mr. Nay Thu Hein and friends."
        }
      ]
    },
    {
      quote:
        "Vietnam welcomed our family so warmly. From Hanoi and Ha Long Bay to Ba Na Hills and the Mekong Delta, every stop gave us meaningful moments we would love to return for.",
      authorName: "Mr. Gurvinder Singh's Family",
      authorLocation: "India",
      tripInfo: "Hanoi, Ha Long Bay, Ba Na Hills & Mekong Delta",
      rating: 4.9,
      avatarSrc: "/customer/customer-4/z6701068479358_287ac4962199f547b12592ba5501790d.jpg",
      albumImages: [
        {
          src: "/customer/customer-4/z6701068479358_287ac4962199f547b12592ba5501790d.jpg",
          alt: "Vietnam family journey album photo 1 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6701068490132_6f020368a67195073241c3764ea2fb42.jpg",
          alt: "Vietnam family journey album photo 2 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6701068512439_e36853cf2d1a477123a9605a84569e3d.jpg",
          alt: "Vietnam family journey album photo 3 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6711277152683_02cc46a78d2c50e227b26b18ec39f92a.jpg",
          alt: "Vietnam family journey album photo 4 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6711277155234_bbda1e9107e861b5f291e6a5a5fe7c9b.jpg",
          alt: "Vietnam family journey album photo 5 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6711277228509_d9624676e6195ba9a763771cd4f8aebf.jpg",
          alt: "Vietnam family journey album photo 6 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6711277242377_cb3a097137853762a1aa73caa0a9e977.jpg",
          alt: "Vietnam family journey album photo 7 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6721259178383_c05f3197634178483b0f2b8f8db9d3c0.jpg",
          alt: "Vietnam family journey album photo 8 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6721259180935_4fd972db9d069180f2ddeb80ead2b707.jpg",
          alt: "Vietnam family journey album photo 9 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6721259185134_aaace16a5f3395140a481ae62588c639.jpg",
          alt: "Vietnam family journey album photo 10 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6721259201810_27ae57652dc07cad7d2e859032403b75.jpg",
          alt: "Vietnam family journey album photo 11 from Mr. Gurvinder Singh's family."
        },
        {
          src: "/customer/customer-4/z6721259215891_42405ec163aa9714a26a242d4925beae.jpg",
          alt: "Vietnam family journey album photo 12 from Mr. Gurvinder Singh's family."
        }
      ]
    },
    {
      quote:
        "After a business trip to Da Nang, we fell in love with Vietnam. Even with a short stay, the culture, famous attractions, and warm-hearted people made the journey unforgettable.",
      authorName: "Mr. Fanzeem & Friends",
      authorLocation: "India",
      tripInfo: "Vietnam friends getaway",
      rating: 4.9,
      avatarSrc: "/customer/customer-5/IMG_0784.JPG",
      albumImages: [
        {
          src: "/customer/customer-5/IMG_0784.JPG",
          alt: "Vietnam friends getaway album photo 1 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0785.JPG",
          alt: "Vietnam friends getaway album photo 2 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0789.JPG",
          alt: "Vietnam friends getaway album photo 3 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0790.JPG",
          alt: "Vietnam friends getaway album photo 4 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0796.JPG",
          alt: "Vietnam friends getaway album photo 5 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0798.JPG",
          alt: "Vietnam friends getaway album photo 6 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0799.JPG",
          alt: "Vietnam friends getaway album photo 7 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0801.JPG",
          alt: "Vietnam friends getaway album photo 8 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0803.JPG",
          alt: "Vietnam friends getaway album photo 9 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0810.JPG",
          alt: "Vietnam friends getaway album photo 10 from Mr. Fanzeem and friends."
        },
        {
          src: "/customer/customer-5/IMG_0811.JPG",
          alt: "Vietnam friends getaway album photo 11 from Mr. Fanzeem and friends."
        }
      ]
    },
    {
      quote:
        "Our Vietnam journey became a collection of joyful memories, from temples and ancient pagodas to lively walking streets, Train Street, and warm support throughout the trip.",
      authorName: "Mr. Chandra Shekar and Family",
      authorLocation: "India",
      tripInfo: "Hanoi culture & family discovery",
      rating: 4.9,
      avatarSrc: "/customer/customer-6/1.jpg",
      albumImages: [
        {
          src: "/customer/customer-6/1.jpg",
          alt: "Vietnam family discovery album photo 1 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/2.jpg",
          alt: "Vietnam family discovery album photo 2 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/3.jpg",
          alt: "Vietnam family discovery album photo 3 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/4.jpg",
          alt: "Vietnam family discovery album photo 4 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/5.jpg",
          alt: "Vietnam family discovery album photo 5 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/6.jpg",
          alt: "Vietnam family discovery album photo 6 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/10.jpg",
          alt: "Vietnam family discovery album photo 7 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN 2.jpg",
          alt: "Vietnam family discovery album photo 8 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN3.jpg",
          alt: "Vietnam family discovery album photo 9 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN4.jpg",
          alt: "Vietnam family discovery album photo 10 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN5.jpg",
          alt: "Vietnam family discovery album photo 11 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN6.jpg",
          alt: "Vietnam family discovery album photo 12 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN7.jpg",
          alt: "Vietnam family discovery album photo 13 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN8.jpg",
          alt: "Vietnam family discovery album photo 14 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN9.jpg",
          alt: "Vietnam family discovery album photo 15 from Mr. Chandra Shekar and family."
        },
        {
          src: "/customer/customer-6/HN10.jpg",
          alt: "Vietnam family discovery album photo 16 from Mr. Chandra Shekar and family."
        }
      ]
    }
  ],
  features: [
    {
      title: "Clear prices from the start",
      description: "Each tour shows the original price, deal price, matching destinations, and included services."
    },
    {
      title: "Consultation within 5 minutes",
      description: "Submit your details once, then the ChaloTrip team calls back to hold seats and confirm dates."
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
      "ChaloTrip works directly with local suppliers to reduce middle layers while keeping clear itineraries and support before, during, and after the trip."
  },
  finalCta: {
    eyebrow: "Get your quote",
    title: "Pick a tour. Get price and availability in 15 minutes.",
    description: "Share your email and phone. ChaloTrip sends the route, quote, and next steps.",
    contactDetails: [
      {
        label: "WhatsApp",
        value: "+84363554573",
        href: "https://wa.me/84363554573"
      },
      {
        label: "Office",
        value: "M8/219 Nguyen Ngoc Nai street, Hanoi city, Vietnam"
      }
    ]
  },
  leadForm: {
    submitLabel: "Get quote",
    successMessage: "Request received. Our team will review your trip and get back to you shortly.",
    errorSummary: "Please check your tour request details.",
    fields: {
      workEmail: {
        label: "Email",
        placeholder: "you@example.com"
      },
      numberOfPeople: {
        label: "Number of people"
      },
      travelDate: {
        label: "Travel date"
      },
      numberOfNights: {
        label: "Number of nights"
      },
      notes: {
        label: "Notes",
        placeholder: "Do you prefer beaches, resorts, or have any special requests?"
      },
      phone: {
        label: "Phone number",
        placeholder: "+91 98765 43210"
      },
      destinations: {
        label: "Destinations",
        options: [...VALID_DESTINATIONS]
      }
    },
    validationMessages: {
      workEmailInvalid: "Please enter a valid email address.",
      numberOfPeopleInvalid: "Please enter the number of people.",
      travelDateInvalid: "Please select your travel date.",
      numberOfNightsInvalid: "Please enter the number of nights.",
      phoneInvalid: "Please enter a valid phone number.",
      destinationsInvalid: "Please select at least one destination.",
      notesTooLong: "Notes must be 500 characters or fewer."
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
        "Date changes depend on each tour's policy and hotel or vehicle availability. ChaloTrip prioritizes the lowest-extra-cost option for you."
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
    copyright: "© 2026 ChaloTrip. All rights reserved."
  },
  seo: {
    title: "Best-Value Vietnam Tours | ChaloTrip 2026",
    description:
      "Vietnam tours from USD 190 with clear pricing, 24/7 support, flexible date changes, and 15,000+ travelers served every year.",
    ogImagePath: "/og-image-b2c-tours.svg"
  }
};

export function getB2CVietnamToursContent(): LandingContent {
  return b2cContent;
}
