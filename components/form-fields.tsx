import type { ReactNode } from "react";

export const inputClass =
  "block w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-base text-navy-950 shadow-sm placeholder:text-navy-300 focus:border-navy-600 focus:outline-none focus:ring-4 focus:ring-sun-300/60 user-invalid:border-ember-500";

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy-900">
        {label}
        {required ? (
          <span className="text-ember-500" aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-navy-300"> (optional)</span>
        )}
      </label>
      {children}
      {hint && <p className="text-xs text-navy-600/80">{hint}</p>}
    </div>
  );
}

export function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1.5 text-sm font-semibold text-navy-900">
        {legend} <span className="font-normal text-navy-300">(optional)</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="cursor-pointer rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 transition has-checked:border-navy-800 has-checked:bg-navy-800 has-checked:text-white has-focus-visible:ring-4 has-focus-visible:ring-sun-300/60"
          >
            <input type="checkbox" name={name} value={option} className="sr-only" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
