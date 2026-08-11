import type { Metadata } from "next";
import content from "@/content";

export const metadata: Metadata = { title: content.pages.about.title };

export default function AboutPage() {
  const p = content.pages.about;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">{p.title}</h1>
      <p className="mt-3 text-muted max-w-xl">{p.intro}</p>
      <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-3xl">
        {content.team.map((m) => (
          <div key={m.name} className="rounded-2xl bg-surface p-6 shadow-sm">
            {/* Photo placeholder — Phase C */}
            <div
              className="size-20 rounded-full bg-gradient-to-br from-accent/30 to-blush"
              aria-label={m.photo.alt}
            />
            <h2 className="mt-4 font-semibold">{m.name}</h2>
            <p className="text-sm text-accent">{m.role}</p>
            <p className="mt-2 text-sm text-muted">{m.bio}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 max-w-2xl">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <dl className="mt-6 space-y-5">
          {content.faq.map((f) => (
            <div key={f.question}>
              <dt className="font-medium">{f.question}</dt>
              <dd className="mt-1 text-sm text-muted">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
