import { site } from "./site";

/** Builds a click-to-chat link that opens WhatsApp with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats label/value pairs as a WhatsApp message, skipping empty values. */
export function formatMessage(title: string, fields: [string, string | undefined][]) {
  const lines = fields
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `*${label}:* ${value!.trim()}`);
  return [`*${title}*`, "", ...lines].join("\n");
}

/** Accepts 0XX XXX XXXX or +27 XX XXX XXXX style numbers. */
export function isValidSaPhone(value: string) {
  const digits = value.replace(/[\s()-]/g, "");
  return /^(\+?27|0)\d{9}$/.test(digits);
}
