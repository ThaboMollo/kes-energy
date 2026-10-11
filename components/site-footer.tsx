import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "./logo";
import { WhatsAppIcon } from "./icons";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">
            {site.taglines.footer}. Solar panels, inverters and battery backup for homes and
            businesses across {site.region}.
          </p>
          <p className="mt-4 font-display text-lg font-extrabold italic text-sun-400">
            {site.taglines.secondary}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Explore</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            <li><Link className="hover:text-sun-300" href="/#solutions">Solar solutions</Link></li>
            <li><Link className="hover:text-sun-300" href="/#quote">Get a free quote</Link></li>
            <li><Link className="hover:text-sun-300" href="/#areas">Areas we serve</Link></li>
            <li><Link className="hover:text-sun-300" href="/careers">Careers</Link></li>
            <li><Link className="hover:text-sun-300" href="/privacy">Privacy notice</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Talk to us</h2>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-bold text-white hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp {site.whatsapp.display}
          </a>
          <p className="mt-3 text-sm text-navy-200">WhatsApp messages only, please. No calls.</p>
          <p className="mt-4 text-sm text-navy-200">
            Serving {site.towns.join(", ")} and surrounding areas.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-navy-300 sm:px-6">
          © <CopyrightYear /> {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
