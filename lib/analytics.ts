export type AnalyticsEventName = string;

export type AnalyticsEventProperties = Record<string, string | number | boolean>;

export type AnalyticsEvent =
  | { type: "page_view"; path: string }
  | { type: "cta_click"; cta: string; location: string }
  | { type: "tour_select"; tourId: string; tourName: string }
  | { type: "form_submit"; form: string; success: boolean }
  | { type: "form_error"; field: string; error: string };

export function trackEvent(
  name: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  void name;
  void properties;
  // Neutral no-op placeholder: callers provide variant-owned event names until a real provider is approved.
}

export function track(event: AnalyticsEvent): void {
  trackEvent(event.type, Object.fromEntries(
    Object.entries(event).filter(([key]) => key !== "type")
  ) as AnalyticsEventProperties);
}
