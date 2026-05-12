import Image from "next/image";
import type { CSSProperties } from "react";
import type { B2BLandingContent } from "@/lib/landing-content";
import { LeadCaptureForm } from "@/components/b2b/lead-capture-form";
import {
  FaqList,
  FeatureCards,
  PageMain,
  PageShell,
  PageWrap,
  SectionHeading
} from "@/components/shared/landing-primitives";
import { ResponsiveNav } from "@/components/shared/responsive-nav";
import { TrackedCtaLink } from "@/components/shared/tracked-cta-link";
import { RevealController } from "@/components/shared/reveal-controller";

interface B2BLandingPageProps {
  content: B2BLandingContent;
}

/** Renders the approved B2B Chalo landing page composition. */
export function B2BLandingPage({ content }: B2BLandingPageProps) {
  const heroImage = content.hero.image;
  const heroOverlay = content.hero.overlay;
  const heroTrustSignals = content.hero.trustSignals ?? [];
  const footer = content.footer;
  const partnerMarquee = footer?.partnerMarquee;
  const ctaEventName = "b2b_cta_click";
  const revealDelay = (value: string) =>
    ({ "--reveal-delay": value }) as CSSProperties;
  const heroMediaSlides = [
    {
      src: "/tour/sapa.jpg",
      alt: "Mountain terraces and travelers in Sapa, northern Vietnam.",
      label: "Sapa"
    },
    {
      src: "/tour/hue-imperial-citadel.jpg",
      alt: "Hue Imperial Citadel architecture for central Vietnam itineraries.",
      label: "Hue"
    },
    {
      src: "/tour/hanoi.jpg",
      alt: "Ha Noi city scene for Vietnam arrival and culture programs.",
      label: "Ha Noi"
    },
    {
      src: "/tour/ho-chi-minh-city.jpg",
      alt: "Ho Chi Minh City skyline for southern Vietnam tour routing.",
      label: "Ho Chi Minh City"
    },
    {
      src: "/tour/da-nang.jpg",
      alt: "Da Nang coastal city and landmark stop for Vietnam tours.",
      label: "Da Nang"
    },
    {
      src: "/tour/ba-na-hills.jpg",
      alt: "Ba Na Hills architecture and mountain attraction in central Vietnam.",
      label: "Ba Na Hills"
    }
  ] as const;
  const partnerFitGallery = [
    {
      src: "/tour/group-vin.jpg",
      alt: "International group travelers exploring Vietnam with the local Chalo team.",
      eyebrow: "Real guest moment",
      title: "Real groups already touring Vietnam"
    },
    {
      src: "/tour/family-golden-bridge.jpg",
      alt: "Family travelers visiting Golden Bridge in Vietnam with scenic mountain views.",
      eyebrow: "Family-friendly stop",
      title: "Big hero stops that sell fast"
    },
    {
      src: "/tour/family-hoi-an.jpg",
      alt: "Family travelers walking through Hoi An heritage town in Vietnam.",
      eyebrow: "Culture and people",
      title: "Photo-ready heritage experiences"
    },
    {
      src: "/tour/phu-quoc.jpg",
      alt: "Phu Quoc beach extension for Vietnam tours with leisure time and coastal scenery.",
      eyebrow: "Easy extension",
      title: "Beach endings clients love"
    }
  ] as const;
  const tourStyleVisuals = [
    {
      src: "/tour/family-golden-bridge.jpg",
      alt: "Family travelers hosted at Golden Bridge in Da Nang.",
      label: "Family-ready highlight"
    },
    {
      src: "/tour/ninh-binh.jpg",
      alt: "Ninh Binh landscape and river route for northern Vietnam culture tours.",
      label: "Northern nature route"
    },
    {
      src: "/tour/family-hoi-an.jpg",
      alt: "Family travelers visiting Hoi An heritage town.",
      label: "Central family stop"
    },
    {
      src: "/tour/mekong-river.jpg",
      alt: "Mekong river and local southern Vietnam travel experience.",
      label: "Southern extension"
    },
    {
      src: "/tour/phu-quoc.jpg",
      alt: "Phu Quoc beach and island leisure extension collage.",
      label: "Beach recovery"
    },
    {
      src: "/tour/group-vin.jpg",
      alt: "Multi-generation group and family travelers on a Vietnam tour.",
      label: "Private family group"
    }
  ] as const;
  return (
    <PageShell className="b2b-page b2b-page--has-mobile-cta" id="page-shell">
      <a className="skip-link" href="#page-content">
        Skip to content
      </a>
      <RevealController />

      <div id="top" />
      <ResponsiveNav
        brand={content.brand}
        logo={content.logo}
        ctaEventName={ctaEventName}
        links={content.navigation.links}
        cta={content.navigation.cta}
      />

      <PageMain id="page-content" tabIndex={-1}>
        <section className="b2b-hero anchor-target">
          <PageWrap>
            <div className="b2b-hero-grid">
              <div className="b2b-hero-copy">
                <p className="eyebrow" data-reveal="hero" style={revealDelay("0ms")}>
                  {content.hero.eyebrow}
                </p>
                <h1 className="b2b-display" data-reveal="hero" style={revealDelay("80ms")}>
                  {content.hero.title} <span>{content.hero.titleAccent}</span>
                </h1>
                <p className="b2b-lead" data-reveal="hero" style={revealDelay("150ms")}>
                  {content.hero.description}
                </p>

                <div className="cta-row" data-reveal="hero" style={revealDelay("220ms")}>
                  <TrackedCtaLink
                    className="button primary"
                    eventName={ctaEventName}
                    href="#contact"
                    placement="hero-primary"
                  >
                    {content.hero.primaryCta}
                  </TrackedCtaLink>
                  <a className="button secondary" href="#tour-styles">
                    {content.hero.secondaryCta}
                  </a>
                </div>

                {heroTrustSignals.length ? (
                  <div
                    className="b2b-hero-claim-card"
                    aria-label="B2B direct operator proof"
                    data-reveal="hero"
                    style={revealDelay("260ms")}
                  >
                    <strong>{content.trustBand?.eyebrow}</strong>
                    <div className="b2b-hero-claim-signals">
                      {heroTrustSignals.map((signal, index) => (
                        <span
                          className={`b2b-hero-signal b2b-hero-signal--${index === 0 ? "strong" : "soft"}`}
                          key={signal.label}
                        >
                          {signal.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <ul
                  className="b2b-hero-proof-row"
                  aria-label="B2B value proof points"
                  data-reveal="hero"
                  style={revealDelay("320ms")}
                >
                  {content.stats.map((item, index) => (
                    <li
                      className={`b2b-hero-proof-row__item b2b-hero-proof-row__item--${index === 0 ? "primary" : index === 1 ? "accent" : "default"}`}
                      key={`${item.value}-${item.label}`}
                    >
                      <strong>{item.value}</strong>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="b2b-hero-visual" data-reveal="hero" data-reveal-direction="right" style={revealDelay("180ms")}>
                <div className="b2b-hero-media-card">
                  <div className="b2b-hero-media">
                    <div className="b2b-hero-media-slider" aria-hidden="true">
                      <div className="b2b-hero-media-track">
                        {[0, 1].map((groupIndex) => (
                          <div className="b2b-hero-media-group" key={`b2b-hero-media-group-${groupIndex}`}>
                            {heroMediaSlides.map((slide, slideIndex) => (
                              <figure className="b2b-hero-media-slide" key={`${groupIndex}-${slide.src}`}>
                                <Image
                                  alt=""
                                  className="b2b-hero-media-image"
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

                    <div className="b2b-hero-media-topline">
                      <span>{heroImage.eyebrow}</span>
                      <span>{heroImage.contextLabel}</span>
                    </div>

                    <div className="b2b-hero-media-copy">
                      <h2>{heroImage.title}</h2>
                      <p>{heroImage.description}</p>
                    </div>

                    <ul
                      className="b2b-hero-media-route-list"
                      aria-label="Vietnam route highlights"
                    >
                      {heroImage.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  <aside className="b2b-hero-overlay" aria-label={heroOverlay.title}>
                    <p className="b2b-hero-overlay__eyebrow">{heroOverlay.eyebrow}</p>
                    <h2>{heroOverlay.title}</h2>

                    <dl className="b2b-hero-overlay__details">
                      {heroOverlay.details.map((item) => (
                        <div key={item.label}>
                          <dt>{item.label}</dt>
                          <dd>{item.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="b2b-hero-overlay__highlights">
                      {heroOverlay.highlights.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          </PageWrap>
        </section>

        <section className="b2b-trust-band" aria-labelledby="b2b-trust-band-title">
          <PageWrap>
            <div className="b2b-trust-band__grid">
              <div className="b2b-trust-band__intro" data-reveal="section" data-reveal-direction="left">
                <p className="eyebrow">{content.trustBand.eyebrow}</p>
                <h2 className="section-title" id="b2b-trust-band-title">
                  {content.trustBand.title}
                </h2>
                <p className="section-copy">{content.trustBand.description}</p>
              </div>

              <ul className="b2b-trust-band__signals" aria-label="Operational trust signals" data-reveal="section" data-reveal-stagger="true">
                {content.trustBand.signals.map((signal) => (
                  <li key={signal.title}>
                    <h3>{signal.title}</h3>
                    <p>{signal.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </PageWrap>
        </section>

        <section className="section b2b-section b2b-section--partner-fit" id="partner-fit">
          <PageWrap>
            <div className="b2b-partner-fit-layout">
              <div className="b2b-partner-fit-intro" data-reveal="section" data-reveal-direction="left">
                <SectionHeading
                  title={content.partnerFit.title}
                  copy={content.partnerFit.description}
                  align="start"
                />
              </div>

              <ul className="b2b-partner-fit-signals" aria-label="Partner fit proof" data-reveal="section" data-reveal-stagger="true">
                {content.stats.map((item) => (
                  <li key={`${item.value}-${item.label}`}>
                    <span>{item.value}</span>
                    <p>{item.label}</p>
                  </li>
                ))}
              </ul>

              <div className="b2b-partner-fit-gallery" aria-label="Vietnam itinerary gallery" data-reveal="section" data-reveal-stagger="true">
                {partnerFitGallery.map((item, index) => (
                  <figure
                    className={`b2b-partner-fit-photo b2b-partner-fit-photo--${index + 1}`}
                    key={item.src}
                  >
                    <Image
                      alt={item.alt}
                      className="b2b-partner-fit-photo__image"
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 900px) 100vw, 48vw"
                          : "(max-width: 900px) 50vw, 18vw"
                      }
                      src={item.src}
                    />
                    <figcaption>
                      <span>{item.eyebrow}</span>
                      <strong>{item.title}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </PageWrap>
        </section>

        <section
          className="section section--soft b2b-section b2b-section--traveler-types"
          id="traveler-types"
        >
          <PageWrap>
            <div className="b2b-section-stack" data-reveal="section">
              <SectionHeading
                title={content.travelerTypes.title}
                copy={content.travelerTypes.description}
                align="start"
              />
              <div className="b2b-card-group b2b-card-group--travelers">
                <FeatureCards features={content.travelerTypes.items} />
              </div>
            </div>
          </PageWrap>
        </section>

        <section
          className="section section--soft b2b-section b2b-section--operations"
          id="how-it-works"
        >
          <PageWrap>
            <div className="b2b-operations-layout">
              <div className="b2b-operations-intro" data-reveal="section" data-reveal-direction="left">
                <SectionHeading
                  title={content.howItWorks.title}
                  copy={content.howItWorks.description}
                  align="start"
                />
                {content.howItWorks.media ? (
                  <figure className="b2b-operations-media">
                    <Image
                      alt={content.howItWorks.media.alt}
                      className="b2b-operations-media__image"
                      fill
                      sizes="(max-width: 1080px) 100vw, 36vw"
                      src={content.howItWorks.media.src}
                    />
                    <figcaption className="b2b-operations-media__caption">
                      <span>{content.howItWorks.media.eyebrow}</span>
                      <strong>{content.howItWorks.media.title}</strong>
                      <p>{content.howItWorks.media.description}</p>
                    </figcaption>
                  </figure>
                ) : null}
              </div>
              <ol className="b2b-process-grid" data-reveal="section" data-reveal-stagger="true">
                {content.howItWorks.steps.map((step, index) => (
                  <li className="b2b-process-card" key={step.title}>
                    <span className="b2b-process-index">0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </PageWrap>
        </section>

        <section className="section b2b-section b2b-section--tour-styles" id="tour-styles">
          <PageWrap>
            <div className="b2b-tour-styles-layout" data-reveal="section">
              <SectionHeading
                title={content.tourStyles.title}
                copy={content.tourStyles.description}
                align="start"
              />
              <div className="b2b-card-group b2b-card-group--tour-styles">
                <div className="b2b-tour-style-cards" data-reveal="section" data-reveal-stagger="true">
                  {content.tourStyles.items.map((item, index) => {
                    const visual = tourStyleVisuals[index];

                    return (
                      <article className="b2b-tour-style-card" key={item.title}>
                        <figure className="b2b-tour-style-card__media">
                          <Image
                            alt={visual.alt}
                            className="b2b-tour-style-card__image"
                            fill
                            sizes={
                              index === 0 || index === content.tourStyles.items.length - 1
                                ? "(max-width: 900px) 100vw, 44vw"
                                : "(max-width: 900px) 100vw, 28vw"
                            }
                            src={visual.src}
                          />
                          <figcaption>{visual.label}</figcaption>
                        </figure>
                        <div className="b2b-tour-style-card__body">
                          <span className="badge">0{index + 1}</span>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </PageWrap>
        </section>

        <section
          className="section section--dark b2b-section b2b-section--service-commitments"
          id="service-commitments"
        >
          <PageWrap>
            <div className="b2b-section-stack" data-reveal="section">
              <SectionHeading
                title={content.serviceCommitments.title}
                copy={content.serviceCommitments.description}
                align="start"
                invert
              />
              <div className="b2b-card-group b2b-card-group--commitments">
                <FeatureCards features={content.serviceCommitments.items} tone="dark" />
              </div>
            </div>
          </PageWrap>
        </section>

        <section className="section section--soft b2b-section b2b-section--faq-close" id="faq">
          <PageWrap>
            <div className="b2b-closeout">
              <div className="b2b-closeout__faq" data-reveal="section" data-reveal-direction="left">
                <SectionHeading
                  title={content.sections.faqTitle}
                  copy={content.sections.faqCopy}
                  align="start"
                />
                <FaqList items={content.faq} />
              </div>

              <aside className="b2b-final-cta-card" id="contact">
                <p className="eyebrow">{content.finalCta.eyebrow}</p>
                <h2 className="section-title">{content.finalCta.title}</h2>
                <p className="section-copy anchor-target" id="contact-brief" data-reveal="section">
                  {content.finalCta.description}
                </p>
                <LeadCaptureForm content={content.leadForm} />
              </aside>
            </div>
          </PageWrap>
        </section>

        {partnerMarquee ? (
          <section
            aria-label="Recognizable travel brands"
            className="b2b-partner-marquee-band"
          >
            <PageWrap>
              <div className="b2b-partner-marquee-shell" data-reveal="section">
                <div className="b2b-partner-marquee" aria-label="Recognizable travel brands">
                  <div className="b2b-partner-marquee-track">
                    {[0, 1].map((groupIndex) => (
                      <div
                        aria-hidden={groupIndex === 1 ? "true" : undefined}
                        className="b2b-partner-marquee-group"
                        key={`b2b-partner-marquee-group-${groupIndex}`}
                      >
                        {partnerMarquee.items.map((item) => (
                          <span
                            className="b2b-partner-marquee-wordmark"
                            key={`${item}-${groupIndex}`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PageWrap>
          </section>
        ) : null}
      </PageMain>

      {footer ? (
        <>
          <footer className="site-footer">
            <PageWrap>
              <div className="site-footer-grid">
                <div className="site-footer-brand-block">
                  <div className="site-brand site-brand--footer">
                    {content.logo ? (
                      <span className="site-brand-logo" aria-hidden="true">
                        <Image alt="" fill sizes="156px" src={content.logo.src} />
                      </span>
                    ) : (
                      <>
                        <span className="site-brand-mark" aria-hidden="true">
                          {content.brand.slice(0, 1)}
                        </span>
                        <span>{content.brand}</span>
                      </>
                    )}
                  </div>
                </div>

                <nav className="site-footer-nav" aria-label="Footer">
                  {footer.nav.map((link) => (
                    <a key={link.href} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
              <hr className="site-footer-divider" />
              <p className="site-footer-meta">{footer.copyright}</p>
            </PageWrap>
          </footer>
        </>
      ) : null}

      <div className="b2b-mobile-sticky-cta" aria-label="Mobile specialist CTA">
        <PageWrap>
          <TrackedCtaLink
            ariaLabel={content.stickyCta.ariaLabel}
            className="button primary b2b-mobile-sticky-cta__button"
            eventName={ctaEventName}
            href={content.stickyCta.href}
            placement="mobile-sticky-bar"
          >
            {content.stickyCta.label}
          </TrackedCtaLink>
        </PageWrap>
      </div>
    </PageShell>
  );
}
