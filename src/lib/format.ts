import type { Service } from "@/content";

/** "from $12/unit" · "from $199/session" · "from $450" — the transparent-pricing string. */
export function formatPrice(s: Service): string {
  switch (s.priceUnit) {
    case "perUnit":
      return `from $${s.priceFrom}/unit`;
    case "perSession":
      return `from $${s.priceFrom}/session`;
    default:
      return `from $${s.priceFrom}`;
  }
}
