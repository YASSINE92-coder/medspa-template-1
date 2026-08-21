/**
 * content.ts — SINGLE SOURCE OF TRUTH for all business content.
 *
 * Rules:
 * 1. No business text is ever hardcoded in a component. Components read from here.
 * 2. The swap test: change `business.name` and `business.phone.display`
 *    in this file and they update everywhere on the site.
 * 3. Everything is JSON-safe (no functions, no Dates) so a future signup
 *    form or headless CMS (Sanity/Payload) can produce this exact shape.
 * 4. Relations use slugs (strings), not object references.
 * 5. Every image carries its own alt text (accessibility → Lighthouse).
 */

/* ============================= TYPES ============================= */

export interface ImageAsset {
  src: string;          // "/images/hero.webp"
  alt: string;          // required — accessibility
}

export interface Address {
  street: string;
  city: string;
  state: string;        // "TX"
  zip: string;
  mapUrl: string;       // Google Maps link
}

export interface Phone {
  display: string;      // "(512) 555-0184" — what visitors see
  e164: string;         // "+15125550184" — for tel: links
}

export interface DayHours {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  open: string | null;  // "09:00", null = closed
  close: string | null; // "18:00"
}

export interface BusinessInfo {
  name: string;                 // "Lumen Skin Studio"
  tagline: string;              // "Skin care, made simple."
  description: string;          // 1–2 sentences, used in footer + SEO
  phone: Phone;
  email: string;
  address: Address;
  hours: DayHours[];
  bookingUrl: string;           // external booking link (or "#book")
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl?: string;           // optional — not every spa has it
}

export type PriceUnit = "flat" | "perUnit" | "perSession";

export interface Service {
  slug: string;                 // "botox" — used for URLs + relations
  name: string;
  shortDescription: string;     // 1–2 lines for the services grid
  longDescription: string;      // for the detail view
  priceFrom: number;            // 12
  priceUnit: PriceUnit;         // "perUnit" → renders "$12/unit"
  durationMinutes: number;
  category: "injectables" | "facials" | "laser" | "body";
  image: ImageAsset;
  popular: boolean;             // shows a "Popular" badge
  benefits: string[];           // 3–4 short bullets for detail view
}

export interface Testimonial {
  id: string;
  author: string;               // first name + initial: "Sarah M."
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  serviceSlug?: string;         // optional link to a service
}

export interface BeforeAfterCase {
  id: string;
  serviceSlug: string;
  label: string;                // "HydraFacial — 3 sessions"
  before: ImageAsset;
  after: ImageAsset;
}

export interface TeamMember {
  name: string;
  role: string;                 // "Lead Aesthetician, RN"
  bio: string;
  photo: ImageAsset;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Icon keys for the trust strip proof points. Semantic (what the proof *is*),
 * not iconographic — the component owns which glyph renders for each key, so a
 * CMS only ever has to produce one of these three strings.
 */
export type TrustIcon = "nurse" | "pricing" | "booking";

/** One proof point in the trust strip: a stable icon key plus its label. */
export interface TrustBlurb {
  icon: TrustIcon;
  label: string;
}

export interface TrustStripCopy {
  heading: string;        // accessible name for the band (rendered visually hidden)
  rating: number;         // 4.9
  ratingOutOf: number;    // 5 — drives the star count, so it's data not a magic number
  reviewCount: number;    // 500 → rendered "500+"
  reviewLabel: string;    // "client reviews" — kept distinct from the hero's proof line
  blurbs: TrustBlurb[];   // exactly the 3 proof points
}

/** Copy for one homepage section — components render these, never own text. */
export interface SectionCopy {
  eyebrow?: string;             // small label above the headline
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface HomeCopy {
  hero: SectionCopy & { image: ImageAsset };
  trustStrip: TrustStripCopy;
  services: SectionCopy;
  beforeAfter: SectionCopy;
  plannerTeaser: SectionCopy;   // links to /planner
  testimonials: SectionCopy;
  aboutPreview: SectionCopy & { image: ImageAsset };
  finalCta: SectionCopy;
}

export interface PageCopy {
  title: string;                // h1
  intro: string;
}

export interface PlannerPageCopy extends PageCopy {
  comingSoonLabel: string;      // "Coming soon"
  pitch: string;                // the aspirational promise (see Nick's UX notes)
  bullets: string[];            // what the planner will do
  notifyLabel: string;          // heading/label for the notify block
  notifyButton: string;         // the submit label — short, verb-first
  notifyNote: string;           // honesty microcopy: what the form really does in v1
  emailPlaceholder: string;     // example address shown in the empty input
}

export interface SeoConfig {
  siteUrl: string;
  defaultTitle: string;         // "<name> | Med Spa in <city>"
  titleTemplate: string;        // "%s | Lumen Skin Studio"
  defaultDescription: string;
  ogImage: ImageAsset;
}

/** The full shape a future signup form / CMS must produce. */
export interface SpaContent {
  business: BusinessInfo;
  seo: SeoConfig;
  services: Service[];
  testimonials: Testimonial[];
  beforeAfterCases: BeforeAfterCase[];
  team: TeamMember[];
  faq: FaqItem[];
  home: HomeCopy;
  pages: {
    services: PageCopy;
    about: PageCopy;
    planner: PlannerPageCopy;
    contact: PageCopy;
  };
}

/* ========================= EXAMPLE DATA ========================== */
/* Fictional spa: Lumen Skin Studio, Austin TX — fresh & modern.     */

export const content: SpaContent = {
  business: {
    name: "Lumen Skin Studio",
    tagline: "Skin care, made simple.",
    description:
      "A modern med spa in Austin, TX. Science-backed treatments, friendly experts, and results you can see — no white-coat intimidation.",
    phone: { display: "(512) 555-0184", e164: "+15125550184" },
    email: "hello@lumenskin.studio",
    address: {
      street: "2210 South Lamar Blvd, Suite 120",
      city: "Austin",
      state: "TX",
      zip: "78704",
      mapUrl: "https://maps.google.com/?q=2210+S+Lamar+Blvd+Austin+TX",
    },
    hours: [
      { day: "Mon", open: "09:00", close: "18:00" },
      { day: "Tue", open: "09:00", close: "18:00" },
      { day: "Wed", open: "09:00", close: "20:00" },
      { day: "Thu", open: "09:00", close: "20:00" },
      { day: "Fri", open: "09:00", close: "18:00" },
      { day: "Sat", open: "10:00", close: "16:00" },
      { day: "Sun", open: null, close: null },
    ],
    bookingUrl: "#book",
    instagramUrl: "https://instagram.com/lumenskinstudio",
    facebookUrl: "https://facebook.com/lumenskinstudio",
  },

  seo: {
    siteUrl: "https://lumen-skin-studio.vercel.app",
    defaultTitle: "Lumen Skin Studio | Med Spa in Austin, TX",
    titleTemplate: "%s | Lumen Skin Studio",
    defaultDescription:
      "Botox, fillers, HydraFacial, laser hair removal and more — Austin's friendliest med spa. Book online in 60 seconds.",
    ogImage: { src: "/images/og.jpg", alt: "Lumen Skin Studio, Austin TX" },
  },

  services: [
    {
      slug: "botox",
      name: "Botox & Neurotoxins",
      shortDescription: "Smooth fine lines and prevent new ones — subtle, never frozen.",
      longDescription:
        "Our nurse injectors use a conservative, natural-look approach to soften forehead lines, frown lines and crow's feet. Results in 3–7 days, lasting 3–4 months.",
      priceFrom: 12,
      priceUnit: "perUnit",
      durationMinutes: 30,
      category: "injectables",
      image: { src: "/images/services/botox.webp", alt: "Botox treatment at Lumen Skin Studio" },
      popular: true,
      benefits: ["Natural, rested look", "No downtime", "Results in under a week"],
    },
    {
      slug: "dermal-fillers",
      name: "Dermal Fillers",
      shortDescription: "Restore volume and balance — lips, cheeks and jawline.",
      longDescription:
        "Hyaluronic-acid fillers placed with precision for a refreshed, balanced face. We plan every treatment around your features, never a one-size look.",
      priceFrom: 650,
      priceUnit: "perSession",
      durationMinutes: 45,
      category: "injectables",
      image: { src: "/images/services/fillers.webp", alt: "Dermal filler treatment" },
      popular: false,
      benefits: ["Immediate results", "Tailored to your face", "Lasts 6–18 months"],
    },
    {
      slug: "hydrafacial",
      name: "HydraFacial",
      shortDescription: "Deep cleanse, exfoliate and hydrate in one glowing hour.",
      longDescription:
        "The cult-favourite 3-step facial: cleanse, extract, hydrate. Instant glow with zero downtime — perfect before a big event.",
      priceFrom: 199,
      priceUnit: "perSession",
      durationMinutes: 60,
      category: "facials",
      image: { src: "/images/services/hydrafacial.webp", alt: "HydraFacial treatment" },
      popular: true,
      benefits: ["Instant glow", "Zero downtime", "All skin types"],
    },
    {
      slug: "chemical-peels",
      name: "Chemical Peels",
      shortDescription: "Reset dull, uneven skin with a medical-grade peel.",
      longDescription:
        "From gentle lunchtime peels to deeper resurfacing, we match the peel to your skin goals — texture, tone, acne scars and sun damage.",
      priceFrom: 150,
      priceUnit: "perSession",
      durationMinutes: 45,
      category: "facials",
      image: { src: "/images/services/peel.webp", alt: "Chemical peel treatment" },
      popular: false,
      benefits: ["Evens skin tone", "Multiple depths", "Visible in one session"],
    },
    {
      slug: "microneedling",
      name: "Microneedling",
      shortDescription: "Trigger your skin's own collagen for smoother texture.",
      longDescription:
        "Controlled micro-injuries stimulate collagen production — softening acne scars, pores and fine lines over a series of sessions.",
      priceFrom: 275,
      priceUnit: "perSession",
      durationMinutes: 60,
      category: "facials",
      image: { src: "/images/services/microneedling.webp", alt: "Microneedling treatment" },
      popular: false,
      benefits: ["Softens scars", "Firms skin", "Best in a series of 3"],
    },
    {
      slug: "laser-hair-removal",
      name: "Laser Hair Removal",
      shortDescription: "Smooth for good — fast sessions, all skin tones.",
      longDescription:
        "Medical-grade laser safe for all skin tones. Most areas take minutes, with lasting results after 6–8 sessions.",
      priceFrom: 99,
      priceUnit: "perSession",
      durationMinutes: 30,
      category: "laser",
      image: { src: "/images/services/laser.webp", alt: "Laser hair removal session" },
      // §12-03 caps visible "Popular" badges at 2 — botox + hydrafacial carry it.
      popular: false,
      benefits: ["All skin tones", "Quick sessions", "Long-term results"],
    },
    {
      slug: "ipl-photofacial",
      name: "IPL Photofacial",
      shortDescription: "Fade sun spots and redness with pulsed light.",
      longDescription:
        "Intense pulsed light targets pigment and broken capillaries, evening your complexion in a few quick sessions.",
      priceFrom: 325,
      priceUnit: "perSession",
      durationMinutes: 45,
      category: "laser",
      image: { src: "/images/services/ipl.webp", alt: "IPL photofacial treatment" },
      popular: false,
      benefits: ["Fades sun damage", "Reduces redness", "No needles"],
    },
    {
      slug: "body-contouring",
      name: "Body Contouring",
      shortDescription: "Non-surgical sculpting for stubborn areas.",
      longDescription:
        "Non-invasive technology that targets stubborn fat and tightens skin — no surgery, no downtime, gym-proof results.",
      priceFrom: 450,
      priceUnit: "perSession",
      durationMinutes: 60,
      category: "body",
      image: { src: "/images/services/body.webp", alt: "Body contouring session" },
      popular: false,
      benefits: ["No surgery", "No downtime", "Targeted results"],
    },
  ],

  testimonials: [
    {
      id: "t1",
      author: "Sarah M.",
      text: "First med spa where I didn't feel judged or upsold. My skin has never looked better.",
      rating: 5,
      serviceSlug: "hydrafacial",
    },
    {
      id: "t2",
      author: "Jessica R.",
      text: "Natural results — my friends think I just sleep well. Exactly what I asked for.",
      rating: 5,
      serviceSlug: "botox",
    },
    {
      id: "t3",
      author: "Amanda K.",
      text: "Booked online in a minute, zero wait at my appointment. This place gets it.",
      rating: 5,
    },
    {
      id: "t4",
      author: "Monica L.",
      text: "After 6 laser sessions I threw away my razor. Worth every dollar.",
      rating: 5,
      serviceSlug: "laser-hair-removal",
    },
  ],

  beforeAfterCases: [
    {
      id: "ba1",
      serviceSlug: "hydrafacial",
      label: "HydraFacial — 3 sessions",
      before: { src: "/images/ba/hydra-before.webp", alt: "Skin before HydraFacial series" },
      after: { src: "/images/ba/hydra-after.webp", alt: "Skin after HydraFacial series" },
    },
    {
      id: "ba2",
      serviceSlug: "botox",
      label: "Botox — 2 weeks after",
      before: { src: "/images/ba/botox-before.webp", alt: "Forehead lines before Botox" },
      after: { src: "/images/ba/botox-after.webp", alt: "Forehead lines after Botox" },
    },
    {
      id: "ba3",
      serviceSlug: "ipl-photofacial",
      label: "IPL — sun damage, 4 sessions",
      before: { src: "/images/ba/ipl-before.webp", alt: "Sun spots before IPL" },
      after: { src: "/images/ba/ipl-after.webp", alt: "Sun spots after IPL" },
    },
  ],

  team: [
    {
      name: "Dr. Elena Voss",
      role: "Medical Director, MD",
      bio: "15 years in aesthetic medicine. Believes the best work is the work nobody notices.",
      photo: { src: "/images/team/elena.webp", alt: "Dr. Elena Voss, Medical Director" },
    },
    {
      name: "Maya Torres",
      role: "Lead Aesthetician, RN",
      bio: "Austin born and raised. Known for honest advice and zero-pressure consults.",
      photo: { src: "/images/team/maya.webp", alt: "Maya Torres, Lead Aesthetician" },
    },
  ],

  faq: [
    {
      question: "Do I need a consultation first?",
      answer: "For injectables, yes — it's free and takes 15 minutes. For facials and laser, you can book directly.",
    },
    {
      question: "Does it hurt?",
      answer: "Most treatments feel like small pinches at most. We use numbing cream where it helps, and we'll always tell you what to expect.",
    },
    {
      question: "How do I pay?",
      answer: "Card, Apple Pay, or interest-free plans through Cherry. Prices are always shown before you book.",
    },
  ],

  home: {
    hero: {
      eyebrow: "Med spa · Austin, TX",
      headline: "Look like yourself. On your best day.",
      subheadline: "Science-backed skin treatments, friendly experts, and honest prices — no white-coat intimidation.",
      ctaLabel: "Book now",
      ctaHref: "#book",
      image: {
        src: "https://images.unsplash.com/photo-1706795034830-de41aee06afa?q=80&w=1920&auto=format&fit=crop",
        alt: "Client relaxing during a facial massage at Lumen Skin Studio",
      },
    },
    trustStrip: {
      heading: "Why Austin books with Lumen",
      rating: 4.9,
      ratingOutOf: 5,
      reviewCount: 500,
      reviewLabel: "client reviews",
      blurbs: [
        { icon: "nurse", label: "Nurse-led treatments" },
        { icon: "pricing", label: "Transparent pricing" },
        { icon: "booking", label: "Book online in 60 seconds" },
      ],
    },
    services: {
      eyebrow: "Treatments",
      headline: "What we do",
      subheadline: "Eight treatments, honestly priced. Tap any of them to see how it works.",
      ctaLabel: "See all services",
      ctaHref: "/services",
    },
    beforeAfter: {
      eyebrow: "Real results",
      headline: "Seeing is believing",
      subheadline: "Drag the slider — every photo is an unedited client result.",
    },
    plannerTeaser: {
      eyebrow: "Coming soon · The Treatment Planner",
      headline: "Start with a goal. Leave with a plan.",
      subheadline: "Tell the planner where you want your skin to be, and it maps the treatments, timeline and budget to get there — at your pace, no pressure.",
      ctaLabel: "Preview the planner",
      ctaHref: "/planner",
    },
    testimonials: {
      eyebrow: "Reviews",
      headline: "Austin talks",
    },
    aboutPreview: {
      headline: "The un-intimidating med spa",
      subheadline: "We opened Lumen because great skin care shouldn't feel clinical or salesy. Come as you are.",
      ctaLabel: "Meet the team",
      ctaHref: "/about",
      image: {
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1600&auto=format&fit=crop",
        alt: "An esthetician applying a facial mask to a relaxed client at Lumen Skin Studio",
      },
    },
    finalCta: {
      headline: "Ready when you are",
      subheadline: "Free 15-minute consults. Zero pressure, honest answers.",
      ctaLabel: "Book your visit",
      ctaHref: "#book",
    },
  },

  pages: {
    services: {
      title: "Services & pricing",
      intro: "Every price listed, every question answered. No surprises at checkout.",
    },
    about: {
      title: "About Lumen",
      intro: "A med spa built around one idea: expert care without the intimidation.",
    },
    planner: {
      title: "The Treatment Planner",
      intro: "Plan your glow-up like a pro.",
      comingSoonLabel: "Coming soon",
      pitch: "Set your goal, see what's possible, and build your personal treatment plan — before you ever book a chair.",
      bullets: [
        "Pick a goal, not a product — we translate it into treatments",
        "See realistic timelines and budgets up front",
        "Save your plan and bring it to your free consult",
      ],
      notifyLabel: "Get notified when it launches",
      notifyButton: "Notify me",
      notifyNote: "The planner isn't live yet, so this opens an email to us — we'll add you to the list ourselves and reply when it launches.",
      emailPlaceholder: "you@email.com",
    },
    contact: {
      title: "Find us",
      intro: "South Lamar, free parking, walk-ins welcome when the light is on.",
    },
  },
};

export default content;
