"use client";

import { WhatsAppForm } from "./whatsapp-form";
import { CheckboxGroup, Field, inputClass } from "./form-fields";
import { formatMessage } from "@/lib/whatsapp";
import { site } from "@/lib/site";

const interests = ["Solar panels", "Inverter & battery backup", "Complete solar system", "Not sure yet"];
const bills = ["Under R1,000", "R1,000 – R2,500", "R2,500 – R5,000", "R5,000 – R10,000", "Over R10,000"];

export function QuoteForm() {
  return (
    <WhatsAppForm
      submitLabel="Send quote request on WhatsApp"
      successTitle="Almost done: press send in WhatsApp"
      successBody={<p>Your details are ready in a WhatsApp chat with our team. Press send and we&apos;ll reply on WhatsApp.</p>}
      buildMessage={(data) =>
        formatMessage("Solar quote request (website)", [
          ["Name", data.get("name")?.toString()],
          ["Town", data.get("town")?.toString()],
          ["Suburb / village", data.get("suburb")?.toString()],
          ["Property", data.get("property")?.toString()],
          ["Monthly electricity", data.get("bill")?.toString()],
          ["Interested in", data.getAll("interest").join(", ")],
          ["Message", data.get("message")?.toString()],
        ])
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="q-name" required>
          <input id="q-name" name="name" required autoComplete="name" className={inputClass} placeholder="e.g. Thabo Molefe" />
        </Field>
        <Field label="Property type" htmlFor="q-property" required>
          <select id="q-property" name="property" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose one</option>
            <option>Home</option>
            <option>Business</option>
            <option>Farm</option>
          </select>
        </Field>
        <Field label="Town" htmlFor="q-town" required>
          <select id="q-town" name="town" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose your town</option>
            {site.towns.map((town) => (
              <option key={town}>{town}</option>
            ))}
            <option>Other town in North West</option>
          </select>
        </Field>
        <Field label="Suburb or village" htmlFor="q-suburb">
          <input id="q-suburb" name="suburb" autoComplete="address-level3" className={inputClass} />
        </Field>
        <Field label="Monthly electricity spend" htmlFor="q-bill">
          <select id="q-bill" name="bill" defaultValue="" className={inputClass}>
            <option value="">Not sure</option>
            {bills.map((bill) => (
              <option key={bill}>{bill}</option>
            ))}
          </select>
        </Field>
      </div>
      <CheckboxGroup legend="What are you interested in?" name="interest" options={interests} />
      <Field label="Anything else we should know?" htmlFor="q-message">
        <textarea id="q-message" name="message" rows={3} maxLength={500} className={inputClass} />
      </Field>
      <p className="text-xs text-navy-600/80">
        This opens WhatsApp with your details filled in. Nothing is sent until you press send. See our{" "}
        <a href="/privacy" className="underline">privacy notice</a>.
      </p>
    </WhatsAppForm>
  );
}
