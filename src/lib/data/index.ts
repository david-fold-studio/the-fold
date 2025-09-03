// Data access layer utilities
import type { HomepageData } from './types'

export * from './types'

// Data service class for future API integration
export class HomepageDataService {
  static async getHomepageData(): Promise<HomepageData> {
    // Future: integrate with CMS/API
    // For now, import from local data files
    const { heroData } = await import('@/app/(pages)/homepage/hero/data')
    const { benefitsData } = await import('@/app/(pages)/homepage/benefits/data')
    const { caseStudiesData } = await import('@/app/(pages)/homepage/case-studies/data')
    
    return {
      hero: heroData,
      benefits: benefitsData,
      caseStudies: caseStudiesData
    }
  }

  static async getHeroData() {
    const data = await this.getHomepageData()
    return data.hero
  }

  static async getBenefitsData() {
    const data = await this.getHomepageData()
    return data.benefits
  }

  static async getCaseStudiesData() {
    const data = await this.getHomepageData()
    return data.caseStudies
  }
}

// Utility functions for data validation (future enhancement)
export function validateData<T>(data: unknown, schema: any): T {
  // Future: implement with zod or similar
  return data as T
}