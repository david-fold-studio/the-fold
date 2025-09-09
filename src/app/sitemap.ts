import { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/utils/case-studies'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-fold.vercel.app'
  
  // Get all case studies
  const caseStudies = await getAllCaseStudies()
  
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // Dynamic case study pages
  const caseStudyPages = caseStudies.map((study) => ({
    url: `${siteUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...caseStudyPages]
}