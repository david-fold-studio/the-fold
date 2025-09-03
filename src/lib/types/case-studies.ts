export interface CaseStudy {
  id: string
  title: string
  slug: string
  category: string
  featured: boolean
  publishedAt: string
  tags: string[]
  image: string
  excerpt: string
  readTime: string
  order: number
  client: string
  year: string
  services: string[]
}

export interface CaseStudyContent {
  meta: CaseStudy
  content: string
}

export interface CaseStudyCollection {
  studies: CaseStudy[]
}