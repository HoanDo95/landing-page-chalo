import type { LandingTrustMetric } from "@/lib/landing-content";
import { AnimatedMetricValue } from "@/components/b2c/AnimatedMetricValue";

interface MetricBarProps {
  metrics: LandingTrustMetric[];
}

export function MetricBar({ metrics }: MetricBarProps) {
  return (
    <section className="metric-bar" aria-label="Trust metrics">
      <div className="metric-bar__container">
        {metrics.map((metric, index) => (
          <div key={`${metric.value}-${metric.label}`} className="metric-bar__item">
            <span className={`metric-bar__icon metric-bar__icon--${metric.icon}`} aria-hidden="true" />
            <strong className="metric-bar__value">
              <AnimatedMetricValue value={metric.value} delayMs={index * 80} />
            </strong>
            <span className="metric-bar__label">{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
