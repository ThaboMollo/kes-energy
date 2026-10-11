import type { Metadata } from "next";
import { ogBase } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Privacy Notice";
const description = `How ${site.name} handles the personal information you share with us under POPIA.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { ...ogBase, url: "/privacy", title, description },
};

// Draft notice: have the client (or their adviser) review before launch.
export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="font-display text-4xl font-black text-navy-950">Privacy notice</h1>
      <p className="mt-3 text-sm text-navy-600">Last updated: 11 October 2026</p>

      <div className="mt-8 grid gap-6 leading-relaxed text-navy-800 [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-navy-950 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        <p>
          {site.name} respects your privacy and handles personal information in line with the Protection of
          Personal Information Act, 2013 (POPIA).
        </p>

        <h2>What this website collects</h2>
        <p>
          Our quote and job application forms do <strong>not</strong> store your information on this website.
          When you press the button, your details are placed into a WhatsApp message to our business number (
          {site.whatsapp.display}). Nothing is shared with us until you press send in WhatsApp.
        </p>
        <p>
          We use privacy-friendly analytics (Vercel Analytics) to count page visits and measure site speed. It
          does not use cookies or identify you personally.
        </p>

        <h2>What we receive and why</h2>
        <ul>
          <li>
            <strong>Quote requests:</strong> your name, town, property type, electricity usage and WhatsApp number,
            used only to prepare and send you a quote.
          </li>
          <li>
            <strong>Job applications:</strong> your name, contact details, town, experience, CV and anything
            else you choose to send, used only to consider you for a position.
          </li>
        </ul>

        <h2>How long we keep it</h2>
        <p>
          We keep quote requests for as long as needed to serve you, and job applications for up to 12 months
          after recruitment closes, unless you ask us to delete them sooner.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask us what information we hold about you, ask us to correct or delete it, or withdraw your
          consent at any time. Send us a WhatsApp message on {site.whatsapp.display}. You may also lodge a
          complaint with the Information Regulator of South Africa.
        </p>

        <h2>WhatsApp</h2>
        <p>
          Messages you send us are also handled by WhatsApp (Meta) under its own privacy policy.
        </p>
      </div>
    </article>
  );
}
