import type { HeroData } from '@/lib/data/types'

export const heroData: HeroData = {
  title: "Software made just for you now in reach for every business",
  subtitle: "AI-driven custom software solutions and automations tailored to your needs, built faster and cheaper than ever with user experience at the core.",
  videoSrc: "/video-background.mp4",
  primaryButton: {
    text: "Schedule a Call",
    variant: "primary",
    size: "md"
  },
  secondaryButton: {
    text: "Learn More",
    variant: "secondary",
    size: "md",
    href: "#benefits",
    icon: "ArrowDownCircle",
    iconPosition: "right"
  },
  // Line breaks after "you" (word 4)
  lineBreaks: [5],
  // Subtitle line breaks after "needs,"
  subtitleLineBreaks: [10],
  // Italic styling for words: "just" (2), "for" (3), "you" (4) and "every" (9), "business" (10)
  charOverrides: [
    { start: 2, end: 4, style: { fontStyle: 'italic' } },   // "just for you"
  ]
}