// Single source of truth for business details. Update here, not in components.

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Set automatically by Vercel to the production domain (e.g. kes-energy.vercel.app).
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "KES Energy Northwest",
  shortName: "KES Energy",
  url: resolveSiteUrl().replace(/\/$/, ""),
  description:
    "Solar panels, inverters and battery backup for homes and businesses across North West province: Mahikeng, Rustenburg, Zeerust, Lichtenburg, Taung and surrounds.",
  taglines: {
    primary: "Clean Energy. Brighter Futures.",
    secondary: "Your Energy, Our Future",
    footer: "Solar Solutions | Energy Independence",
  },
  // WhatsApp only: the flyer says "No calls", so we never render a tel: link.
  whatsapp: {
    display: "073 244 3408",
    international: "27732443408",
  },
  region: "North West",
  country: "ZA",
  towns: ["Mahikeng", "Rustenburg", "Zeerust", "Lichtenburg", "Taung"],
} as const;

export type Town = (typeof site.towns)[number];
