"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Wraps a native form. On submit it turns the fields into a WhatsApp message
 * and opens a chat with the business. Nothing is stored by the website.
 */
export function WhatsAppForm({
  buildMessage,
  submitLabel,
  successTitle,
  successBody,
  children,
}: {
  buildMessage: (data: FormData) => string;
  submitLabel: string;
  successTitle: string;
  successBody: ReactNode;
  children: ReactNode;
}) {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const url = whatsappLink(buildMessage(new FormData(form)));
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (sentUrl) {
    return (
      <div role="status" className="rounded-2xl border border-whatsapp/30 bg-white p-6 text-center sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white">
          <WhatsAppIcon className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-xl font-extrabold text-navy-950">{successTitle}</h3>
        <div className="mt-2 text-navy-700">{successBody}</div>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp didn&apos;t open? Tap here
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="text-sm font-semibold text-navy-700 underline underline-offset-4 hover:text-navy-950"
          >
            Edit my details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {children}
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-whatsapp-dark focus:outline-none focus-visible:ring-4 focus-visible:ring-sun-300 sm:w-auto sm:justify-self-start"
      >
        <WhatsAppIcon className="h-5 w-5" />
        {submitLabel}
      </button>
    </form>
  );
}
