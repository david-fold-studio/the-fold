// Create case-studies model and add Employwell content
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

// Case Studies Model Definition
const caseStudiesModel = {
  name: 'case-studies',
  kind: 'data',
  inputs: [
    {
      name: 'title',
      friendlyName: 'Case Study Title',
      type: 'string',
      required: true,
      helperText: 'The main title of the case study'
    },
    {
      name: 'urlSlug',
      friendlyName: 'URL Slug',
      type: 'string',
      required: true,
      helperText: 'URL-friendly slug for the case study'
    },
    {
      name: 'description',
      friendlyName: 'Short Description',
      type: 'longText',
      required: true,
      helperText: 'Brief summary for listings and SEO'
    },
    {
      name: 'client',
      friendlyName: 'Client Name',
      type: 'string',
      required: true,
      helperText: 'Name of the client company'
    },
    {
      name: 'year',
      friendlyName: 'Project Year',
      type: 'string',
      helperText: 'Year the project was completed'
    },
    {
      name: 'category',
      friendlyName: 'Category',
      type: 'string',
      helperText: 'Category of the project (e.g., healthcare, fintech)'
    },
    {
      name: 'tags',
      friendlyName: 'Tags',
      type: 'list',
      subFields: [
        {
          name: 'tag',
          type: 'string'
        }
      ],
      helperText: 'Tags for filtering and search'
    },
    {
      name: 'services',
      friendlyName: 'Services Provided',
      type: 'list',
      subFields: [
        {
          name: 'service',
          type: 'string'
        }
      ],
      helperText: 'List of services provided for this project'
    },
    {
      name: 'thumbnail',
      friendlyName: 'Thumbnail Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      helperText: 'Main image for case study listings'
    },
    {
      name: 'cover',
      friendlyName: 'Cover Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      helperText: 'Hero image for the case study detail page'
    },
    {
      name: 'readTime',
      friendlyName: 'Read Time',
      type: 'string',
      helperText: 'Estimated read time (e.g., "8 min")'
    },
    {
      name: 'order',
      friendlyName: 'Display Order',
      type: 'number',
      helperText: 'Order for displaying case studies (lower numbers first)'
    },
    {
      name: 'featured',
      friendlyName: 'Featured',
      type: 'boolean',
      helperText: 'Should this case study be featured?'
    },
    {
      name: 'content',
      friendlyName: 'Case Study Content',
      type: 'richText',
      required: true,
      helperText: 'The full content of the case study in markdown'
    }
  ]
}

async function createModel() {
  try {
    console.log('🚀 Creating case-studies model...')
    
    const response = await fetch('https://builder.io/api/v1/models', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseStudiesModel)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create model: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ Successfully created case-studies model')
    return result
  } catch (error) {
    console.error('❌ Error creating model:', error.message)
    return null
  }
}

async function addEmploywellCaseStudy() {
  const caseStudyData = {
    name: "Employwell Healthcare Platform",
    data: {
      title: "How Strategic UX Research Saved a Healthcare Startup $400K+ in Development Costs",
      urlSlug: "employwell-healthcare",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI.",
      client: "Employwell",
      year: "2024",
      category: "healthcare",
      tags: ["healthcare", "UX research", "startup", "EHR", "fertility care"],
      services: ["UX Research", "Information Architecture", "Dashboard Design", "Healthcare UX"],
      thumbnail: "/images/case-studies/employwell-dashboard.jpg",
      cover: "/images/case-studies/employwell-dashboard.jpg",
      readTime: "12 min",
      order: 1,
      featured: true,
      content: `# How Strategic UX Research Saved a Healthcare Startup $400K+ in Development Costs

*A fertility care coordination platform case study*

## Summary

When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a "foot in the door" approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.

## Overview

**Client:** Employwell - Seed-stage fertility care coordination startup with 4 employees  
**Challenge:** Create nurse-friendly interface in complex EHR market without breaking the bank  
**Target Users:** Nurses and practitioners at fertility clinics (10-100 employees)  
**Market:** EHR/EMR integration space  
**Approach:** Research-driven phased dashboard prioritizing workflow over feature completeness  
**Timeline:** MVP development and pilot clinic deployment  

**Key Innovation:** Context-aware information architecture that adapts to patient care phases

**Bottom Line:** Sometimes the biggest impact comes from solving the right problem first, not the hardest problem first.

## Business Impact

### Measurable Results
- **+2 treatment cycles** for clinics within 90 days
- **25% reduction in administrative load** for clinical staff  
- **3-month ROI** on platform investment
- **$33,500+ monthly value** per clinic

### Strategic Success
- **Avoided $200K-500K** in premature EHR integration costs
- **6-12 months faster** time-to-market vs traditional approach
- **MVP validation achieved** without burning funding runway
- **Foundation built** for sustainable growth and future technical investments`
    },
    published: "published"
  }

  try {
    console.log('📝 Adding Employwell case study...')
    
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseStudyData)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create case study: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ Successfully created Employwell case study:', result.id)
    console.log('📝 Case study URL slug:', result.data.urlSlug)
    return result
  } catch (error) {
    console.error('❌ Error creating case study:', error.message)
    return null
  }
}

// Run the complete setup
async function setupCaseStudies() {
  console.log('🚀 Setting up case studies in Builder.io..\\n')
  
  // First create the model
  const modelResult = await createModel()
  if (!modelResult) {
    console.log('💥 Failed to create model. Aborting.')
    return
  }
  
  // Wait a moment for the model to be ready
  console.log('⏳ Waiting for model to be ready...')
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Then add the content
  const contentResult = await addEmploywellCaseStudy()
  if (contentResult) {
    console.log('\\n🎉 Case studies setup complete!')
    console.log('You can now view your case study in Builder.io CMS.')
  } else {
    console.log('\\n💥 Failed to add case study content.')
  }
}

setupCaseStudies()