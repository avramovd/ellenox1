export const GTM_ID = "GTM-K7QDJ977"

export const CONSENT_STORAGE_KEY = "cookie-consent"

/** Event that reopens the banner so a visitor can change or withdraw consent. */
export const CONSENT_SETTINGS_EVENT = "ellenox:open-cookie-settings"

export type ConsentCategories = {
  analytics: boolean
  marketing: boolean
}

/**
 * Category -> Consent Mode v2 signal mapping.
 * `analytics` drives analytics_storage; `marketing` drives the three ad signals.
 * functionality_storage / security_storage stay granted — they are strictly
 * necessary and are not offered as a choice.
 */
export function consentPayload({ analytics, marketing }: ConsentCategories) {
  return {
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
    analytics_storage: analytics ? "granted" : "denied",
  } as const
}

/**
 * Reads the stored choice, or null when the visitor must be asked.
 *
 * Legacy flat values were written before categories existed:
 *   "declined" — an unambiguous refusal, so it carries over as all-denied.
 *   "accepted" — a blanket accept given against a banner that never named
 *                analytics and marketing separately. That is not informed
 *                consent for either category, so it is deliberately NOT
 *                migrated: null re-prompts with the new banner.
 */
export function readStoredConsent(): ConsentCategories | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    if (raw === "accepted") return null
    if (raw === "declined") return { analytics: false, marketing: false }
    const parsed = JSON.parse(raw)
    return { analytics: parsed.analytics === true, marketing: parsed.marketing === true }
  } catch {
    return null
  }
}

/**
 * Google Consent Mode v2 defaults.
 *
 * Must be evaluated BEFORE the GTM container loads, otherwise tags fire once
 * with no consent state at all. All four ad/analytics signals start `denied`;
 * a previously stored choice is replayed immediately after, still ahead of
 * gtm.js, so returning visitors keep the decision they already made.
 */
export const CONSENT_DEFAULT_SNIPPET = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});
try {
  var raw = window.localStorage.getItem('${CONSENT_STORAGE_KEY}');
  // Legacy 'accepted' is intentionally ignored — see readStoredConsent(). The
  // defaults above stay denied and the banner re-prompts for the categories.
  if (raw && raw !== 'accepted') {
    var a = false, m = false;
    if (raw === 'declined') { a = false; m = false; }
    else { var p = JSON.parse(raw); a = p.analytics === true; m = p.marketing === true; }
    gtag('consent', 'update', {
      'ad_storage': m ? 'granted' : 'denied',
      'ad_user_data': m ? 'granted' : 'denied',
      'ad_personalization': m ? 'granted' : 'denied',
      'analytics_storage': a ? 'granted' : 'denied'
    });
    window.dataLayer.push({
      event: 'cookie_consent_update',
      consent_analytics: a ? 'granted' : 'denied',
      consent_marketing: m ? 'granted' : 'denied',
      consent_source: 'stored'
    });
  }
} catch (e) {}
`.trim()

export const GTM_SNIPPET = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`.trim()

export const GTM_NOSCRIPT_SRC = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
