import Image from "next/image";
import { AnimatedMetricValue } from "@/components/b2c/AnimatedMetricValue";
import { LeadCaptureForm } from "@/components/b2c/lead-capture-form";
import { MetricBar } from "@/components/b2c/MetricBar";
import { TestimonialCard } from "@/components/b2c/TestimonialCard";
import { TourCard } from "@/components/b2c/TourCard";
import type { LandingContent } from "@/lib/landing-content";
import {
  FeatureCards,
  PageMain,
  PageShell,
  PageWrap,
  SectionHeading,
  FaqList
} from "@/components/shared/landing-primitives";
import { ResponsiveNav } from "@/components/shared/responsive-nav";

type Props = {
  content: LandingContent;
};

function formatPrice(price: number) {
  return `VND ${new Intl.NumberFormat("en-US").format(price)}`;
}

export function B2CLandingPage({ content }: Props) {
  const heroImage = content.hero.image;
  const secondaryImage = "/tour/group-vin.jpg";
  const tourPackages = content.tourPackages?.packages ?? [];
  const testimonials = content.testimonials ?? [];
  const testimonialRows = [
    testimonials.filter((_, index) => index % 2 === 0),
    testimonials.filter((_, index) => index % 2 === 1)
  ].filter((row) => row.length > 0);
  const startingPrice = tourPackages.length
    ? Math.min(...tourPackages.map((tour) => tour.priceSale))
    : null;
  const averageRating = testimonials.length
    ? testimonials.reduce((total, testimonial) => total + testimonial.rating, 0) / testimonials.length
    : null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <PageShell className="b2c-page">
      <div id="top" />
      <ResponsiveNav
        brand={content.brand}
        cta={{ label: content.hero.secondaryCta, href: "#contact" }}
        ctaEventName="b2c_cta_click"
        links={content.footer?.nav ?? []}
        logo={{ src: "/logo/chalo-logo-transparent.png", alt: content.brand }}
      />

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
                    <span>Secure payment</span>
                    <span>Flexible date support</span>
                    <span>Advice within 5 minutes</span>
                  </div>
                </div>

                <ul className="b2c-hero-proof-row" aria-label="B2C value proof points">
                  {content.stats.map((item, index) => (
                    <li key={item.value}>
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
                  {heroImage?.src && heroImage.alt ? (
                    <div className="b2c-hero-media">
                      <Image
                        alt={heroImage.alt}
                        className="b2c-hero-media-image"
                        fill
                        priority
                        sizes="(max-width: 1080px) 100vw, 52vw"
                        src={heroImage.src}
                      />
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
                        <dd>{startingPrice ? `${formatPrice(startingPrice)}+` : "Custom"}</dd>
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
                <div>
                  <strong>{tourPackages.length}</strong>
                  <span>curated routes</span>
                </div>
                <div>
                  <strong>{startingPrice ? `${formatPrice(startingPrice)}+` : "Custom"}</strong>
                  <span>starting price</span>
                </div>
                <div>
                  <strong>15 min</strong>
                  <span>quote window</span>
                </div>
              </div>
              <div className="tour-packages-grid">
                {tourPackages.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
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

        {testimonials.length ? (
          <section className="section b2c-section b2c-section--testimonials" id="testimonials">
            <PageWrap>
              <div className="b2c-testimonial-kicker" aria-label="Traveler review summary">
                <strong>{averageRating ? `${averageRating.toFixed(1)}/5` : "Verified"} average rating</strong>
                <span>from post-trip traveler feedback</span>
              </div>
              <SectionHeading
                title="What travelers say"
                copy="Real booking signals are kept close to the tour decision, so travelers do not need to hunt for reassurance."
                align="start"
              />
              <div className="testimonials-marquee" aria-label="Traveler testimonials carousel">
                {testimonialRows.map((row, rowIndex) => (
                  <div
                    className={`testimonial-marquee-row testimonial-marquee-row--${rowIndex === 0 ? "primary" : "secondary"}`}
                    key={`testimonial-row-${rowIndex}`}
                  >
                    <div className="testimonial-marquee-track">
                      <div className="testimonial-marquee-group">
                        {row.map((testimonial) => (
                          <TestimonialCard
                            key={`${testimonial.authorName}-${testimonial.tripInfo}`}
                            {...testimonial}
                          />
                        ))}
                      </div>
                      <div className="testimonial-marquee-group" aria-hidden="true">
                        {row.map((testimonial) => (
                          <TestimonialCard
                            key={`${testimonial.authorName}-${testimonial.tripInfo}-duplicate`}
                            {...testimonial}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PageWrap>
          </section>
        ) : null}

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
                  {content.stats.map((stat, index) => (
                    <div key={stat.label}>
                      <strong>
                        <AnimatedMetricValue value={stat.value} delayMs={index * 80} />
                      </strong>
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

        <section className="section b2c-section" id="faq">
          <PageWrap>
            <SectionHeading title={content.sections.faqTitle} copy={content.sections.faqCopy} />
            <FaqList items={content.faq} />
          </PageWrap>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
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
      </PageMain>

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
    </PageShell>
  );
}
