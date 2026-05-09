export type AnalyticsEventName = string;

export type AnalyticsEventProperties = Record<string, string | number | boolean>;

export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  void name;
  void properties;
  // Neutral no-op placeholder: callers provide variant-owned event names until a real provider is approved.
}
