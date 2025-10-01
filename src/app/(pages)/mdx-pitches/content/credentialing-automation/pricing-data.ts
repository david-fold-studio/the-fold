export const heroData = {
  title: "Provider Credentialing Automation",
  subtitle: "Transform your credentialing workflow from hours of manual data entry to minutes of automated processing with AI-powered form filling.",
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
  eyebrowText: "PRICING",
  title: "Choose Your Implementation Path",
  paragraphs: [
    "Start with the email-based workflow and upgrade to the full platform when ready.",
    "Both options include setup, training, and ongoing support."
  ]
}

export const pricingOptions = [
  {
    badge: "OPTION 1",
    title: "Email-to-PDF Workflow",
    description: "Automated credentialing spreadsheet-based provider management.",
    timeline: "2-4 weeks",
    price: "$3,000",
    period: "/one-time setup",
    features: [
      "Automated email-to-PDF form processing",
      "AI identifies payer and form type",
      "Pre-filled PDFs using provider data",
      "90% time reduction (27+ hours/month)",
      "Optional: Data Entry Service (+$500)"
    ]
  },
  {
    badge: "OPTION 2",
    title: "Custom Platform",
    description: "Automated workflow with custom web app for provider management.",
    timeline: "6-8 weeks",
    price: "$10,000",
    period: "/development",
    features: [
      "Everything in Option 1, plus dashboard",
      "Visual workflow boards & task management",
      "Document vault with version control",
      "Team collaboration & reporting",
      "Optional: Data Entry Service (+$500)"
    ]
  }
]

export const roiCalculators = [
  {
    setupCost: 3000,
    monthlyCost: 75,
    estimatedHoursAfter: 8,
    optionName: "Option 1"
  },
  {
    setupCost: 10000,
    monthlyCost: 175,
    estimatedHoursAfter: 3, // Custom UI saves even more time
    optionName: "Option 2"
  }
]
