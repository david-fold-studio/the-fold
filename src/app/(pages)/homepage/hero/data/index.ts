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
  // Line breaks after "you" (word 5)
  titleLineBreaks: [5],
  // Subtitle line breaks after "needs,"
  subtitleLineBreaks: [10],
  // Subtitle max width
  subtitleMaxWidth: "640px",
  // Italic styling for words: "just" (2), "for" (3), "you" (4)
  italicsStart: 2,
  italicsEnd: 4
}