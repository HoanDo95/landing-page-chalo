"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedMetricValueProps {
  value: string | number;
  className?: string;
  durationMs?: number;
  delayMs?: number;
}

interface ParsedMetricValue {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useGrouping: boolean;
}

const NUMBER_PATTERN = /^(.*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

function parseMetricValue(value: string): ParsedMetricValue | null {
  const match = value.match(NUMBER_PATTERN);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const target = Number(numericPart.replaceAll(",", ""));

  if (!Number.isFinite(target)) {
    return null;
  }

  return {
    prefix,
    target,
    suffix,
    decimals: numericPart.includes(".") ? numericPart.split(".")[1]?.length ?? 0 : 0,
    useGrouping: numericPart.includes(",") || target >= 1000
  };
}

function formatMetricValue(parsed: ParsedMetricValue, currentValue: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: parsed.decimals,
    minimumFractionDigits: parsed.decimals,
    useGrouping: parsed.useGrouping
  });

  return `${parsed.prefix}${formatter.format(currentValue)}${parsed.suffix}`;
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function shouldReduceMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedMetricValue({
  value,
  className,
  durationMs = 1400,
  delayMs = 0
}: AnimatedMetricValueProps) {
  const targetValue = String(value);
  const parsed = useMemo(() => parseMetricValue(targetValue), [targetValue]);
  const [displayValue, setDisplayValue] = useState(targetValue);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    setDisplayValue(targetValue);
    hasAnimatedRef.current = false;
  }, [targetValue]);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || !parsed || shouldReduceMotion() || typeof IntersectionObserver === "undefined") {
      setDisplayValue(targetValue);
      return;
    }

    const parsedMetric = parsed;
    let animationFrame = 0;
    let delayTimer = 0;

    function startAnimation() {
      hasAnimatedRef.current = true;
      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.max(0, Math.min(elapsed / durationMs, 1));
        const currentValue = parsedMetric.target * easeOutCubic(progress);

        setDisplayValue(formatMetricValue(parsedMetric, currentValue));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
          return;
        }

        setDisplayValue(targetValue);
      }

      setDisplayValue(formatMetricValue(parsedMetric, 0));
      animationFrame = requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        delayTimer = window.setTimeout(startAnimation, delayMs);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(animationFrame);
    };
  }, [delayMs, durationMs, parsed, targetValue]);

  return (
    <span ref={elementRef} className={className} aria-label={targetValue}>
      {displayValue}
    </span>
  );
}
