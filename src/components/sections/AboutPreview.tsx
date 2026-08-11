import content from "@/content";
import Section from "./Section";

export default function AboutPreview() {
  return <Section copy={content.home.aboutPreview} tone="blush" />;
}
