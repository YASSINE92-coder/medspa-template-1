"use client";

import { useId, useState } from "react";

import content from "@/content";

/**
 * v1 notify form — HONEST placeholder, no backend. Submitting opens a
 * pre-filled email draft to the studio (mailto:) with the typed address in the
 * body, so every interaction does something real: no dead disabled button, no
 * fake "you're on the list" success. The note under the field says exactly
 * what happens. Swap the submit handler for a real endpoint when the planner
 * ships. Client leaf: the page around it stays a server component.
 */
export default function NotifyForm() {
  const p = content.pages.planner;
  const { business } = content;
  const [email, setEmail] = useState("");
  const inputId = useId();
  const noteId = useId();

  const subject = `${p.notifyLabel} — ${p.title}`;
  const body = `Please notify me when ${p.title} launches. My email: ${email}`;

  return (
    <form
      aria-labelledby={`${inputId}-label`}
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <label id={`${inputId}-label`} htmlFor={inputId} className="font-medium">
        {p.notifyLabel}
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={p.emailPlaceholder}
          autoComplete="email"
          aria-describedby={noteId}
          className="min-w-0 flex-1 rounded-full bg-bg px-5 py-3 text-sm ring-1 ring-ink/10 transition-shadow duration-200 ease-brand placeholder:text-muted/70 focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-accent-ink px-6 py-3 text-sm font-medium text-white transition-[translate,background-color] duration-200 ease-brand hover:bg-accent-deep focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 motion-safe:hover:-translate-y-0.5"
        >
          {p.notifyButton}
        </button>
      </div>
      <p id={noteId} className="mt-3 text-sm text-pretty text-muted">
        {p.notifyNote}
      </p>
    </form>
  );
}
