import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import BeforeAfter from "@/components/sections/BeforeAfter";
import PlannerTeaser from "@/components/sections/PlannerTeaser";
import Testimonials from "@/components/sections/Testimonials";
import AboutPreview from "@/components/sections/AboutPreview";
import FinalCta from "@/components/sections/FinalCta";

/** Section order comes from the approved Phase A plan. Footer lives in the layout. */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <BeforeAfter />
      <PlannerTeaser />
      <Testimonials />
      <AboutPreview />
      <FinalCta />
    </>
  );
}
