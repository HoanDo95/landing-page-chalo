"use client";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

interface TrackedCtaLinkProps {
  href: string;
  className: string;
  children: string;
  ariaLabel?: string;
  eventName?: AnalyticsEventName;
  placement: string;
  onClick?: () => void;
}

/** Renders a CTA link that emits a typed no-op analytics event. */
export function TrackedCtaLink({
  href,
  className,
  children,
  ariaLabel,
  eventName,
  placement,
  onClick
}: TrackedCtaLinkProps) {
  function handleClick() {
    if (eventName) {
      trackEvent(eventName, { placement });
    }

    onClick?.();
  }

  return (
    <a aria-label={ariaLabel} className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
