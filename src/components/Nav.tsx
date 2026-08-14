import Link from "next/link";
import content from "@/content";
import MobileMenu from "@/components/MobileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/planner", label: "Treatment Planner" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { business } = content;
  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur border-b border-ink/5">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-heading font-semibold text-lg">
            {business.name}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={business.bookingUrl}
            className="hidden md:inline-block rounded-full bg-accent-ink text-white text-sm font-medium px-5 py-2.5 transition-colors hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Book now
          </a>
          <MobileMenu links={links} />
        </div>
      </header>

      {/* Mobile sticky book bar — recon: booking always one thumb-tap away */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-surface border-t border-ink/10 p-3 flex gap-3">
        <a
          href={`tel:${business.phone.e164}`}
          className="flex-1 rounded-full border border-ink/15 text-center text-sm font-medium py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Call {business.phone.display}
        </a>
        <a
          href={business.bookingUrl}
          className="flex-1 rounded-full bg-accent-ink text-white text-center text-sm font-medium py-3 transition-colors active:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Book now
        </a>
      </div>
    </>
  );
}
