"use client"

import CaseStudies from './CaseStudies'

interface CaseStudiesContentModelProps {
  eyebrowText?: string
  title?: string
  paragraph1?: string
  paragraph2?: string
  limit?: number
  className?: string
  style?: React.CSSProperties
}

export default function CaseStudiesContentModel({ 
  eyebrowText = "Work",
  title = "Actual Case Studies",
  paragraph1 = "Don't take our word for it, see it for yourself.",
  paragraph2 = "Here are some of the biggest projects we delivered this year.",
  limit = 4,
  className,
  style 
}: CaseStudiesContentModelProps) {
  const paragraphs = [paragraph1, paragraph2].filter(Boolean)

  return (
    <CaseStudies
      eyebrowText={eyebrowText}
      title={title}
      paragraphs={paragraphs}
      limit={limit}
    />
  )
}