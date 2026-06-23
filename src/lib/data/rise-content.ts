import { STOCK_IMAGES } from "@/lib/data/stock-images";

export const RISE_IMAGES = {
  hero: STOCK_IMAGES.riseHero,
  healthcare: STOCK_IMAGES.riseHealthcare,
} as const;

export const riseLockup = {
  title: "RISE Pakistan Health",
  parent: "A Project of Beena-E Consulting, USA",
  tagline: "Research. Innovation. Service. Education.",
  subtitle: "Mobilizing diaspora excellence for Pakistan's health.",
} as const;

export const riseCoreMessage =
  "RISE Pakistan Health turns scattered diaspora goodwill into structured health impact through research collaboration, innovation pilots, service programs, and education initiatives — connecting Pakistani-connected physicians in U.S. academic medicine with meaningful outcomes in Pakistan.";

export const risePillars = [
  {
    title: "Research",
    description:
      "Joint research, data registries, publications, grant support, and mentorship for early-career investigators.",
    icon: "microscope" as const,
  },
  {
    title: "Innovation",
    description:
      "Digital health, AI-enabled tools, quality improvement, workflow redesign, and scalable care models.",
    icon: "lightbulb" as const,
  },
  {
    title: "Service",
    description:
      "Visiting faculty, virtual case conferences, specialty consultations, disaster response, and outcome-linked philanthropy.",
    icon: "heart-handshake" as const,
  },
  {
    title: "Education",
    description:
      "Mentorship, lectures, residency guidance, research bootcamps, curriculum support, and leadership development.",
    icon: "graduation-cap" as const,
  },
] as const;
