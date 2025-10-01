"use client"

import Benefits from './Benefits'
import type { BenefitsData, BenefitItemData } from '@/lib/data/types'

interface BenefitsContentModelProps {
  eyebrowText?: string
  title?: string
  paragraph1?: string
  paragraph2?: string
  benefits?: Array<{
    icon?: string
    title?: string
    description?: string
    className?: string
  }>
  className?: string
  style?: React.CSSProperties
}

export default function BenefitsContentModel({ 
  eyebrowText = "Why Now?",
  title = "The AI advantage: stand out in a new marketplace",
  paragraph1 = "AI and automation are transforming every industry and early adopters are already reaping the rewards.",
  paragraph2 = "Don't let outdated processes slow you down. Free your team to focus on what matters most.",
  benefits = [
    {
      icon: "Lightning",
      title: "Automate",
      description: "Automate manual, error-prone processes"
    },
    {
      icon: "ChartPie",
      title: "Analyze",
      description: "Build custom dashboards\nand tools"
    },
    {
      icon: "ShareNetwork", 
      title: "Integrate",
      description: "Integrate systems for\nseamless data flow"
    },
    {
      icon: "Robot",
      title: "Get Sophisticated",
      description: "Create AI-powered agents\nfor smarter service"
    }
  ],
  className,
  style 
}: BenefitsContentModelProps) {
  // Create paragraphs array from individual paragraph fields
  const paragraphs = [paragraph1, paragraph2].filter(Boolean)

  const data: BenefitsData = {
    eyebrowText,
    title,
    paragraphs,
    benefits: benefits.map(benefit => ({
      title: benefit.title || "Benefit",
      description: benefit.description || "Benefit description",
      icon: benefit.icon,
      className: benefit.className
    } as BenefitItemData))
  }

  return <Benefits data={data} />
}