// Logs every completed order to a Google Sheet via a Google Apps Script Web
// App webhook (the same pattern used elsewhere in your other landing pages).
//
// Set VITE_ORDER_SHEET_WEBHOOK_URL (e.g. in .env.local or your Vercel
// project's Environment Variables) to activate this. Until it's set, this
// safely no-ops so the checkout flow itself never breaks — but it also means
// NO order is being backed up anywhere except the customer's own WhatsApp
// tap, so this should be configured before going live with real traffic.

const WEBHOOK_URL = import.meta.env.VITE_ORDER_SHEET_WEBHOOK_URL;

export async function logOrderToSheet(payload: Record<string, unknown>): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn(
      "[order-log] VITE_ORDER_SHEET_WEBHOOK_URL is not configured — this order was NOT saved to Google Sheets."
    );
    return;
  }
  try {
    // Apps Script Web Apps typically don't return CORS headers, so we use
    // no-cors: the request still lands and executes server-side, we just
    // can't read the response body back to confirm it in the browser.
    await fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Never block the customer's thank-you screen on a logging failure.
    console.error("[order-log] failed to log order to Google Sheets:", err);
  }
}
