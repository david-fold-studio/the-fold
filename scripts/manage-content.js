// Content management functions for Builder.io models
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

// Generic content functions
async function getContent(modelName) {
  try {
    const response = await fetch(`https://builder.io/api/v1/content/${modelName}`, {
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to get ${modelName}: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error getting ${modelName}:`, error.message)
    return null
  }
}

async function createContent(modelName, data) {
  try {
    const response = await fetch(`https://builder.io/api/v1/content/${modelName}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create ${modelName}: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error creating ${modelName}:`, error.message)
    return null
  }
}

async function updateContent(modelName, contentId, data) {
  try {
    const response = await fetch(`https://builder.io/api/v1/content/${modelName}/${contentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to update ${modelName}: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`❌ Error updating ${modelName}:`, error.message)
    return null
  }
}

// Specific model functions
async function getAllTestimonials() {
  return await getContent('testimonials')
}

async function createTestimonial(testimonialData) {
  const data = {
    name: `Testimonial - ${testimonialData.name}`,
    data: testimonialData
  }
  return await createContent('testimonials', data)
}

async function getAllServices() {
  return await getContent('services')
}

async function createService(serviceData) {
  const data = {
    name: `Service - ${serviceData.title}`,
    data: serviceData
  }
  return await createContent('services', data)
}

async function getAllBenefits() {
  return await getContent('benefits')
}

async function createBenefit(benefitData) {
  const data = {
    name: `Benefit - ${benefitData.title}`,
    data: benefitData
  }
  return await createContent('benefits', data)
}

async function getHeroContent() {
  return await getContent('hero-content')
}

async function updateHeroContent(heroData) {
  const existing = await getHeroContent()
  if (existing && existing.results && existing.results.length > 0) {
    // Update existing hero content
    return await updateContent('hero-content', existing.results[0].id, {
      name: 'Hero Content',
      data: heroData
    })
  } else {
    // Create new hero content
    return await createContent('hero-content', {
      name: 'Hero Content',
      data: heroData
    })
  }
}

async function getAllFAQs() {
  return await getContent('faq')
}

async function createFAQ(faqData) {
  const data = {
    name: `FAQ - ${faqData.question.substring(0, 50)}...`,
    data: faqData
  }
  return await createContent('faq', data)
}

// Demo functions
async function createSampleContent() {
  console.log('🚀 Creating sample content for all models...\n')
  
  // Sample testimonial
  const testimonial = await createTestimonial({
    name: 'Sarah Johnson',
    company: 'Tech Innovations Inc',
    role: 'CEO',
    testimonial: 'The Fold Studio delivered an exceptional website that exceeded our expectations. Their attention to detail and technical expertise is outstanding.',
    rating: 5
  })
  
  if (testimonial) {
    console.log('✅ Sample testimonial created')
  }
  
  // Sample service
  const service = await createService({
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    features: [
      { feature: 'Responsive Design' },
      { feature: 'Performance Optimization' },
      { feature: 'SEO Friendly' },
      { feature: 'Modern Framework' }
    ],
    price: 'Starting at $5,000'
  })
  
  if (service) {
    console.log('✅ Sample service created')
  }
  
  // Sample benefit
  const benefit = await createBenefit({
    title: 'Fast Loading',
    description: 'Optimized for speed with modern build tools and performance best practices.',
    icon: 'zap'
  })
  
  if (benefit) {
    console.log('✅ Sample benefit created')
  }
  
  // Sample hero content
  const hero = await updateHeroContent({
    eyebrowText: 'Welcome to The Fold Studio',
    headline: 'We Build Amazing Digital Experiences',
    subheadline: 'Custom web development and design services that help your business grow and succeed online.',
    ctaText: 'Get Started Today',
    ctaUrl: '/contact'
  })
  
  if (hero) {
    console.log('✅ Hero content created/updated')
  }
  
  // Sample FAQ
  const faq = await createFAQ({
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity, but most websites take 4-8 weeks from start to launch.',
    category: 'Process'
  })
  
  if (faq) {
    console.log('✅ Sample FAQ created')
  }
  
  console.log('\n🎉 Sample content creation complete!')
  console.log('Check your Builder.io dashboard to see the new content entries.')
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllTestimonials,
    createTestimonial,
    getAllServices,
    createService,
    getAllBenefits,
    createBenefit,
    getHeroContent,
    updateHeroContent,
    getAllFAQs,
    createFAQ,
    createSampleContent
  }
}

// Run sample content creation if called directly
if (require.main === module) {
  createSampleContent()
}