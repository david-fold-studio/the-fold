import type { BenefitsData } from '@/lib/data/types'

export const benefitsData: BenefitsData = {
  eyebrowText: "Why Now?",
  title: "The AI advantage: stand out in a new marketplace",
  paragraphs: [
    "AI and automation are transforming every industry and early adopters are already reaping the rewards.",
    "Don't let outdated processes slow you down. Free your team to focus on what matters most."
  ],
  benefits: [
    {
      title: 'Automate',
      description: 'Automate manual, error-prone processes',
      icon: 'Lightning',
    },
    {
      title: 'Analyze',
      description: 'Build custom dashboards\nand tools',
      icon: 'ChartPie',
    },
    {
      title: 'Integrate',
      description: 'Integrate systems for\nseamless data flow',
      icon: 'ShareNetwork',
    },
    {
      title: 'Get Sophisticated',
      description: 'Create AI-powered agents\nfor smarter service',
      icon: 'Robot',
    }
  ]
}