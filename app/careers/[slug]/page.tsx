import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/application-form";
import { BriefcaseIcon, CheckIcon, CoinsIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/lib/json-ld";
import { employmentTypeLabel, getJob, getJobOpen, jobs, type Job } from "@/lib/jobs";
import { ogBase } from "@/lib/seo";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};

  const title = `${job.title}: ${job.openings} Positions in North West`;
  const url = `/careers/${job.slug}`;
  return {
    title,
    description: job.summary,
    alternates: { canonical: url },
    openGraph: { ...ogBase, url, title, description: job.summary },
  };
}

function jobPostingLd(job: Job) {
  const listHtml = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [
      `<p>${job.intro}</p>`,
      `<h3>What you'll do</h3>${listHtml(job.responsibilities)}`,
      `<h3>The ideal candidate</h3>${listHtml(job.requirements)}`,
      `<h3>What we offer</h3>${listHtml(job.offer)}`,
      `<p><strong>Remuneration:</strong> ${job.remuneration}</p>`,
    ].join(""),
    identifier: { "@type": "PropertyValue", name: site.name, value: job.slug },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59+02:00`,
    employmentType: job.employmentType,
    totalJobOpenings: job.openings,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: `${site.url}/icon.svg`,
    },
    jobLocation: job.locations.map((town) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: town,
        addressRegion: site.region,
        addressCountry: site.country,
      },
    })),
    industry: "Renewable energy",
    occupationalCategory: "Sales Representatives",
  };
}

export default function JobPage({ params }: PageProps<"/careers/[slug]">) {
  // Reading params inside Suspense keeps the route's shared App Shell instant on
  // client navigation. Known slugs are still fully prerendered for crawlers.
  return (
    <Suspense fallback={<JobSkeleton />}>
      <JobContent params={params} />
    </Suspense>
  );
}

async function JobContent({ params }: { params: PageProps<"/careers/[slug]">["params"] }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const open = await getJobOpen(job.slug);

  return (
    <>
      {open && <JsonLd data={jobPostingLd(job)} />}

      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-navy-200">
            <Link href="/careers" className="hover:text-sun-300">Careers</Link>
            <span aria-hidden="true"> / </span>
            <span className="text-white">{job.title}</span>
          </nav>
          <p className="mt-6 inline-block -skew-x-6 bg-sun-400 px-3 py-1 font-display text-sm font-black uppercase text-navy-950">
            {open ? `We're looking for ${job.openings} sales agents` : "This position has closed"}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight sm:text-5xl">{job.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">{job.intro}</p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <Fact icon={PinIcon} label="Area" value={`North West: ${job.locations.join(", ")} etc.`} />
            <Fact icon={CoinsIcon} label="Remuneration" value="Commission based (earn on your sales)" />
            <Fact icon={BriefcaseIcon} label="Type" value={employmentTypeLabel[job.employmentType]} />
          </dl>

          {open && (
            <a
              href="#apply"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun-400 px-7 py-4 font-bold text-navy-950 hover:bg-sun-300"
            >
              Apply now
            </a>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1fr_1.1fr]">
        <div className="grid content-start gap-10">
          <JobList title="What you'll do" items={job.responsibilities} />
          <JobList title="The ideal candidate should be" items={job.requirements} />
          <JobList title="What we offer" items={job.offer} />
        </div>

        <section id="apply" aria-labelledby="apply-heading" className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-xl shadow-navy-900/5 sm:p-8">
            {open ? (
              <>
                <h2 id="apply-heading" className="font-display text-2xl font-black text-navy-950">
                  Apply in 2 minutes
                </h2>
                <p className="mt-2 text-navy-700">
                  Fill in your details and we&apos;ll open WhatsApp so you can send your application and CV to{" "}
                  <strong>{site.whatsapp.display}</strong>. WhatsApp messages only, no calls.
                </p>
                <div className="mt-6">
                  <ApplicationForm jobTitle={job.title} towns={job.locations} />
                </div>
              </>
            ) : (
              <>
                <h2 id="apply-heading" className="font-display text-2xl font-black text-navy-950">
                  Applications are closed
                </h2>
                <p className="mt-2 text-navy-700">
                  Thank you for your interest. Check back here for future openings, or send us a message on WhatsApp.
                </p>
                <a
                  href={whatsappLink()}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                </a>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function JobSkeleton() {
  return (
    <section className="bg-navy-900" aria-busy="true">
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-12 sm:px-6 md:py-16">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="mt-8 h-12 max-w-xl rounded bg-white/10" />
        <div className="mt-4 h-20 max-w-2xl rounded bg-white/10" />
      </div>
    </section>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof PinIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun-400 text-navy-950">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <dt className="text-xs font-bold uppercase tracking-wider text-sun-300">{label}</dt>
        <dd className="mt-0.5 text-sm text-white">{value}</dd>
      </div>
    </div>
  );
}

function JobList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-extrabold text-navy-950">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-navy-800">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-400 text-navy-950">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
