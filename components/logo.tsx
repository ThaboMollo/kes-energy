// Placeholder wordmark drawn to match the flyer. Swap for the client's
// vector logo (public/logo.svg) once it arrives.
export function Logo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="24" cy="24" r="10" fill="#ffc81f" />
        <path
          d="M6 30C10 14 28 6 44 12"
          fill="none"
          stroke="#e2362b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M4 37C12 22 30 15 46 20"
          fill="none"
          stroke={inverted ? "#ffffff" : "#1e2f78"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-black italic tracking-tight ${inverted ? "text-white" : "text-navy-800"}`}
        >
          KES <span className="text-ember-500 not-italic font-extrabold">energy</span>
        </span>
        <span
          className={`mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] ${inverted ? "text-sun-300" : "text-sun-600"}`}
        >
          Northwest
        </span>
      </span>
    </span>
  );
}
