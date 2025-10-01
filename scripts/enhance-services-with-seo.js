// Enhance services model with SEO and landing page data
async function enhanceServicesWithSEO() {
  console.log('🚀 Planning enhanced services model with SEO data...\n')
  
  // RECOMMENDED APPROACH: Enhanced Services Model
  const enhancedServicesModel = {
    name: 'services',
    inputs: [
      // Basic service info (existing)
      { name: 'title', type: 'string', required: true, friendlyName: 'Service Title' },
      { name: 'description', type: 'longText', required: true, friendlyName: 'Service Description' },
      { name: 'icon', type: 'string', friendlyName: 'Lucide Icon Name' },
      { name: 'price', type: 'string', friendlyName: 'Starting Price' },
      
      // URL and routing
      { name: 'slug', type: 'string', required: true, friendlyName: 'URL Slug', helperText: 'e.g., "web-development"' },
      { name: 'isActive', type: 'boolean', friendlyName: 'Show on Website', defaultValue: true },
      
      // SEO Meta Data
      { name: 'seoTitle', type: 'string', friendlyName: 'SEO Title', helperText: '50-60 characters' },
      { name: 'seoDescription', type: 'longText', friendlyName: 'Meta Description', helperText: '120-160 characters' },
      { name: 'keywords', type: 'list', friendlyName: 'Focus Keywords', subFields: [{ name: 'keyword', type: 'string' }] },
      { name: 'canonicalUrl', type: 'string', friendlyName: 'Canonical URL' },
      
      // Open Graph / Social Media
      { name: 'ogTitle', type: 'string', friendlyName: 'Social Media Title' },
      { name: 'ogDescription', type: 'longText', friendlyName: 'Social Media Description' },
      { name: 'ogImage', type: 'file', friendlyName: 'Social Media Image', helperText: '1200x630px' },
      
      // Landing Page Content
      { name: 'heroHeadline', type: 'string', friendlyName: 'Landing Page Headline' },
      { name: 'heroSubtitle', type: 'longText', friendlyName: 'Landing Page Subtitle' },
      { name: 'benefits', type: 'list', friendlyName: 'Key Benefits', subFields: [
        { name: 'benefit', type: 'string' },
        { name: 'description', type: 'longText' }
      ]},
      { name: 'process', type: 'list', friendlyName: 'Process Steps', subFields: [
        { name: 'step', type: 'string' },
        { name: 'description', type: 'longText' }
      ]},
      { name: 'caseStudies', type: 'list', friendlyName: 'Case Studies', subFields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'longText' },
        { name: 'image', type: 'file' }
      ]},
      
      // Call to Action
      { name: 'ctaTitle', type: 'string', friendlyName: 'CTA Section Title' },
      { name: 'ctaDescription', type: 'longText', friendlyName: 'CTA Description' },
      { name: 'ctaButtonText', type: 'string', friendlyName: 'CTA Button Text', defaultValue: 'Get Started' },
      { name: 'ctaButtonUrl', type: 'string', friendlyName: 'CTA Button URL', defaultValue: '/contact' },
      
      // Pricing & Packages
      { name: 'packages', type: 'list', friendlyName: 'Service Packages', subFields: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'string' },
        { name: 'description', type: 'longText' },
        { name: 'features', type: 'list', subFields: [{ name: 'feature', type: 'string' }] }
      ]}
    ]
  }
  
  console.log('📋 RECOMMENDED ARCHITECTURE:\n')
  
  console.log('1. 🎯 ENHANCED SERVICES MODEL')
  console.log('   ✅ Single source of truth for each service')
  console.log('   ✅ Complete SEO data (title, description, OG, keywords)')
  console.log('   ✅ Landing page content (hero, benefits, process)')
  console.log('   ✅ URL slugs for dynamic routing')
  console.log('   ✅ Pricing packages and case studies')
  console.log('')
  
  console.log('2. 🔧 NEXT.JS DYNAMIC ROUTING')
  console.log('   File: /pages/services/[slug].js')
  console.log('   Route: /services/web-development')
  console.log('   Route: /services/ui-ux-design')
  console.log('   Route: /services/digital-strategy')
  console.log('')
  
  console.log('3. 📱 PROGRAMMATIC MANAGEMENT')
  console.log('   ✅ Update any service SEO via Claude Code')
  console.log('   ✅ Add new services with full landing pages')
  console.log('   ✅ A/B test headlines, descriptions, CTAs')
  console.log('   ✅ Bulk SEO optimization across all services')
  console.log('')
  
  console.log('4. 🎨 REUSABLE PAGE TEMPLATE')
  console.log('   One template renders all service landing pages')
  console.log('   Consistent design with unique content')
  console.log('   Easy to maintain and update')
  console.log('')
  
  console.log('5. 🚀 EXAMPLE IMPLEMENTATION:')
  console.log(`
// pages/services/[slug].js
import { getServiceBySlug } from '@/lib/builder'
import SEOHead from '@/components/SEOHead'

export default function ServicePage({ service }) {
  return (
    <>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={\`/services/\${service.slug}\`}
        openGraph={{
          title: service.ogTitle,
          description: service.ogDescription,
          image: service.ogImage
        }}
      />
      
      <ServiceHero 
        headline={service.heroHeadline}
        subtitle={service.heroSubtitle}
      />
      
      <ServiceBenefits benefits={service.benefits} />
      <ServiceProcess steps={service.process} />
      <ServicePricing packages={service.packages} />
      <ServiceCTA {...service.cta} />
    </>
  )
}

export async function getStaticPaths() {
  const services = await getContent('services')
  const paths = services.results
    .filter(service => service.data.isActive)
    .map(service => ({
      params: { slug: service.data.slug }
    }))
  
  return { paths, fallback: 'blocking' }
}
`)
  
  console.log('\n💡 BENEFITS OF THIS APPROACH:')
  console.log('   ✅ One content model = One complete landing page')
  console.log('   ✅ Perfect SEO control per service')
  console.log('   ✅ Easy content management in Builder.io')
  console.log('   ✅ Programmatic updates via Claude Code')
  console.log('   ✅ Scalable - add services without code changes')
  console.log('   ✅ Consistent branding across all service pages')
  
  console.log('\n🎯 ALTERNATIVE: Separate Page Model')
  console.log('   You could create a "service-pages" model that references')
  console.log('   services, but the single enhanced model is simpler and')
  console.log('   eliminates data duplication.')
}

enhanceServicesWithSEO()