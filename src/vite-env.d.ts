/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Meta (Facebook) Pixel ID. Leave unset to keep Pixel tracking disabled. */
  readonly VITE_META_PIXEL_ID?: string;
  /** Google Apps Script Web App URL used to log orders to a Google Sheet. */
  readonly VITE_ORDER_SHEET_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
