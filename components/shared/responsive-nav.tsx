"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { PageWrap } from "@/components/shared/landing-primitives";
import { TrackedCtaLink } from "@/components/shared/tracked-cta-link";
import type { ActionLink, LandingLogoContent } from "@/lib/landing-content";
import type { AnalyticsEventName } from "@/lib/analytics";

interface ResponsiveNavProps {
  brand: string;
  logo?: LandingLogoContent;
  links: ActionLink[];
  cta: ActionLink;
  ctaEventName?: AnalyticsEventName;
}

interface InlineLinkGroupProps {
  links: ActionLink[];
  className?: string;
  onNavigate?: (href: string) => void;
}

/** Renders a responsive, keyboard-accessible navigation bar. */
export function ResponsiveNav({ brand, logo, links, cta, ctaEventName }: ResponsiveNavProps) {
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTargetRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function isVisible(element: HTMLElement | null) {
    if (!element) {
      return false;
    }

    const styles = window.getComputedStyle(element);
    return (
      styles.display !== "none" &&
      styles.visibility !== "hidden" &&
      element.getClientRects().length > 0
    );
  }

  function getFallbackFocusTarget() {
    if (isVisible(toggleRef.current)) {
      return toggleRef.current;
    }

    return (
      menuRef.current?.closest(".site-nav")?.querySelector<HTMLElement>(
        ".site-nav-actions > .button, .site-nav-links--desktop a, .site-brand"
      ) ?? null
    );
  }

  function resolveInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
      return null;
    }

    return target.closest<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
    );
  }

  function resolveNavigationTarget(href: string) {
    if (!href.startsWith("#")) {
      return null;
    }

    const targetId = decodeURIComponent(href.slice(1));
    if (!targetId) {
      return null;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return null;
    }

    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
    }

    return target;
  }

  function closeMenu(nextFocusTarget?: HTMLElement | null) {
    restoreFocusTargetRef.current = nextFocusTarget ?? getFallbackFocusTarget();
    setIsMenuOpen(false);
  }

  function handlePanelNavigation(href: string) {
    closeMenu(resolveNavigationTarget(href));
  }

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMenu(resolveInteractiveTarget(event.target));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 860 && isMenuOpen) {
        closeMenu();
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen || !restoreFocusTargetRef.current) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const fallbackTarget = getFallbackFocusTarget();
      const focusTarget = restoreFocusTargetRef.current;
      const nextTarget =
        focusTarget && focusTarget.isConnected ? focusTarget : fallbackTarget;

      nextTarget?.focus({ preventScroll: nextTarget !== fallbackTarget });
      restoreFocusTargetRef.current = null;
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isMenuOpen]);

  function handleToggleClick() {
    if (isMenuOpen) {
      closeMenu(toggleRef.current);
      return;
    }

    restoreFocusTargetRef.current = null;
    setIsMenuOpen(true);
  }

  return (
    <header className="site-header">
      <PageWrap>
        <nav className="site-nav" aria-label="Primary">
          <a className="site-brand" href="#top" aria-label={`${brand} home`}>
            {logo ? (
              <span className="site-brand-logo" aria-hidden="true">
                <Image alt="" fill priority sizes="184px" src={logo.src} />
              </span>
            ) : (
              <>
                <span className="site-brand-mark" aria-hidden="true">
                  {brand.slice(0, 1)}
                </span>
                <span>{brand}</span>
              </>
            )}
          </a>

          <div className="site-nav-links site-nav-links--desktop">
            <InlineLinkGroup links={links} />
          </div>

          <div className="site-nav-actions">
            <TrackedCtaLink
              className="button primary button--compact"
              eventName={ctaEventName}
              href={cta.href}
              placement="nav-desktop"
            >
              {cta.label}
            </TrackedCtaLink>

            <div className="site-nav-menu" ref={menuRef}>
              <button
                type="button"
                className="site-nav-toggle"
                aria-controls={panelId}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={handleToggleClick}
                ref={toggleRef}
              >
                <span />
                <span />
                <span />
              </button>

              <div className="site-nav-panel" id={panelId} hidden={!isMenuOpen}>
                <InlineLinkGroup
                  links={links}
                  className="site-nav-links--mobile"
                  onNavigate={handlePanelNavigation}
                />
                <TrackedCtaLink
                  className="button primary site-nav-panel-cta"
                  eventName={ctaEventName}
                  href={cta.href}
                  placement="nav-mobile"
                  onClick={() => handlePanelNavigation(cta.href)}
                >
                  {cta.label}
                </TrackedCtaLink>
              </div>
            </div>
          </div>
        </nav>
      </PageWrap>
    </header>
  );
}

/** Renders a small reusable inline link group for the responsive nav. */
function InlineLinkGroup({ links, className, onNavigate }: InlineLinkGroupProps) {
  function handleClick(href: string) {
    onNavigate?.(href);
  }

  return (
    <div className={className}>
      {links.map((link) => (
        <a key={link.href} href={link.href} onClick={() => handleClick(link.href)}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
