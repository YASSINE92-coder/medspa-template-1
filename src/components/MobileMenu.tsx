"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

/**
 * Mobile disclosure menu — the smallest possible client leaf.
 * Button lives in the sticky header; the panel drops under it (fixed, top-16).
 * A11y: real button, aria-expanded/controls, Escape closes, route change closes,
 * 44px touch target, focus-visible ring per house style.
 */
export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /*
   * Close when the route changes. Tapping a link already closes the panel in its
   * own onClick; this covers browser back/forward while the menu is open.
   * Adjusting state during render — React's documented pattern for "a prop
   * changed, reset some state" — rather than an effect, which would queue a
   * second render pass after paint (react-hooks/set-state-in-effect).
   */
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Close on Escape while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-accent-soft active:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
      </button>

      {open && (
        <>
          {/* click-away veil under the header; tapping it closes the menu */}
          <div
            aria-hidden
            className="fixed inset-0 top-16 z-20 bg-ink/10"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav"
            aria-label="Main menu"
            className="fixed inset-x-0 top-16 z-30 border-b border-ink/5 bg-surface shadow-[0_1px_2px_rgb(16_24_40/0.06),0_8px_24px_-8px_rgb(16_24_40/0.10)]"
          >
            <ul className="mx-auto max-w-6xl px-4 py-1">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href} className="border-b border-ink/5 last:border-0">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block py-3.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                        active ? "font-semibold text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
