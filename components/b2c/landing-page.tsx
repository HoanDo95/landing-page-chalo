import Image from "next/image";
import { AnimatedMetricValue } from "@/components/b2c/AnimatedMetricValue";
import { ChatWidget } from "@/components/b2c/ChatWidget/ChatWidget";
import { GatedContentOverlay } from "@/components/b2c/gated-content-overlay";
import { LeadCaptureForm } from "@/components/b2c/lead-capture-form";
import { MetricBar } from "@/components/b2c/MetricBar";
import { TestimonialCarousel } from "@/components/b2c/TestimonialCard";
import { TourPackagesSection } from "@/components/b2c/tour-packages-section";
import { B2CTourSelectionProvider } from "@/components/b2c/tour-selection-context";
import type { LandingContent } from "@/lib/landing-content";
import { formatUsdPrice } from "@/lib/b2c/tour-pricing";
import {
  FeatureCards,
  PageMain,
  PageShell,
  PageWrap,
  SectionHeading
} from "@/components/shared/landing-primitives";
import { ResponsiveNav } from "@/components/shared/responsive-nav";

type Props = {
  content: LandingContent;
};

export function B2CLandingPage({ content }: Props) {
  const heroImage = content.hero.image;
  const secondaryImage = "/tour/group-vin.jpg";
  const tourPackages = content.tourPackages?.packages ?? [];
  const heroSlidesMap = new Map<string, { src: string; alt: string; label: string }>();

  for (const tour of tourPackages) {
    const sourceImages = tour.galleryImages?.length ? tour.galleryImages.slice(0, 2) : [tour.heroImage];

    for (const image of sourceImages) {
      if (!heroSlidesMap.has(image.src)) {
        heroSlidesMap.set(image.src, {
          src: image.src,
          alt: image.alt,
          label: tour.destination
        });
      }

      if (heroSlidesMap.size >= 6) {
        break;
      }
    }

    if (heroSlidesMap.size >= 6) {
      break;
    }
  }

  if (!heroSlidesMap.size && heroImage?.src && heroImage.alt) {
    heroSlidesMap.set(heroImage.src, {
      src: heroImage.src,
      alt: heroImage.alt,
      label: heroImage.contextLabel ?? content.brand
    });
  }

  const heroSlides = Array.from(heroSlidesMap.values());
  const heroSignals = [
    { label: "Secure payment", tone: "soft" },
    { label: "Flexible date support", tone: "soft" },
    { label: "Advice within 5 minutes", tone: "strong" }
  ] as const;
  const testimonials = (content.testimonials ?? []).slice(0, 6);
  const startingPrice = tourPackages.length
    ? Math.min(...tourPackages.map((tour) => tour.priceSale))
    : null;
  const packageSummaryItems = [
    { value: `${tourPackages.length}`, label: "curated routes", tone: "default" },
    {
      value: startingPrice ? `${formatUsdPrice(startingPrice)}+` : "Custom",
      label: "starting price",
      tone: "accent"
    },
    { value: "15 min", label: "quote window", tone: "primary" }
  ] as const;
  const averageRating = testimonials.length
    ? testimonials.reduce((total, testimonial) => total + testimonial.rating, 0) / testimonials.length
    : null;

  return (
    <PageShell className="b2c-page">
      <GatedContentOverlay formContent={content.leadForm!}>
      <div id="top" />
      <ResponsiveNav
        brand={content.brand}
        cta={{ label: content.hero.secondaryCta, href: "#contact" }}
        ctaEventName="b2c_cta_click"
        links={content.footer?.nav ?? []}
        logo={{ src: "/logo/chalo-logo-transparent.png", alt: content.brand }}
      />

      <B2CTourSelectionProvider tourPackages={tourPackages}>
        <PageMain>
          <section className="hero b2c-hero">
            <PageWrap>
              <div className="b2c-hero-grid">
                <div className="b2c-hero-copy">
                  <p className="eyebrow">{content.hero.eyebrow}</p>
                  <h1 className="b2c-display">
                    {content.hero.title} <span>{content.hero.titleAccent}</span>
                  </h1>
                  <p className="b2c-lead">{content.hero.description}</p>

                  <div className="cta-row">
                    <a className="button primary" href="#packages">
                      {content.hero.primaryCta}
                    </a>
                    <a className="button secondary" href="#contact">
                      {content.hero.secondaryCta}
                    </a>
                  </div>

                  <div className="b2c-hero-deal-card" aria-label="Fast booking path">
                    <strong>From idea to held seats in one request</strong>
                    <div>
                      {heroSignals.map((signal) => (
                        <span
                          className={`b2c-hero-signal b2c-hero-signal--${signal.tone}`}
                          key={signal.label}
                        >
                          {signal.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ul className="b2c-hero-proof-row" aria-label="B2C value proof points">
                    {content.stats.map((item, index) => (
                      <li
                        className={`b2c-hero-proof-row__item b2c-hero-proof-row__item--${index === 1 ? "primary" : index === 3 ? "accent" : "default"}`}
                        key={item.value}
                      >
                        <strong>
                          <AnimatedMetricValue value={item.value} delayMs={index * 80} />
                        </strong>
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="b2c-hero-visual" aria-label="B2C experience preview">
                  <div className="b2c-hero-media-card">
                    {heroSlides.length && heroImage ? (
                      <div className="b2c-hero-media">
                        <div className="b2c-hero-media-slider" aria-hidden="true">
                          <div className="b2c-hero-media-track">
                            {[0, 1].map((groupIndex) => (
                              <div className="b2c-hero-media-group" key={`hero-media-group-${groupIndex}`}>
                                {heroSlides.map((slide, slideIndex) => (
                                  <figure className="b2c-hero-media-slide" key={`${groupIndex}-${slide.src}`}>
                                    <Image
                                      alt=""
                                      className="b2c-hero-media-image"
                                      fill
                                      priority={groupIndex === 0 && slideIndex < 2}
                                      sizes="(max-width: 1080px) 72vw, 20vw"
                                      src={slide.src}
                                    />
                                    <figcaption>{slide.label}</figcaption>
                                  </figure>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="b2c-hero-media-topline">
                          <span>{heroImage.eyebrow}</span>
                          <span>{heroImage.contextLabel}</span>
                        </div>
                        <div className="b2c-hero-media-copy">
                          <h2>{heroImage.title}</h2>
                          <p>{heroImage.description}</p>
                        </div>
                        <ul className="b2c-hero-media-route-list" aria-label="Vietnam tour highlights">
                          {heroImage.highlights.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    <aside className="b2c-hero-booking-panel" aria-label="B2C booking summary">
                      <div>
                        <p className="b2c-hero-booking-panel__eyebrow">Trip request brief</p>
                        <h2>Book with the key details visible.</h2>
                      </div>
                      <ol className="b2c-hero-ticket-steps" aria-label="Booking steps">
                        <li>Choose tour</li>
                        <li>Hold seats</li>
                        <li>Quote first</li>
                      </ol>
                      <dl className="b2c-hero-booking-panel__details">
                        <div>
                          <dt>Starting price</dt>
                          <dd>{startingPrice ? `${formatUsdPrice(startingPrice)}+` : "Custom"}</dd>
                        </div>
                        <div>
                          <dt>Response time</dt>
                          <dd>Within 5 minutes</dd>
                        </div>
                        <div>
                          <dt>Next step</dt>
                          <dd>Quote before payment</dd>
                        </div>
                      </dl>
                    </aside>
                  </div>
                </div>
              </div>
            </PageWrap>
          </section>

          {content.tourPackages ? (
            <section className="section b2c-section b2c-section--packages" id="packages">
              <PageWrap>
                <SectionHeading
                  title={content.tourPackages.title}
                  copy={content.tourPackages.subtitle}
                  align="start"
                />
                <div className="b2c-package-summary" aria-label="Tour package summary">
                  {packageSummaryItems.map((item) => (
                    <div
                      className={`b2c-package-summary__item b2c-package-summary__item--${item.tone}`}
                      key={item.label}
                    >
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <TourPackagesSection tourPackages={tourPackages} />
              </PageWrap>
            </section>
          ) : null}

          {content.trustMetrics ? <MetricBar metrics={content.trustMetrics} /> : null}

          <section className="section b2c-section b2c-section--features" id="features">
            <PageWrap>
              <SectionHeading
                title={content.sections.featuresTitle}
                copy={content.sections.featuresCopy}
              />
              <FeatureCards features={content.features} />
            </PageWrap>
          </section>

          <section className="section b2c-section b2c-section--proof" id="about">
            <PageWrap>
              <div className="b2c-proof-layout">
                <div>
                  <SectionHeading
                    title={content.proof.title}
                    copy={content.proof.description}
                    align="start"
                  />
                  <div className="b2c-proof-metrics" aria-label="B2C proof metrics">
                    {content.stats.map((stat) => (
                      <div key={stat.label}>
                        <strong><AnimatedMetricValue value={stat.value} /></strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="b2c-proof-gallery" aria-label="B2C visual proof">
                  {heroImage?.src && heroImage.alt ? (
                    <figure className="b2c-proof-card b2c-proof-card--large">
                      <Image
                        alt={heroImage.alt}
                        className="b2c-proof-card__image"
                        fill
                        sizes="(max-width: 900px) 100vw, 34vw"
                        src={heroImage.src}
                      />
                      <figcaption>Real trip experience</figcaption>
                    </figure>
                  ) : null}

                  <figure className="b2c-proof-card b2c-proof-card--small">
                    <Image
                      alt="People enjoying a premium guided travel experience in Vietnam."
                      className="b2c-proof-card__image"
                      fill
                      sizes="(max-width: 900px) 100vw, 18vw"
                      src={secondaryImage}
                    />
                    <figcaption>Local partners</figcaption>
                  </figure>
                </div>
              </div>
            </PageWrap>
          </section>

          <section className="section b2c-section b2c-section--contact" id="contact">
            <PageWrap>
              <div className="b2c-final-card">
                <div className="b2c-final-card__copy">
                  <div className="eyebrow">{content.finalCta.eyebrow}</div>
                  <h2 className="section-title" style={{ marginTop: 18 }}>
                    {content.finalCta.title}
                  </h2>
                  <p className="section-copy">
                    {content.finalCta.description}
                  </p>
                  <div className="b2c-final-proof-list" aria-label="What happens after submitting">
                    <span>Advisor reviews your route</span>
                    <span>Seats are checked before payment</span>
                    <span>You receive a clear quote first</span>
                  </div>
                </div>
                <div className="b2c-final-card__form">
                  {content.leadForm && content.tourPackages ? (
                    <LeadCaptureForm
                      content={content.leadForm}
                      tourPackages={content.tourPackages.packages}
                    />
                  ) : null}
                </div>
              </div>
            </PageWrap>
          </section>

          {testimonials.length ? (
            <section className="section b2c-section b2c-section--testimonials" id="testimonials">
              <PageWrap>
                <div className="b2c-testimonial-kicker" aria-label="Traveler review summary">
                  <strong>{averageRating ? `${averageRating.toFixed(1)}/5` : "Verified"} average rating</strong>
                  <span>from post-trip traveler feedback</span>
                </div>
                <div className="b2c-testimonial-spotlight">
                  <SectionHeading
                    title="Our happy clients say"
                    copy="Traveler stories stay close to the inquiry moment, with room to keep adding fresh tour feedback as new albums are ready."
                    align="start"
                  />
                  <TestimonialCarousel testimonials={testimonials} />
                </div>
              </PageWrap>
            </section>
          ) : null}
        </PageMain>
      </B2CTourSelectionProvider>

      <footer className="b2c-footer">
        <PageWrap>
          <div className="b2c-footer-grid">
            <div className="b2c-footer-brand-block">
              <div className="site-brand site-brand--footer">
                <span className="site-brand-logo" aria-hidden="true">
                  <Image alt="" fill sizes="156px" src="/logo/chalo-logo-transparent.png" />
                </span>
              </div>
            </div>

            <nav className="b2c-footer-links" aria-label="B2C footer">
              {content.footer?.nav.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <hr className="b2c-footer-divider" />
          <p className="b2c-footer-meta">{content.footer?.copyright}</p>
        </PageWrap>
      </footer>

      <ChatWidget />
      </GatedContentOverlay>
    </PageShell>
  );
}
