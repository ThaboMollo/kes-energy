import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(`Hi ${site.name}, I'd like to find out more about solar.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-navy-950/20 transition hover:scale-105 hover:bg-whatsapp-dark sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
