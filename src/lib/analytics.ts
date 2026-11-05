// M5: PostHog + Analytics
export function trackEvent(event: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture(event, props)
  }
  console.log("[Analytics]", event, props)
}

export const EVENTS = {
  LANDING_CTA_CLICK: "landing_cta_click",
  ONBOARDING_STEP1_COMPLETE: "onboarding_step1_complete",
  ONBOARDING_STEP2_TOGGLE: "onboarding_step2_toggle",
  ONBOARDING_COMPLETE: "onboarding_complete_62",
  DASHBOARD_VIEW: "dashboard_view",
  GRANT_DETAIL_VIEW: "grant_detail_view_92",
  WORD_GENERATE: "word_generate",
  PRICING_VIEW: "pricing_view",
  PRO_SUBSCRIBE_CLICK: "pro_subscribe_click"
}
