import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Pitch {
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  publishedAt: string
  featured: boolean
  order: number
}

export interface PitchContent {
  meta: Pitch
  content: string
}

export interface PitchCollection {
  pitches: Pitch[]
}

const contentDirectory = path.join(process.cwd(), 'src/app/(pages)/mdx-pitches/content')

export async function getAllPitches(): Promise<Pitch[]> {
  try {
    const indexPath = path.join(contentDirectory, 'index.json')
    const fileContents = fs.readFileSync(indexPath, 'utf8')
    const data: PitchCollection = JSON.parse(fileContents)

    // Sort by order and then by published date
    return data.pitches.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  } catch (error) {
    console.error('Error loading pitches:', error)
    return []
  }
}

export async function getPitchBySlug(slug: string): Promise<PitchContent | null> {
  try {
    // Get metadata from index
    const allPitches = await getAllPitches()
    const pitch = allPitches.find(p => p.slug === slug)

    if (!pitch) return null

    // Read MDX content
    const contentPath = path.join(contentDirectory, slug, 'content.mdx')

    if (!fs.existsSync(contentPath)) {
      console.error(`MDX file not found: ${contentPath}`)
      return null
    }

    const fileContents = fs.readFileSync(contentPath, 'utf8')
    const { content, data } = matter(fileContents)

    return {
      meta: { ...pitch, ...data }, // Merge with any frontmatter
      content
    }
  } catch (error) {
    console.error(`Error loading pitch ${slug}:`, error)
    return null
  }
}

export async function getFeaturedPitches(limit?: number): Promise<Pitch[]> {
  const allPitches = await getAllPitches()
  const featured = allPitches.filter(pitch => pitch.featured)
  return limit ? featured.slice(0, limit) : featured
}

export async function getPitchesByCategory(category: string): Promise<Pitch[]> {
  const allPitches = await getAllPitches()
  return allPitches.filter(pitch => pitch.category === category)
}
