import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CoinsIcon, PinIcon } from "@/components/icons";
import { getJobOpen, jobs } from "@/lib/jobs";
import { ogBase } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Careers: Solar Sales Jobs in North West";
const description = `Join ${site.name}. We're hiring commission-based solar sales agents in Mahikeng, Rustenburg, Zeerust, Lichtenburg, Taung and across North West.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/careers" },
  openGraph: { ...ogBase, url: "/careers", title, description },
};

export default async function CareersPage() {
  const listings = await Promise.all(
    jobs.map(async (job) => ({ job, open: await getJobOpen(job.slug) })),
  );

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <p className="text-sm font-bold uppercase tracking-wider text-sun-400">Careers</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-black leading-tight sm:text-5xl">
            Help North West switch to solar
          </h1>
          <p className="mt-4 max-w-xl text-lg text-navy-200">
            Join our growing team, earn uncapped commission and be part of a greener tomorrow.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="font-display text-2xl font-extrabold text-navy-950">Open positions</h2>
        <ul className="mt-6 grid gap-4">
          {listings.map(({ job, open }) => (
            <li key={job.slug}>
              <Link
                href={`/careers/${job.slug}`}
                className="group block rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:border-navy-300 hover:shadow-md sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${open ? "bg-sun-400 text-navy-950" : "bg-navy-100 text-navy-700"}`}
                  >
                    {open ? `${job.openings} openings` : "Closed"}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-navy-950 sm:text-2xl">{job.title}</h3>
                <p className="mt-2 max-w-2xl text-navy-700">{job.summary}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-800">
                  <span className="inline-flex items-center gap-1.5">
                    <PinIcon className="h-4 w-4 text-ember-500" /> {job.locations.join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CoinsIcon className="h-4 w-4 text-ember-500" /> Commission based
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-navy-900 group-hover:text-ember-500">
                  View role &amp; apply <ArrowRightIcon className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
