import content from "@/content";

export default function Footer() {
  const { business } = content;
  return (
    <footer className="bg-surface border-t border-ink/5 pb-20 md:pb-0">
      <div className="mx-auto max-w-6xl px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-heading font-semibold text-base">{business.name}</p>
          <p className="mt-2 text-muted max-w-xs">{business.description}</p>
        </div>
        <div>
          <p className="font-semibold mb-2">Visit us</p>
          <p className="text-muted">
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
          </p>
          <a href={business.address.mapUrl} className="text-accent">Open in Maps</a>
          <p className="mt-2 text-muted">
            <a href={`tel:${business.phone.e164}`}>{business.phone.display}</a> ·{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Hours</p>
          <ul className="text-muted space-y-0.5">
            {business.hours.map((h) => (
              <li key={h.day}>
                {h.day}: {h.open ? `${h.open}–${h.close}` : "Closed"}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-wrap gap-4 justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} {business.name}</p>
          <p className="flex gap-4">
            <a href={business.instagramUrl}>Instagram</a>
            <a href={business.facebookUrl}>Facebook</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
