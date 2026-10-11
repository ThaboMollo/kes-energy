"use client";

import { WhatsAppForm } from "./whatsapp-form";
import { CheckboxGroup, Field, inputClass } from "./form-fields";
import { formatMessage } from "@/lib/whatsapp";

const languages = ["Setswana", "English", "Afrikaans", "isiXhosa", "isiZulu", "Sesotho", "Other"];

export function ApplicationForm({ jobTitle, towns }: { jobTitle: string; towns: readonly string[] }) {
  return (
    <WhatsAppForm
      submitLabel="Apply on WhatsApp"
      successTitle="Last step: attach your CV and press send"
      successBody={
        <ol className="mx-auto mt-2 max-w-sm list-decimal space-y-1 pl-5 text-left">
          <li>Your application is ready in a WhatsApp chat with our team.</li>
          <li>
            Tap the <strong>📎 attachment</strong> button and add your CV (a PDF or a clear photo is fine).
          </li>
          <li>Press <strong>send</strong>. We&apos;ll reply on WhatsApp.</li>
        </ol>
      }
      buildMessage={(data) =>
        formatMessage(`Job application: ${jobTitle}`, [
          ["Full name", data.get("name")?.toString()],
          ["Town", data.get("town")?.toString()],
          ["Suburb / village", data.get("suburb")?.toString()],
          ["Email", data.get("email")?.toString()],
          ["Sales experience", data.get("experience")?.toString()],
          ["Transport", data.get("transport")?.toString()],
          ["Languages", data.getAll("language").join(", ")],
          ["Why I want to join", data.get("motivation")?.toString()],
          ["Consent", "I agree that KES Energy Northwest may use my details for recruitment."],
        ]) + "\n\n_My CV is attached._"
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="a-name" required>
          <input id="a-name" name="name" required autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Email" htmlFor="a-email">
          <input id="a-email" name="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Town you'd work in" htmlFor="a-town" required>
          <select id="a-town" name="town" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose your town</option>
            {towns.map((town) => (
              <option key={town}>{town}</option>
            ))}
            <option>Other town in North West</option>
          </select>
        </Field>
        <Field label="Suburb or village" htmlFor="a-suburb">
          <input id="a-suburb" name="suburb" className={inputClass} />
        </Field>
        <Field label="Sales experience" htmlFor="a-experience" required>
          <select id="a-experience" name="experience" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose one</option>
            <option>No experience yet</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>More than 3 years</option>
          </select>
        </Field>
        <Field label="How will you get around?" htmlFor="a-transport" required>
          <select id="a-transport" name="transport" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose one</option>
            <option>Own car and driver&apos;s licence</option>
            <option>Driver&apos;s licence, no car</option>
            <option>Public transport / walking</option>
          </select>
        </Field>
      </div>
      <CheckboxGroup legend="Languages you speak" name="language" options={languages} />
      <Field label="Why do you want to join KES Energy?" htmlFor="a-motivation">
        <textarea id="a-motivation" name="motivation" rows={3} maxLength={500} className={inputClass} />
      </Field>
      <label className="flex items-start gap-3 text-sm text-navy-800">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy-300 accent-navy-800"
        />
        <span>
          I agree that KES Energy Northwest may use my details to consider my application, as explained in the{" "}
          <a href="/privacy" className="font-semibold underline">privacy notice</a>.
          <span className="text-ember-500" aria-hidden="true"> *</span>
        </span>
      </label>
    </WhatsAppForm>
  );
}
