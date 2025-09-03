import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { CaseStudy, CaseStudyContent, CaseStudyCollection } from '@/lib/types/case-studies'

const contentDirectory = path.join(process.cwd(), 'src/content/case-studies')

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const indexPath = path.join(contentDirectory, 'index.json')
    const fileContents = fs.readFileSync(indexPath, 'utf8')
    const data: CaseStudyCollection = JSON.parse(fileContents)
    
    // Sort by order and then by published date
    return data.studies.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  } catch (error) {
    console.error('Error loading case studies:', error)
    return []
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyContent | null> {
  try {
    // Get metadata from index
    const allStudies = await getAllCaseStudies()
    const study = allStudies.find(s => s.slug === slug)
    
    if (!study) return null

    // Read MDX content
    const contentPath = path.join(contentDirectory, slug, 'content.mdx')
    
    if (!fs.existsSync(contentPath)) {
      console.error(`MDX file not found: ${contentPath}`)
      return null
    }

    const fileContents = fs.readFileSync(contentPath, 'utf8')
    const { content, data } = matter(fileContents)

    return {
      meta: { ...study, ...data }, // Merge with any frontmatter
      content
    }
  } catch (error) {
    console.error(`Error loading case study ${slug}:`, error)
    return null
  }
}

export async function getFeaturedCaseStudies(limit?: number): Promise<CaseStudy[]> {
  const allStudies = await getAllCaseStudies()
  const featured = allStudies.filter(study => study.featured)
  return limit ? featured.slice(0, limit) : featured
}

export async function getCaseStudiesByCategory(category: string): Promise<CaseStudy[]> {
  const allStudies = await getAllCaseStudies()
  return allStudies.filter(study => study.category === category)
}

export async function getRelatedCaseStudies(currentSlug: string, limit = 3): Promise<CaseStudy[]> {
  const allStudies = await getAllCaseStudies()
  const currentStudy = allStudies.find(s => s.slug === currentSlug)
  
  if (!currentStudy) return []

  // Filter out current study and get related by category or tags
  const related = allStudies
    .filter(study => 
      study.slug !== currentSlug && 
      (study.category === currentStudy.category || 
       study.tags.some(tag => currentStudy.tags.includes(tag)))
    )
    .slice(0, limit)

  // If not enough related, fill with other studies
  if (related.length < limit) {
    const others = allStudies
      .filter(study => 
        study.slug !== currentSlug && 
        !related.find(r => r.slug === study.slug)
      )
      .slice(0, limit - related.length)
    
    return [...related, ...others]
  }

  return related
}