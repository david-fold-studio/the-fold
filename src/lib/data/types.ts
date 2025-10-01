// Core data type definitions for the application

export interface ButtonData {
  text: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
}

export interface HeroData {
  title: string
  subtitle: string
  videoSrc?: string
  backgroundImage?: string
  primaryButton: ButtonData
  secondaryButton?: ButtonData
  charOverrides?: Array<{ start: number; end: number; style: Record<string, any> }>
  lineBreaks?: number[]
  subtitleLineBreaks?: number[]
}

export interface BenefitItemData {
  title: string
  description: string
  icon?: string
  className?: string
}

export interface BenefitsData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  benefits: BenefitItemData[]
}

export interface CaseStudyData {
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export interface CaseStudiesData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  studies: CaseStudyData[]
}

export interface ServiceData {
  title: string
  description: string
}

export interface ServicesData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  services: ServiceData[]
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  faqs: FAQItem[]
}

export interface ArticleData {
  title: string
  description: string
  image: string
  alt: string
  link: string
}

export interface ArticlesData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  articles: ArticleData[]
}

export interface TestimonialData {
  name: string
  title: string
  quote: string
}

export interface TestimonialsData {
  eyebrowText: string
  title: string
  paragraphs: string[]
  testimonials: TestimonialData[]
}

// Animation configuration types
export interface AnimationConfig {
  delay?: number
  duration?: number
  ease?: string
  from?: Record<string, any>
  to?: Record<string, any>
  threshold?: number
  rootMargin?: string
}

// Main page data structure
export interface HomepageData {
  hero: HeroData
  benefits: BenefitsData
  caseStudies: CaseStudiesData
  services?: ServicesData
}