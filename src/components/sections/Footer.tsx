import { ArrowUpRight } from "lucide-react";

import content from "@/content";
import { formatDayHours, todayScript } from "@/lib/hours";
import { localBusinessJsonLd } from "@/lib/jsonld";

/**
 * 09 · Footer (§12-09) — utility trust. Nobody scrolls here to be inspired:
 * they want the hours, the address or the phone number, so this is the
 * fastest, clearest part of the page and the local-SEO surface (LocalBusiness
 * JSON-LD derived from content.ts). Surface band, hairline top, three columns
 * that stack HOURS FIRST on the phone ("are they open right now?").
 * No motion at all — link hovers only. Server component, zero images; the
 * only script is the ~250-byte framework-free today-marker from lib/hours.
 */

const link =
  "text-ink underline decoration-ink/20 underline-offset-4 transition-colors duration-150 ease-brand " +
  "hover:text-accent-deep hover:decoration-accent-deep/40 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const quietLink =
  "text-muted transition-colors duration-150 ease-brand hover:text-ink " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export default function Footer() {
  const { business } = content;
  const socials = [
    { label: "Instagram", href: business.instagramUrl },
    { label: "Facebook", href: business.facebookUrl },
    ...(business.tiktokUrl ? [{ label: "TikTok", href: business.tiktokUrl }] : []),
  ];

  return (
    <footer className="border-t border-ink/5 bg-surface pb-20 text-sm md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:gap-8 md:py-16 lg:gap-12">
        {/* Hours — first in the DOM so the phone stack answers "open right now?" */}
        <div className="md:order-3">
          <h2 className="text-sm font-semibold">Hours</h2>
          <dl className="mt-3 space-y-0.5">
            {business.hours.map((h) => (
              <div
                key={h.day}
                data-day={h.day}
                // The today-marker script (see lib/hours.ts) sets data-today on
                // this row before hydration — expected server/client difference.
                suppressHydrationWarning
                className="group -mx-3 flex items-center justify-between gap-4 rounded-full px-3 py-1 data-today:bg-accent-soft"
              >
                <dt className="flex items-center gap-2 text-muted group-data-today:font-medium group-data-today:text-ink">
                  {h.day}
                  <span className="hidden rounded-full bg-accent-ink px-2 py-0.5 text-xs font-medium text-white group-data-today:inline">
                    Today
                  </span>
                </dt>
                <dd className="text-muted tabular-nums whitespace-nowrap group-data-today:font-medium group-data-today:text-ink">
                  {formatDayHours(h)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visit — full NAP in a real <address>, tel:/mailto:/map links */}
        <div className="md:order-2">
          <h2 className="text-sm font-semibold">Visit us</h2>
          <address className="mt-3 space-y-3 text-muted not-italic">
            <p>
              {business.address.street}
              <br />
              {business.address.city}, {business.address.state} {business.address.zip}
            </p>
            <p>
              <a
                href={business.address.mapUrl}
                target="_blank"
                rel="noopener"
                className={`${link} inline-flex items-center gap-1`}
              >
                Open in Maps
                <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
            <p className="flex flex-col gap-1.5">
              <a href={`tel:${business.phone.e164}`} className={`${link} self-start`}>
                {business.phone.display}
              </a>
              <a href={`mailto:${business.email}`} className={`${link} self-start`}>
                {business.email}
              </a>
            </p>
          </address>
        </div>

        {/* Brand — who this is, in two lines */}
        <div className="md:order-1">
          <p className="font-heading text-base font-semibold">{business.name}</p>
          <p className="mt-3 max-w-xs text-muted">{business.description}</p>
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-5">
          <p className="text-muted">
            © {new Date().getFullYear()} {business.name}
          </p>
          <ul className="flex items-center gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className={quietLink}>
                  {s.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Local-SEO surface: LocalBusiness JSON-LD, derived from content.ts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: localBusinessJsonLd(content) }}
      />
      {/* Marks today's row in the spa's own timezone — see lib/hours.ts */}
      <script dangerouslySetInnerHTML={{ __html: todayScript(business.timezone) }} />
    </footer>
  );
}
