import type { Metadata } from "next";
import { Check } from "lucide-react";

import Reveal from "@/components/Reveal";
import { cardSurface } from "@/components/ui/card";
import content from "@/content";

import NotifyForm from "./NotifyForm";

export const metadata: Metadata = {
  title: content.pages.planner.title,
  description: content.pages.planner.pitch,
};

/**
 * /planner teaser (v1) — one calm screen that sells the coming differentiator
 * honestly: what it will do (specific bullets), and a notify path that works
 * today (see NotifyForm). Softer colours on purpose — the future flow is
 * something people will spend real time in (client UX notes). No fake planner
 * UI, no mock progress. Server component; NotifyForm is the client leaf.
 */
export default function PlannerPage() {
  const p = content.pages.planner;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <Reveal className="text-center">
        <p className="inline-block rounded-full bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent-deep">
          {p.comingSoonLabel}
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {p.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{p.intro}</p>
        <p className="mx-auto mt-6 max-w-lg text-pretty">{p.pitch}</p>
      </Reveal>

      <Reveal delay={0.12} duration={0.5}>
        <ul className="mt-12 space-y-3">
          {p.bullets.map((b) => (
            <li key={b} className={`${cardSurface} flex items-center gap-3 px-5 py-4`}>
              <span
                aria-hidden
                className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft"
              >
                <Check strokeWidth={2.25} className="size-3.5 text-accent-deep" />
              </span>
              <span className="text-[15px] leading-snug text-pretty">{b}</span>
            </li>
          ))}
        </ul>

        <div className={`${cardSurface} mt-10 p-6 sm:p-8`}>
          <NotifyForm />
        </div>
      </Reveal>
    </div>
  );
}
