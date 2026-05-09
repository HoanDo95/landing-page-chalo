import type { LandingContent } from "@/lib/landing-content";

const shared = {
  brand: "NextLevel Studio"
};

export const b2cContent: LandingContent = {
  ...shared,
  variantLabel: "B2C Deploy",
  language: "vi",
  hero: {
    eyebrow: "Landing page wow-effect cho người dùng cuối",
    title: "Kéo cảm xúc lên cao",
    titleAccent: "và giữ performance thật nhanh.",
    description:
      "Landing page cho B2C cần trực quan, giàu nhịp điệu thị giác, nhấn mạnh lợi ích cá nhân, giá trị tức thì và CTA rõ ràng để mua hoặc đăng ký.",
    primaryCta: "Start now",
    secondaryCta: "Khám phá trải nghiệm",
    image: {
      src: "/b2b-hero-vietnam-tour.jpg",
      alt: "Golden Bridge in Da Nang at sunset with mountain and coastal views across central Vietnam.",
      eyebrow: "Visual first impression",
      contextLabel: "B2C experience",
      title: "Một màn đầu tiên có cảm xúc",
      description:
        "Ảnh lớn, lớp nội dung ngắn và CTA rõ giúp người dùng hiểu giá trị ngay trong vài giây.",
      highlights: ["Hero giàu hình ảnh", "CTA rõ", "Mobile-first"]
    }
  },
  stats: [
    { value: "+52%", label: "tỷ lệ tương tác hero" },
    { value: "95+", label: "điểm Lighthouse mục tiêu" },
    { value: "2x", label: "thời gian ở lại trang" }
  ],
  showcase: {
    primaryLabel: "Luồng trải nghiệm",
    secondaryLabel: "Tín hiệu tương tác"
  },
  sections: {
    featuresTitle: "Thiết kế cho trải nghiệm B2C",
    featuresCopy: "Source riêng cho B2C giữ được nhịp cảm xúc, visual impact và CTA đơn giản.",
    faqTitle: "FAQ"
  },
  features: [
    {
      title: "Visual impact mạnh",
      description: "Gradient, motion tinh tế và card nổi khối để tạo cảm giác premium."
    },
    {
      title: "Lợi ích nhìn thấy ngay",
      description: "Rõ ràng, ngắn gọn, tập trung vào thứ user nhận được ngay lập tức."
    },
    {
      title: "CTA đơn giản",
      description: "Giảm ma sát, chỉ giữ hành động chính như mua, dùng thử hoặc đăng ký."
    }
  ],
  proof: {
    title: "Trải nghiệm phải đủ wow nhưng không làm chậm trang",
    description:
      "B2C dùng visual nổi bật, nhưng vẫn giữ semantic HTML, ảnh hưởng SEO thấp và khả năng tải nhanh trên mobile."
  },
  finalCta: {
    eyebrow: "Sẵn sàng triển khai",
    title: "Deploy riêng cho B2C ngay từ đầu.",
    description:
      "Bạn chỉ cần thay content, domain và build command. Nền tảng UI, SEO, motion và performance đã được chuẩn bị để scale tiếp."
  },
  faq: [
    {
      question: "B2C có cần nhiều section không?",
      answer: "Không nhất thiết. Nên ít nhưng sắc, ưu tiên nhịp thị giác và CTA rõ."
    },
    {
      question: "Có thể dùng chung component với B2B không?",
      answer: "Có. Nền tảng vẫn chung, chỉ khác content, màu nhấn và thứ tự section."
    }
  ],
  footer: {
    description:
      "Một landing page B2C giàu hình ảnh, rõ CTA và đủ gọn để chạy nhanh trên mobile.",
    nav: [
      { label: "Trải nghiệm", href: "#features" },
      { label: "FAQ", href: "#faq" },
      { label: "Liên hệ", href: "#contact" }
    ],
    utilityLinks: [{ label: "Start now", href: "#contact" }],
    copyright: "© 2026 NextLevel Studio. All rights reserved."
  },
  seo: {
    title: "B2C Landing Page | SEO & Wow Experience",
    description: "Landing page B2C giàu hiệu ứng, tối ưu cảm xúc, nhưng vẫn chuẩn SEO và nhanh.",
    ogImagePath: "/og-image-b2c.svg"
  }
};
