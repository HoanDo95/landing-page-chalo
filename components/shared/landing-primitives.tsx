import Image from "next/image";
import type { ReactNode } from "react";

import type { LandingFaqItem, LandingFeature, LandingStat } from "@/lib/landing-content";

interface ChildrenProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

interface MainProps extends ChildrenProps {
  tabIndex?: number;
}

interface TopbarProps {
  brand: string;
  variantLabel: string;
  logoSrc?: string;
}

interface HeroCopyProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
}

interface HeroActionsProps {
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
}

interface StatGridProps {
  stats: LandingStat[];
}

interface ShowcaseCard {
  label: string;
  bars: Array<{ width: string; dim?: boolean }>;
  large?: boolean;
}

interface ShowcasePanelProps {
  primary: ShowcaseCard;
  secondary: ShowcaseCard;
}

interface SectionHeadingProps {
  title: string;
  copy?: string;
  align?: "start" | "between";
  invert?: boolean;
}

interface FeatureCardsProps {
  features: LandingFeature[];
  tone?: "light" | "dark";
}

interface FaqListProps {
  items: LandingFaqItem[];
}

interface FooterBarProps {
  brand: string;
}

/** Wraps the page in a shared background treatment and outer page container. */
export function PageShell({ children, id, className }: ChildrenProps) {
  return (
    <div className={`page${className ? ` ${className}` : ""}`} id={id}>
      <div className="noise" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Renders the primary page landmark without including header/footer chrome. */
export function PageMain({ children, id, className, tabIndex }: MainProps) {
  return (
    <main className={`page-main${className ? ` ${className}` : ""}`} id={id} tabIndex={tabIndex}>
      {children}
    </main>
  );
}

/** Constrains content width for section layouts. */
export function PageWrap({ children }: ChildrenProps) {
  return <div className="wrap">{children}</div>;
}

/** Renders the compact generic header used by the simpler landing variant. */
export function Topbar({ brand, variantLabel, logoSrc }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="brand">
        {logoSrc ? (
          <span className="brand-logo" aria-label={brand}>
            <Image alt="" fill priority sizes="180px" src={logoSrc} />
          </span>
        ) : (
          <>
            <span className="brand-mark" aria-hidden="true" />
            <span>{brand}</span>
          </>
        )}
      </div>
      <div className="pill">{variantLabel}</div>
    </header>
  );
}

/** Renders the shared hero copy stack with accent emphasis. */
export function HeroCopy({ eyebrow, title, titleAccent, description }: HeroCopyProps) {
  return (
    <>
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="headline">
        {title} <span className="accent">{titleAccent}</span>
      </h1>
      <p className="subcopy">{description}</p>
    </>
  );
}

/** Renders paired call-to-action links for hero sections. */
export function HeroActions({
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref
}: HeroActionsProps) {
  return (
    <div className="cta-row">
      <a className="button primary" href={primaryHref}>
        {primaryCta}
      </a>
      <a className="button secondary" href={secondaryHref}>
        {secondaryCta}
      </a>
    </div>
  );
}

/** Displays a simple stat grid for content-driven highlights. */
export function StatGrid({ stats }: StatGridProps) {
  return (
    <div className="stats" aria-label="key metrics">
      {stats.map((stat) => (
        <div className="stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Renders the generic abstract showcase used by the simpler landing variant. */
export function ShowcasePanel({ primary, secondary }: ShowcasePanelProps) {
  return (
    <div className="showcase" aria-hidden="true">
      <div className="glass-card">
        <div className="preview">
          <div className="preview-grid">
            <div className={`preview-card${primary.large ? " large" : ""}`}>
              <span className="label">{primary.label}</span>
              <div className="bars">
                {primary.bars.map((bar, index) => (
                  <div
                    key={`${primary.label}-${index}`}
                    className={`bar${bar.dim ? " dim" : ""}`}
                    style={{ width: bar.width }}
                  />
                ))}
              </div>
            </div>
            <div className={`preview-card${secondary.large ? " large" : ""}`}>
              <span className="label">{secondary.label}</span>
              <div className="bars">
                {secondary.bars.map((bar, index) => (
                  <div
                    key={`${secondary.label}-${index}`}
                    className={`bar${bar.dim ? " dim" : ""}`}
                    style={{ width: bar.width }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Renders a reusable section heading with optional supporting copy. */
export function SectionHeading({
  title,
  copy,
  align = "between",
  invert = false
}: SectionHeadingProps) {
  return (
    <div
      className={`section-head section-head--${align}${invert ? " section-head--invert" : ""}`}
    >
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}

/** Renders a neutral grid of content cards. */
export function FeatureCards({ features, tone = "light" }: FeatureCardsProps) {
  return (
    <div className={`cards cards--${tone}`}>
      {features.map((item, index) => (
        <article className="card" key={item.title}>
          <div className="badge">0{index + 1}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

/** Renders an accessible FAQ list using native disclosure elements. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary>
            <span>{item.question}</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

/** Renders the compact generic footer used by the simpler landing variant. */
export function FooterBar({ brand }: FooterBarProps) {
  return (
    <footer className="footer">
      <div className="wrap">
        © {new Date().getFullYear()} {brand}
      </div>
    </footer>
  );
}
