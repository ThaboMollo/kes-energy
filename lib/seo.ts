import { site } from "./site";

// Page-level openGraph replaces the layout's object rather than merging,
// so every page spreads this in.
export const ogBase = {
  type: "website",
  locale: "en_ZA",
  siteName: site.name,
} as const;
