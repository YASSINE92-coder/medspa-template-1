import content from "@/content";
import Section from "./Section";

export default function BeforeAfter() {
  return (
    <Section copy={content.home.beforeAfter} tone="surface">
      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {content.beforeAfterCases.map((c) => (
          <div key={c.id} className="rounded-2xl bg-bg p-4">
            {/* Interactive slider with touch support lands in Phase C */}
            <div className="aspect-[4/3] rounded-xl bg-gradient-to-r from-blush to-accent-soft grid place-items-center text-muted text-sm">
              slider — Phase C
            </div>
            <p className="mt-3 text-sm font-medium">{c.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
