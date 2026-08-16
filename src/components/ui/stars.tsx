import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The site-wide star row (used by the trust strip and testimonial cards).
 * Fractional ratings render truthfully: a dim full row underneath, a clipped
 * filled row on top. Colour comes from the caller (`className` sets the fill
 * via currentColor; `dimClassName` the empty track).
 *
 * Decorative by construction (`aria-hidden`) — every caller must pair it with
 * a text alternative (visible or sr-only) that states the rating.
 */
export default function Stars({
  value,
  outOf = 5,
  className,
  starClassName = "size-3",
  dimClassName = "text-ink/15",
}: {
  value: number;
  outOf?: number;
  className?: string;
  starClassName?: string;
  dimClassName?: string;
}) {
  const filledPercent = Math.min(100, Math.max(0, (value / outOf) * 100));

  const row = (rowClass?: string) => (
    <span className={cn("flex gap-0.5", rowClass)}>
      {Array.from({ length: outOf }, (_, i) => (
        <Star key={i} className={cn("shrink-0 fill-current", starClassName)} strokeWidth={0} />
      ))}
    </span>
  );

  return (
    <span className={cn("relative inline-flex", className)} aria-hidden>
      {row(dimClassName)}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${filledPercent}%` }}
      >
        {row()}
      </span>
    </span>
  );
}
