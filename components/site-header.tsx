import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { MenuIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

const nav = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/#why-solar", label: "Why solar" },
  { href: "/#areas", label: "Areas" },
  { href: "/#faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label="KES Energy Northwest home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-semibold text-navy-800">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-ember-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#quote"
            className="hidden rounded-full bg-sun-400 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-sm transition hover:bg-sun-300 sm:inline-flex"
          >
            Get a free quote
          </Link>

          <MobileMenu>
            <summary
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-navy-900 hover:bg-navy-50"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-navy-100 bg-white p-2 shadow-xl">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3 font-semibold text-navy-900 hover:bg-navy-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2 border-t border-navy-100 p-2 pt-3">
                <Link
                  href="/#quote"
                  className="rounded-full bg-sun-400 px-4 py-3 text-center font-bold text-navy-950"
                >
                  Get a free quote
                </Link>
                <a
                  href={whatsappLink()}
                  className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-bold text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                </a>
              </div>
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
