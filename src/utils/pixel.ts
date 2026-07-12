// Meta (Facebook) Pixel integration.
//
// Set VITE_META_PIXEL_ID (e.g. in a .env.local file or your Vercel project's
// Environment Variables) to activate tracking. Until it's set, every function
// here is a safe no-op — we never invent a fake Pixel ID, since a wrong one
// would silently send events nowhere useful.
//
// NOTE ON CONVERSIONS API (CAPI): server-side CAPI requires a Meta access
// token that must NEVER be shipped in client-side code (anyone could read it
// from the browser and forge conversion events). That needs a small backend
// endpoint (e.g. a Vercel serverless function) holding the token as a secret
// environment variable. That piece is intentionally not included here — see
// the project notes for how to add it once you're ready.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
let initialized = false;

/** Loads the Pixel base code and fires a standard PageView. Call once on app mount. */
export function initPixel(): void {
  if (!PIXEL_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq?.("init", PIXEL_ID);
  window.fbq?.("track", "PageView");
}

/**
 * Fires the Purchase event. This must ONLY be called from the real checkout
 * submit handler, after validation passes — never on page load, never from
 * the WhatsApp buttons, never from "اطلبي الآن" scroll-to-checkout buttons.
 */
export function trackPurchase(value: number, orderId: string, currency = "JOD"): void {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Purchase", { value, currency }, { eventID: orderId });
}
