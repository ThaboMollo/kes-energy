import type { Metadata } from "next";
import Link from "next/link";
import { HeroArt } from "@/components/hero-art";
import { QuoteForm } from "@/components/quote-form";
import {
  ArrowRightIcon,
  BatteryIcon,
  BoltIcon,
  BuildingIcon,
  CheckIcon,
  ChevronDownIcon,
  CoinsIcon,
  HomeIcon,
  LeafIcon,
  PanelIcon,
  PinIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { JsonLd } from "@/lib/json-ld";
import { faqs } from "@/lib/faq";
import { jobs } from "@/lib/jobs";
import { ogBase } from "@/lib/seo";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...ogBase,
    url: "/",
    title: `${site.name} | Solar Panels & Backup Power in North West`,
    description: site.description,
  },
};

const solutions = [
  {
    icon: PanelIcon,
    title: "Solar panels",
    body: "Generate your own clean electricity from the North West sun and cut your monthly bill.",
  },
  {
    icon: BatteryIcon,
    title: "Inverters & batteries",
    body: "Keep the lights, Wi-Fi and fridge running during load shedding and outages.",
  },
  {
    icon: HomeIcon,
    title: "Home solar systems",
    body: "Complete systems sized for your household, from essentials-only backup to full solar.",
  },
  {
    icon: BuildingIcon,
    title: "Business & farm solar",
    body: "Reduce operating costs and protect your business from downtime when the grid goes down.",
  },
];

const benefits = [
  { icon: CoinsIcon, title: "Save on electricity", body: "Use free energy from the sun and rely less on rising tariffs." },
  { icon: BoltIcon, title: "Power when you need it", body: "Battery backup keeps essentials on through load shedding." },
  { icon: ShieldIcon, title: "Energy independence", body: "Take control of your power instead of waiting on the grid." },
  { icon: LeafIcon, title: "A greener tomorrow", body: "Clean, renewable energy for your family and community." },
];

const steps = [
  { title: "Tell us what you need", body: "Send your details through the quote form or WhatsApp. It takes two minutes." },
  { title: "Get a recommendation", body: "We'll suggest the right system for your usage and budget, with a free quote." },
  { title: "Switch to solar", body: "Start saving and enjoy reliable power, rain or shine." },
];

export default function Home() {
  const job = jobs[0];

  const businessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    slogan: site.taglines.secondary,
    address: {
      "@type": "PostalAddress",
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: site.towns.map((town) => ({ "@type": "City", name: `${town}, ${site.region}` })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: whatsappLink(),
      availableLanguage: ["English", "Setswana", "Afrikaans"],
    },
    knowsAbout: ["Solar panels", "Inverters", "Battery backup", "Load shedding solutions"],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <JsonLd data={businessLd} />
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sun-100 via-sun-100/60 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-16">
          <div>
            {job && (
              <Link
                href={`/careers/${job.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-navy-900 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white shadow-sm"
              >
                <span className="rounded-full bg-sun-400 px-2.5 py-0.5 text-xs font-bold uppercase text-navy-950">
                  Hiring
                </span>
                {job.openings} sales agents wanted
                <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            )}
            <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              Solar power for homes &amp; businesses in{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">North West</span>
                <span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-0 h-3 -skew-x-12 bg-sun-400 sm:h-4" />
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-800">
              Save on electricity and keep the lights on through load shedding with solar panels, inverters and
              battery backup from {site.name}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-7 py-4 font-bold text-white shadow-lg shadow-navy-900/20 transition hover:bg-navy-800"
              >
                Get a free quote <ArrowRightIcon className="h-5 w-5" />
              </a>
              <a
                href={whatsappLink(`Hi ${site.name}, I'd like to find out more about solar.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-whatsapp bg-white px-7 py-4 font-bold text-whatsapp transition hover:bg-whatsapp hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-700">
              <span className="h-px w-8 bg-ember-500" /> {site.taglines.primary}
            </p>
          </div>
          <HeroArt className="mx-auto w-full max-w-md md:max-w-none" />
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading eyebrow="Solar solutions" title="Everything you need to go solar" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sun-400 text-navy-950">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-extrabold text-navy-950">{title}</h3>
              <p className="mt-2 text-navy-700">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Why solar */}
      <section id="why-solar" className="bg-navy-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <SectionHeading eyebrow="Why solar" title="Your energy, our future" inverted />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon className="h-9 w-9 text-sun-400" />
                <h3 className="mt-4 font-display text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-navy-200">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading eyebrow="How it works" title="Going solar is simple" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl bg-sun-100 p-6">
              <span className="font-display text-5xl font-black text-sun-500">{index + 1}</span>
              <h3 className="mt-2 font-display text-lg font-extrabold text-navy-950">{step.title}</h3>
              <p className="mt-2 text-navy-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Areas */}
      <section id="areas" className="border-y border-navy-100 bg-navy-50/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <SectionHeading eyebrow="Areas we serve" title="Proudly serving North West province" align="left" />
            <p className="mt-4 text-navy-700">
              From Mahikeng to Rustenburg, our local team helps households, businesses and farms across North West
              switch to reliable solar power.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {site.towns.map((town) => (
              <li key={town} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-navy-900 shadow-sm ring-1 ring-navy-100">
                <PinIcon className="h-5 w-5 text-ember-500" /> {town}
              </li>
            ))}
            <li className="inline-flex items-center rounded-full px-5 py-3 font-semibold text-navy-700">
              &amp; surrounding areas
            </li>
          </ul>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Free quote" title="Find out what solar can do for you" align="left" />
            <p className="mt-4 text-navy-700">
              Answer a few quick questions and we&apos;ll send you a recommendation and quote on WhatsApp. No
              obligation, no calls.
            </p>
            <ul className="mt-6 grid gap-3 text-navy-800">
              {["Free, no-obligation quote", "Advice on the right system size", "Reply on WhatsApp"].map((item) => (
                <li key={item} className="flex items-center gap-3 font-medium">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sun-400 text-navy-950">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-xl shadow-navy-900/5 sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Careers band */}
      {job && (
        <section className="relative overflow-hidden bg-sun-400">
          <div aria-hidden="true" className="absolute -right-24 top-0 h-full w-1/2 -skew-x-12 bg-navy-900 max-md:hidden" />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-navy-800">We&apos;re hiring</p>
              <h2 className="mt-2 font-display text-3xl font-black leading-tight text-navy-950 sm:text-4xl">
                {job.openings} sales agents wanted across North West
              </h2>
              <p className="mt-3 max-w-md text-navy-900">
                Sell solar, earn uncapped commission and help your community save on electricity.
              </p>
            </div>
            <div className="md:justify-self-end">
              <Link
                href={`/careers/${job.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-navy-950 shadow-lg transition hover:bg-sun-100"
              >
                View the role &amp; apply <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <SectionHeading eyebrow="FAQ" title="Questions we often get" />
        <div className="mt-10 divide-y divide-navy-100 rounded-2xl border border-navy-100">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-1 font-semibold text-navy-950">
                <h3>{q}</h3>
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-navy-600 transition group-open:rotate-180" />
              </summary>
              <p className="pb-2 pt-3 text-navy-700">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  inverted = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  inverted?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : ""}>
      <p className={`text-sm font-bold uppercase tracking-wider ${inverted ? "text-sun-400" : "text-ember-500"}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-2 font-display text-3xl font-black tracking-tight sm:text-4xl ${inverted ? "text-white" : "text-navy-950"}`}
      >
        {title}
      </h2>
    </div>
  );
}
