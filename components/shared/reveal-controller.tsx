"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_ATTRIBUTE = "data-revealed";
const READY_CLASS = "js-reveal-ready";

function revealElement(element: Element) {
  element.setAttribute(REVEALED_ATTRIBUTE, "true");
}

export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));

    root.classList.add(READY_CLASS);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(revealElement);
      return () => {
        root.classList.remove(READY_CLASS);
      };
    }

    const immediateTargets = targets.filter(
      (target) => target.getAttribute("data-reveal") === "hero"
    );
    const observedTargets = targets.filter(
      (target) => target.getAttribute("data-reveal") !== "hero"
    );

    window.requestAnimationFrame(() => {
      immediateTargets.forEach(revealElement);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
      }
    );

    observedTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove(READY_CLASS);
    };
  }, []);

  return null;
}
