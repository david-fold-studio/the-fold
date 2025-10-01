import { builder } from './builder'

/**
 * Performance optimization utilities for Builder.io pages
 */

// Cache duration constants
export const CACHE_DURATIONS = {
  STATIC_CONTENT: 300, // 5 minutes
  DYNAMIC_CONTENT: 60,  // 1 minute
  REAL_TIME: 10,        // 10 seconds
  LONG_TERM: 3600       // 1 hour
} as const

/**
 * Preload critical Builder.io content
 */
export function preloadBuilderContent(urls: string[]) {
  if (typeof window !== 'undefined') {
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = `https://cdn.builder.io/api/v1/page?url=${encodeURIComponent(url)}&apiKey=${process.env.NEXT_PUBLIC_BUILDER_API_KEY}`
      document.head.appendChild(link)
    })
  }
}

/**
 * Optimized Builder.io fetch with caching
 */
export async function fetchBuilderPageOptimized(
  url: string, 
  options: {
    model?: string
    includeRefs?: boolean
    cacheDuration?: keyof typeof CACHE_DURATIONS
    prerender?: boolean
  } = {}
) {
  const {
    model = 'page',
    includeRefs = true,
    cacheDuration = 'STATIC_CONTENT',
    prerender = true
  } = options

  try {
    const page = await builder
      .get(model, {
        url,
        options: { 
          includeRefs,
          noTargeting: false
        },
        prerender,
        // Add cache headers for CDN
        cacheSeconds: CACHE_DURATIONS[cacheDuration]
      })
      .toPromise()

    return page
  } catch (error) {
    console.error(`Error fetching Builder.io page ${url}:`, error)
    return null
  }
}

/**
 * Batch fetch multiple Builder.io pages
 */
export async function fetchMultipleBuilderPages(urls: string[]) {
  try {
    const promises = urls.map(url => 
      fetchBuilderPageOptimized(url, { cacheDuration: 'STATIC_CONTENT' })
    )
    
    const results = await Promise.allSettled(promises)
    
    return results.map((result, index) => ({
      url: urls[index],
      success: result.status === 'fulfilled',
      data: result.status === 'fulfilled' ? result.value : null,
      error: result.status === 'rejected' ? result.reason : null
    }))
  } catch (error) {
    console.error('Error batch fetching Builder.io pages:', error)
    return urls.map(url => ({ url, success: false, data: null, error }))
  }
}

/**
 * Get critical above-the-fold content first
 */
export async function fetchCriticalContent(url: string) {
  try {
    // Fetch with minimal data first
    const criticalPage = await builder
      .get('page', {
        url,
        options: { 
          includeRefs: false, // Skip refs for speed
          fields: 'data.title,data.seoTitle,data.seoDescription,data.blocks.0,data.blocks.1' // Only first 2 blocks
        }
      })
      .toPromise()

    return criticalPage
  } catch (error) {
    console.error(`Error fetching critical content for ${url}:`, error)
    return null
  }
}

/**
 * Lazy load non-critical content
 */
export async function fetchNonCriticalContent(url: string) {
  try {
    // Fetch remaining content
    const fullPage = await builder
      .get('page', {
        url,
        options: { 
          includeRefs: true,
          omit: 'data.blocks.0,data.blocks.1' // Skip already loaded blocks
        }
      })
      .toPromise()

    return fullPage
  } catch (error) {
    console.error(`Error fetching non-critical content for ${url}:`, error)
    return null
  }
}

/**
 * Progressive loading pattern for Builder.io pages
 */
export class ProgressiveBuilderLoader {
  private cache = new Map<string, any>()
  private loadingStates = new Map<string, Promise<any>>()

  async loadPage(url: string, priority: 'critical' | 'normal' | 'lazy' = 'normal') {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)
    }

    // Check if already loading
    if (this.loadingStates.has(url)) {
      return this.loadingStates.get(url)
    }

    // Start loading based on priority
    const loadingPromise = this.loadByPriority(url, priority)
    this.loadingStates.set(url, loadingPromise)

    try {
      const result = await loadingPromise
      this.cache.set(url, result)
      this.loadingStates.delete(url)
      return result
    } catch (error) {
      this.loadingStates.delete(url)
      throw error
    }
  }

  private async loadByPriority(url: string, priority: 'critical' | 'normal' | 'lazy') {
    switch (priority) {
      case 'critical':
        return fetchCriticalContent(url)
      case 'lazy':
        return fetchBuilderPageOptimized(url, { cacheDuration: 'LONG_TERM' })
      default:
        return fetchBuilderPageOptimized(url, { cacheDuration: 'STATIC_CONTENT' })
    }
  }

  clearCache() {
    this.cache.clear()
  }
}

// Global progressive loader instance
export const progressiveLoader = new ProgressiveBuilderLoader()

/**
 * Performance monitoring for Builder.io requests
 */
export class BuilderPerformanceMonitor {
  private metrics = new Map<string, number>()

  startTimer(url: string) {
    this.metrics.set(`${url}_start`, performance.now())
  }

  endTimer(url: string) {
    const startTime = this.metrics.get(`${url}_start`)
    if (startTime) {
      const duration = performance.now() - startTime
      this.metrics.set(`${url}_duration`, duration)
      
      // Log slow requests
      if (duration > 1000) {
        console.warn(`Slow Builder.io request for ${url}: ${duration.toFixed(2)}ms`)
      }
      
      return duration
    }
    return 0
  }

  getMetrics() {
    const results: Record<string, number> = {}
    this.metrics.forEach((value, key) => {
      if (key.endsWith('_duration')) {
        const url = key.replace('_duration', '')
        results[url] = value
      }
    })
    return results
  }
}

// Global performance monitor
export const performanceMonitor = new BuilderPerformanceMonitor()

/**
 * Optimized metadata generation
 */
export async function generateOptimizedMetadata(url: string) {
  const startTime = performance.now()
  
  try {
    // Fetch only metadata-relevant fields
    const page = await builder
      .get('page', {
        url,
        options: { 
          noTargeting: true,
          fields: 'data.title,data.seoTitle,data.seoDescription,data.ogImage,data.canonicalUrl'
        }
      })
      .toPromise()

    const duration = performance.now() - startTime
    
    if (duration > 500) {
      console.warn(`Slow metadata fetch for ${url}: ${duration.toFixed(2)}ms`)
    }

    if (!page) {
      return {
        title: 'Page Not Found - The Fold Studio',
        description: 'The requested page could not be found.'
      }
    }

    return {
      title: page.data?.seoTitle || page.data?.title || 'The Fold Studio',
      description: page.data?.seoDescription || 'Professional services by The Fold Studio',
      openGraph: {
        title: page.data?.seoTitle || page.data?.title || 'The Fold Studio',
        description: page.data?.seoDescription || 'Professional services by The Fold Studio',
        images: page.data?.ogImage ? [{ url: page.data.ogImage }] : []
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: page.data?.seoTitle || page.data?.title || 'The Fold Studio',
        description: page.data?.seoDescription || 'Professional services by The Fold Studio',
        images: page.data?.ogImage ? [page.data.ogImage] : []
      },
      alternates: {
        canonical: page.data?.canonicalUrl || `https://thefoldstudio.com${url}`
      }
    }
  } catch (error) {
    console.error(`Error generating metadata for ${url}:`, error)
    return {
      title: 'The Fold Studio',
      description: 'Professional software design and development services.'
    }
  }
}

/**
 * Image optimization for Builder.io content
 */
export function optimizeBuilderImage(imageUrl: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'auto'
} = {}) {
  if (!imageUrl) return imageUrl
  
  const { width, height, quality = 85, format = 'auto' } = options
  
  // If it's a Builder.io image, add optimization params
  if (imageUrl.includes('cdn.builder.io')) {
    const url = new URL(imageUrl)
    
    if (width) url.searchParams.set('width', width.toString())
    if (height) url.searchParams.set('height', height.toString())
    url.searchParams.set('quality', quality.toString())
    url.searchParams.set('format', format)
    
    return url.toString()
  }
  
  return imageUrl
}

/**
 * Bundle size optimization - only load what's needed
 */
export const PERFORMANCE_CONFIG = {
  // Critical components that should be loaded immediately
  critical: [
    'Enhanced Hero Section',
    'Navigation',
    'Footer'
  ],
  
  // Components that can be lazy loaded
  lazy: [
    'TestimonialsSection',
    'Case Studies', 
    'Articles'
  ],
  
  // Cache settings by component type
  cacheSettings: {
    'Enhanced Hero Section': CACHE_DURATIONS.STATIC_CONTENT,
    'Navigation': CACHE_DURATIONS.LONG_TERM,
    'Footer': CACHE_DURATIONS.LONG_TERM,
    'default': CACHE_DURATIONS.STATIC_CONTENT
  }
} as const