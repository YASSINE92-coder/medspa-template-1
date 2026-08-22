import type { SpaContent } from "@/content";

const DAY_NAMES: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

/**
 * schema.org LocalBusiness structured data, derived 100% from content.ts so it
 * can never drift from the rendered page. `DaySpa` is the closest real
 * schema.org type (there is no MedicalSpa) and is a LocalBusiness subtype, so
 * Google's local rich results treat it as one. Rendered server-side as a single
 * <script type="application/ld+json"> — zero client JS.
 *
 * Note: this serves real-world local SEO (hours/phone/address in search
 * results), NOT the Lighthouse SEO score — structured data is a manual audit
 * there and does not move the number.
 */
export function localBusinessJsonLd(content: SpaContent): string {
  const { business, seo } = content;
  const sameAs = [business.instagramUrl, business.facebookUrl, business.tiktokUrl].filter(
    Boolean,
  );

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: business.name,
    description: business.description,
    url: seo.siteUrl,
    telephone: business.phone.e164,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    hasMap: business.address.mapUrl,
    openingHoursSpecification: business.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_NAMES[h.day],
        opens: h.open,
        closes: h.close,
      })),
    sameAs,
  });
}
