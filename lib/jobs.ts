import { cacheLife } from "next/cache";
import { site } from "./site";

export type Job = {
  slug: string;
  title: string;
  summary: string;
  openings: number;
  /** schema.org employmentType values: FULL_TIME, PART_TIME, CONTRACTOR, ... */
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "OTHER";
  remuneration: string;
  locations: readonly string[];
  datePosted: string; // YYYY-MM-DD
  /** After this date the job shows as closed and Google drops it from Google for Jobs. */
  validThrough: string; // YYYY-MM-DD
  intro: string;
  responsibilities: string[];
  requirements: string[];
  offer: string[];
};

// To post a new job, add an object here. Pages, sitemap and structured data follow.
export const jobs: Job[] = [
  {
    slug: "solar-sales-agent-north-west",
    title: "Solar Sales Agent (Commission Based)",
    summary:
      "Sell solar panels, inverters and battery systems to homes and businesses across North West province. Uncapped commission.",
    openings: 30,
    employmentType: "CONTRACTOR",
    remuneration: "Commission based: you earn on every sale, with no cap.",
    locations: site.towns,
    datePosted: "2026-10-11",
    validThrough: "2026-12-31",
    intro:
      "Join our growing team at KES Energy Northwest and earn uncapped commission while helping homes and businesses save on electricity. We are looking for 30 sales agents across North West province.",
    responsibilities: [
      "Introduce solar panels, inverters and battery backup to homes and businesses in your area",
      "Explain how solar helps customers save on electricity and keep the lights on",
      "Find new customers through your network, door-to-door and community events",
      "Pass qualified leads to the KES Energy team and follow up until the sale closes",
    ],
    requirements: [
      "Self-motivated and goal driven",
      "Good communication and people skills",
      "Honest, reliable and trustworthy",
      "Confident and professional",
      "Willing to learn and grow",
      "Passionate about making a difference and helping others",
    ],
    offer: [
      "Uncapped commission on every sale",
      "Work in and around your own town",
      "Product training on solar and backup power",
      "Be part of a greener tomorrow",
    ],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}

export function isJobOpen(job: Job, now = new Date()) {
  return new Date(`${job.validThrough}T23:59:59+02:00`) >= now;
}

export const employmentTypeLabel: Record<Job["employmentType"], string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACTOR: "Independent / commission",
  OTHER: "Other",
};

/**
 * Open/closed status, cached for a day so the page stays static but a job
 * closes on its own after `validThrough` without a redeploy.
 */
export async function getJobOpen(slug: string) {
  "use cache";
  cacheLife("days");
  const job = getJob(slug);
  return job ? isJobOpen(job) : false;
}
