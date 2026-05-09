import Image from "next/image";
import type { LandingContent } from "@/lib/landing-content";
import {
  FeatureCards,
  HeroActions,
  HeroCopy,
  PageMain,
  PageShell,
  PageWrap,
  SectionHeading,
  StatGrid,
  Topbar,
  FaqList
} from "@/components/shared/landing-primitives";

type Props = {
  content: LandingContent;
};

export function B2CLandingPage({ content }: Props) {
  const heroImage = content.hero.image;
  const secondaryImage = "/b2b-operations-partners.jpg";

  return (
    <PageShell className="b2c-page">
      <PageMain>
        <section className="hero">
          <PageWrap>
            <Topbar brand={content.brand} variantLabel={content.variantLabel} />

            <div className="hero-grid">
              <div>
                <HeroCopy
                  eyebrow={content.hero.eyebrow}
                  title={content.hero.title}
                  titleAccent={content.hero.titleAccent}
                  description={content.hero.description}
                />

                <HeroActions
                  primaryCta={content.hero.primaryCta}
                  secondaryCta={content.hero.secondaryCta}
                  primaryHref="#contact"
                  secondaryHref="#features"
                />

                <StatGrid stats={content.stats} />
              </div>

              <div className="b2c-hero-visual" aria-label="B2C experience preview">
                {heroImage?.src && heroImage.alt ? (
                  <figure className="b2c-hero-photo">
                    <Image
                      alt={heroImage.alt}
                      className="b2c-hero-photo__image"
                      fill
                      priority
                      sizes="(max-width: 900px) 100vw, 48vw"
                      src={heroImage.src}
                    />
                    <figcaption>
                      <span>{heroImage.eyebrow}</span>
                      <strong>{heroImage.title}</strong>
                      <p>{heroImage.description}</p>
                    </figcaption>
                  </figure>
                ) : null}

                <div className="b2c-hero-float-card b2c-hero-float-card--top">
                  <span>Visual rhythm</span>
                  <strong>Scroll-stopping product story</strong>
                </div>
                <div className="b2c-hero-float-card b2c-hero-float-card--bottom">
                  <span>Fast CTA</span>
                  <strong>One clear conversion path</strong>
                </div>
              </div>
            </div>
          </PageWrap>
        </section>

        <section className="section b2c-section b2c-section--features" id="features">
          <PageWrap>
            <SectionHeading
              title="Thiết kế giàu cảm xúc cho B2C"
              copy="Variant source riêng giúp nhịp thị giác, CTA và thứ tự section giữ đúng design gốc của B2C."
            />
            <FeatureCards features={content.features} />
          </PageWrap>
        </section>

        <section className="section b2c-section b2c-section--proof">
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
                      <strong>{stat.value}</strong>
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
                    <figcaption>Hero emotion</figcaption>
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
                  <figcaption>Human proof</figcaption>
                </figure>
              </div>
            </div>
          </PageWrap>
        </section>

        <section className="section b2c-section" id="faq">
          <PageWrap>
            <SectionHeading title="FAQ" />
            <FaqList items={content.faq} />
          </PageWrap>
        </section>

        <section className="section b2c-section b2c-section--contact" id="contact">
          <PageWrap>
            <div className="b2c-final-card">
              <div className="eyebrow">Ready to launch</div>
              <h2 className="section-title" style={{ marginTop: 18 }}>
                Deploy riêng cho {content.variantLabel} ngay từ đầu.
              </h2>
              <p className="section-copy">
                Bạn chỉ cần thay content, domain và build command. Nền tảng UI, SEO, motion và
                performance đã được chuẩn bị để scale tiếp.
              </p>
            </div>
          </PageWrap>
        </section>
      </PageMain>

      <footer className="b2c-footer">
        <PageWrap>
          <div className="b2c-footer-grid">
            <div>
              <div className="brand">
                <span className="brand-mark" aria-hidden="true" />
                <span>{content.brand}</span>
              </div>
              <p>{content.footer?.description}</p>
            </div>

            <nav className="b2c-footer-links" aria-label="B2C footer">
              {content.footer?.nav.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="b2c-footer-cta">
              <span>{content.finalCta.eyebrow}</span>
              <a className="button primary" href="#contact">
                {content.hero.primaryCta}
              </a>
            </div>
          </div>
          <p className="b2c-footer-meta">{content.footer?.copyright}</p>
        </PageWrap>
      </footer>
    </PageShell>
  );
}
