import { VALID_DESTINATIONS } from "@/lib/b2c/b2c-lead-validation";
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
        "A meaningful journey through Da Nang and Hoi An, filled with cultural discovery, peaceful moments, and a smooth experience from arrival to the final day.",
      authorName: "Ms. May Thu Myat Mon & Friends",
      authorLocation: "Myanmar",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.9,
      avatarSrc: "/customer/customer-1/675697328_122289851870035445_4271748004061533667_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-1/673431072_122289851732035445_6022132055672260794_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 1 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/673513268_122289851702035445_6586462191053062841_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 2 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/673891513_122289852368035445_3369512126613287996_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 3 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/674234965_122289852314035445_5504113626592631008_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 4 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/674266894_122289851936035445_2692460362633660511_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 5 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/674328879_122289853508035445_1442843050392859178_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 6 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/674459882_122289851780035445_5681490683788679682_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 7 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/675404845_122289852428035445_5169725467650916833_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 8 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/675697328_122289851870035445_4271748004061533667_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 9 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/675774276_122289851906035445_447720206250274432_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 10 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/676071185_122289852062035445_591272974625866331_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 11 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/676747720_122289851978035445_8546943610131180447_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 12 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/677791599_122289851666035445_7494721450215868665_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 13 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/677799988_122289852224035445_2580852859741859799_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 14 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/678151240_122289852098035445_910099643249350727_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 15 from Ms. May Thu Myat Mon and friends."
        },
        {
          src: "/customer/customer-1/678645521_122289852140035445_4433802480819537942_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 16 from Ms. May Thu Myat Mon and friends."
        }
      ]
    },
    {
      quote:
        "Everything was so well organized from the first day to the last. We always felt supported, and every detail made the journey comfortable, relaxed, and truly memorable.",
      authorName: "Mr. Harish Kumar's Group",
      authorLocation: "India",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.9,
      avatarSrc: "/customer/customer-2/669416527_122288747588035445_8684737124008525471_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-2/669416527_122288747588035445_8684737124008525471_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 1 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/669601686_122288748182035445_5236182054804757956_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 2 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/669606542_122288749442035445_7593513845669034661_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 3 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/669613672_122288747348035445_6541089115724973618_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 4 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/669637963_122288748536035445_5214774868232018045_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 5 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/669885288_122288748176035445_239629109362156335_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 6 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/670396237_122288748188035445_7989275839776602407_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 7 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/670401383_122288747408035445_3445877924834529481_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 8 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/670419295_122288748434035445_1457876582282822728_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 9 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/671046823_122288747456035445_2765650034867605880_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 10 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/671395287_122288748524035445_3076585377875835290_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 11 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/672097639_122288748344035445_6488292933665371350_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 12 from Mr. Harish Kumar's group."
        },
        {
          src: "/customer/customer-2/672679670_122288748530035445_7795405620454862982_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 13 from Mr. Harish Kumar's group."
        }
      ]
    },
    {
      quote:
        "We truly appreciate the effort your team put into organizing this trip. Everything was smooth, well-planned, and thoughtfully arranged, and we felt well taken care of at every step.",
      authorName: "Mr. Harneet Singh's Group",
      authorLocation: "India",
      tripInfo: "Short Vietnam group getaway",
      rating: 4.9,
      avatarSrc: "/customer/customer-3/656995154_122287123208035445_1091272517105922255_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-3/656191578_122287122752035445_4097118340327600609_n.jpg",
          alt: "Vietnam group getaway album photo 1 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/656995154_122287123208035445_1091272517105922255_n.jpg",
          alt: "Vietnam group getaway album photo 2 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/657365076_122287123166035445_419531827971493414_n.jpg",
          alt: "Vietnam group getaway album photo 3 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/657368855_122287123106035445_2831613324880060837_n.jpg",
          alt: "Vietnam group getaway album photo 4 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/657385463_122287123478035445_7783217323531114951_n.jpg",
          alt: "Vietnam group getaway album photo 5 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/657429764_122287123334035445_1213559078636969193_n.jpg",
          alt: "Vietnam group getaway album photo 6 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/657935980_122287123574035445_6096233232493343540_n.jpg",
          alt: "Vietnam group getaway album photo 7 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658130714_122287123526035445_548097228952286988_n.jpg",
          alt: "Vietnam group getaway album photo 8 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658132474_122287123706035445_9094453693046891129_n.jpg",
          alt: "Vietnam group getaway album photo 9 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658136789_122287122758035445_2422788030277152964_n.jpg",
          alt: "Vietnam group getaway album photo 10 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658151736_122287123610035445_5761537722621113424_n.jpg",
          alt: "Vietnam group getaway album photo 11 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658152130_122287123658035445_3213060454133418458_n.jpg",
          alt: "Vietnam group getaway album photo 12 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658154399_122287122926035445_1300666084678992308_n.jpg",
          alt: "Vietnam group getaway album photo 13 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/658161764_122287123388035445_6543299530079884921_n.jpg",
          alt: "Vietnam group getaway album photo 14 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/659025333_122287123130035445_2179134321226000144_n.jpg",
          alt: "Vietnam group getaway album photo 15 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/659031268_122287122836035445_4607703413758497348_n.jpg",
          alt: "Vietnam group getaway album photo 16 from Mr. Harneet Singh's group."
        },
        {
          src: "/customer/customer-3/662650943_122287123766035445_4271353561706462493_n.jpg",
          alt: "Vietnam group getaway album photo 17 from Mr. Harneet Singh's group."
        }
      ]
    },
    {
      quote:
        "Direct booking, Indian-friendly planning, and full A-Z local support made Vietnam group travel smooth, premium, and cost-effective from arrival to departure.",
      authorName: "Corporate Groups from India",
      authorLocation: "India",
      tripInfo: "Vietnam group travel & team events",
      rating: 4.9,
      avatarSrc: "/customer/customer-4/676802745_122289731798035445_5790740657775776380_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-4/676802745_122289731798035445_5790740657775776380_n.jpg",
          alt: "Vietnam group travel album photo 1 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/672686382_122289732704035445_2643446739359009812_n.jpg",
          alt: "Vietnam group travel album photo 2 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/672686694_122289732182035445_5238220956613082172_n.jpg",
          alt: "Vietnam group travel album photo 3 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/672686704_122289732440035445_6697885091287430195_n.jpg",
          alt: "Vietnam group travel album photo 4 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/673145715_122289732560035445_5635361720440581892_n.jpg",
          alt: "Vietnam group travel album photo 5 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/673188957_122289732746035445_1729341850418758199_n.jpg",
          alt: "Vietnam group travel album photo 6 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/673893177_122289731438035445_8381851349841639635_n.jpg",
          alt: "Vietnam group travel album photo 7 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/673946224_122289732506035445_7929932719159244621_n.jpg",
          alt: "Vietnam group travel album photo 8 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/673949911_122289732620035445_7313199582532210060_n.jpg",
          alt: "Vietnam group travel album photo 9 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/674133228_122289731792035445_7370331160111636349_n.jpg",
          alt: "Vietnam group travel album photo 10 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/676166527_122289732242035445_9136287218289030034_n.jpg",
          alt: "Vietnam group travel album photo 11 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/676466682_122289731504035445_9118280267501819286_n.jpg",
          alt: "Vietnam group travel album photo 12 from the featured corporate group from India."
        },
        {
          src: "/customer/customer-4/678294265_122289732302035445_5652788294284098786_n.jpg",
          alt: "Vietnam group travel album photo 13 from the featured corporate group from India."
        }
      ]
    },
    {
      quote:
        "Every scene felt like a painting, from Da Nang's vibrant coast to Hoi An's calm timeless streets. The whole journey was arranged with comfort, ease, and unforgettable moments.",
      authorName: "Mr. Sein Phyun Moe & Ms. Swe Zin Hlaing",
      authorLocation: "Myanmar",
      tripInfo: "Da Nang & Hoi An",
      rating: 4.9,
      avatarSrc: "/customer/customer-5/672685970_122289232376035445_1191747307473371136_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-5/672685970_122289232376035445_1191747307473371136_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 1 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/671853243_122289231962035445_6040282627013357439_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 2 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/672684609_122289231908035445_4536641208843708910_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 3 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/674133750_122289231860035445_7689297199680850012_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 4 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/671853848_122289231812035445_1130558230156255240_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 5 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/673853309_122289232202035445_9159797059939583191_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 6 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/672164746_122289232148035445_7222345958909425693_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 7 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        },
        {
          src: "/customer/customer-5/672686052_122289232088035445_8168071762151934640_n.jpg",
          alt: "Da Nang and Hoi An travel album photo 8 from Mr. Sein Phyun Moe and Ms. Swe Zin Hlaing."
        }
      ]
    },
    {
      quote:
        "We've just come back from Vietnam, and honestly, we already miss it. Everything was so well organized, and your team's support made the whole trip feel easy and enjoyable.",
      authorName: "Mr. Ankith Sisodiya's Family",
      authorLocation: "India",
      tripInfo: "Hanoi & Da Nang family getaway",
      rating: 4.9,
      avatarSrc: "/customer/customer-6/663294207_122287562066035445_2933115465605304741_n.jpg",
      albumImages: [
        {
          src: "/customer/customer-6/663294207_122287562066035445_2933115465605304741_n.jpg",
          alt: "Vietnam family getaway album photo 1 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/659649815_122287562132035445_3912645195996483191_n.jpg",
          alt: "Vietnam family getaway album photo 2 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/659652843_122287562360035445_5282453565307658864_n.jpg",
          alt: "Vietnam family getaway album photo 3 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/659713561_122287562078035445_6087552842801942631_n.jpg",
          alt: "Vietnam family getaway album photo 4 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/660367195_122287562570035445_8625627695122663709_n.jpg",
          alt: "Vietnam family getaway album photo 5 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/660448212_122287562474035445_5677204077191754216_n.jpg",
          alt: "Vietnam family getaway album photo 6 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/660460604_122287562000035445_5726645084525283762_n.jpg",
          alt: "Vietnam family getaway album photo 7 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661378099_122287562342035445_4807684156866393960_n.jpg",
          alt: "Vietnam family getaway album photo 8 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661480635_122287563380035445_1116200597909380899_n.jpg",
          alt: "Vietnam family getaway album photo 9 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661566230_122287566602035445_2091072173164298458_n.jpg",
          alt: "Vietnam family getaway album photo 10 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661602427_122287562456035445_5118343572395568255_n.jpg",
          alt: "Vietnam family getaway album photo 11 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661608109_122287562012035445_3174239895695164944_n.jpg",
          alt: "Vietnam family getaway album photo 12 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/661634957_122287562198035445_53488302462313636_n.jpg",
          alt: "Vietnam family getaway album photo 13 from Mr. Ankith Sisodiya's family."
        },
        {
          src: "/customer/customer-6/662306322_122287562546035445_6698190863451577643_n.jpg",
          alt: "Vietnam family getaway album photo 14 from Mr. Ankith Sisodiya's family."
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
