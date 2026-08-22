import Reveal from "@/components/Reveal";
import TestimonialCarousel, { type TestimonialSlide } from "@/components/TestimonialCarousel";
import content from "@/content";
import Section from "./Section";

/**
 * 06 · Testimonials (§12-06) — human proof in the clients' own words, each
 * quote linked to the service it praises. Server component: the slug→service
 * relation is resolved here so the client carousel receives plain, minimal
 * props; the single group Reveal is the section's only entrance (embla's
 * momentum is the only other motion, per spec).
 */
export default function Testimonials() {
  const slides: TestimonialSlide[] = content.testimonials.map(({ serviceSlug, ...t }) => {
    const service = content.services.find((s) => s.slug === serviceSlug);
    return {
      ...t,
      ...(service && {
        service: { name: service.name, href: `/services#${service.slug}` },
      }),
    };
  });

  return (
    <Section copy={content.home.testimonials} tone="bg">
      <Reveal className="mt-10">
        <TestimonialCarousel items={slides} />
      </Reveal>
    </Section>
  );
}
