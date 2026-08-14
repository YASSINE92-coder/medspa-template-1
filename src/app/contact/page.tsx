import type { Metadata } from "next";
import content from "@/content";

export const metadata: Metadata = { title: content.pages.contact.title };

export default function ContactPage() {
  const p = content.pages.contact;
  const { business } = content;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">{p.title}</h1>
      <p className="mt-3 text-muted max-w-xl">{p.intro}</p>
      <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl">
        <div className="rounded-2xl bg-surface p-6 shadow-sm">
          <h2 className="font-semibold">Contact</h2>
          <p className="mt-3 text-sm text-muted">
            {business.address.street}<br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </p>
          <p className="mt-3 text-sm">
            <a href={`tel:${business.phone.e164}`} className="text-accent-deep">{business.phone.display}</a><br />
            <a href={`mailto:${business.email}`} className="text-accent-deep">{business.email}</a>
          </p>
          <a href={business.address.mapUrl} className="mt-4 inline-block text-sm text-accent-deep font-medium">
            Open in Maps →
          </a>
        </div>
        <div className="rounded-2xl bg-surface p-6 shadow-sm">
          <h2 className="font-semibold">Hours</h2>
          <ul className="mt-3 text-sm text-muted space-y-1">
            {business.hours.map((h) => (
              <li key={h.day} className="flex justify-between">
                <span>{h.day}</span>
                <span>{h.open ? `${h.open}–${h.close}` : "Closed"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <a
        href={business.bookingUrl}
        className="mt-10 inline-block rounded-full bg-accent-ink text-white font-medium px-7 py-3.5 transition-colors hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      >
        Book now
      </a>
    </div>
  );
}
