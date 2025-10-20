export const heroData = {
  title: "Re-authoring Leadership Coach",
  subtitle: "AI-powered coaching platform with tiered investment scenarios. Start with Custom GPT validation and scale to full mobile app.",
  videoSrc: "/video-background.mp4",
  primaryButton: {
    text: "Get Started",
    variant: "primary" as const,
    size: "md" as const,
    href: "mailto:david@thefold.studio"
  },
  secondaryButton: {
    text: "View Pricing",
    variant: "secondary" as const,
    size: "md" as const,
    href: "#pricing"
  },
  charOverrides: [],
  lineBreaks: [],
  subtitleLineBreaks: []
}

export const pricingHeader = {
  eyebrowText: "INVESTMENT SCENARIOS",
  title: "Choose Your Development Path",
  paragraphs: [
    "Three strategic approaches to building your AI coaching platform.",
    "Start small and scale, or go premium from the start."
  ]
}

export const pricingOptions = [
  {
    badge: "RECOMMENDED",
    title: "Smart Staged Approach",
    description: "Validate demand first, then scale progressively across 6 months.",
    timeline: "6 months staged",
    price: "$10,600",
    period: "/initial investment",
    features: [
      "Phase 1: Custom GPT with Paid Pro ($1,600)",
      "Phase 2: Professional Web App ($3,000)",
      "Phase 3: Lean Mobile App ($6,000)",
      "Optional enhancements: +$5K-10K",
      "Low risk, validation-first approach"
    ]
  },
  {
    badge: "SCENARIO 2",
    title: "Premium from Start",
    description: "Launch with full-featured mobile app from the beginning.",
    timeline: "3 months",
    price: "$14,600",
    period: "/total investment",
    features: [
      "Phase 1: Custom GPT with Paid Pro ($1,600)",
      "Phase 2: Professional Web App ($3,000)",
      "Phase 3: Full-Featured Mobile App ($10,000)",
      "Complete platform from day one",
      "Best for confident market demand"
    ]
  },
  {
    badge: "SCENARIO 3",
    title: "Fast-Track to Mobile",
    description: "Skip web app and go straight to mobile after GPT validation.",
    timeline: "2 months",
    price: "$10,900",
    period: "/total investment",
    features: [
      "Phase 1: Custom GPT ($900)",
      "Phase 2: Full-Featured Mobile App ($10,000)",
      "Mobile-first strategy",
      "Fastest to mobile market",
      "Medium-high risk approach"
    ]
  }
]

export const roiCalculators = [
  {
    setupCost: 10600,
    monthlyCost: 0,
    estimatedHoursAfter: 0,
    optionName: "Smart Staged"
  },
  {
    setupCost: 14600,
    monthlyCost: 0,
    estimatedHoursAfter: 0,
    optionName: "Premium Start"
  },
  {
    setupCost: 10900,
    monthlyCost: 0,
    estimatedHoursAfter: 0,
    optionName: "Fast-Track Mobile"
  }
]
