"use client";

import type { MouseEvent, ReactNode } from "react";

/** A <details> menu that closes itself when one of its links is tapped. */
export function MobileMenu({ children }: { children: ReactNode }) {
  function closeOnLinkClick(event: MouseEvent<HTMLDetailsElement>) {
    if ((event.target as HTMLElement).closest("a")) event.currentTarget.open = false;
  }

  return (
    <details className="group relative md:hidden" onClick={closeOnLinkClick}>
      {children}
    </details>
  );
}
