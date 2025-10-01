// Update with exact same field structure as existing working case studies
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

// Based on the HealthLink structure I saw in the server logs - let's match it exactly
async function updateWithExactFieldStructure() {
  const employwellData = {
    // Top-level fields (match HealthLink exactly)
    name: "Employwell Healthcare Platform Case Study",
    modelId: "7974871d708e40cdacc287be71235a07", 
    published: "published",
    createdDate: Date.now(),
    
    // Meta object (if HealthLink has it)
    meta: {
      lastPreviewUrl: "",
      kind: "data"
    },
    
    // Query array (empty like HealthLink)
    query: [],
    
    // Data object - match HealthLink field structure exactly
    data: {
      // Core fields that HealthLink has
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI - avoiding 6-12 months of costly integration work.",
      
      // Image fields using Builder.io CDN format like HealthLink
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-thumbnail",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-cover",
      
      // Additional fields that might be required
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
      client: "Employwell",
      year: "2024",
      industry: "Healthcare",
      featured: true,
      readTime: "12 min",
      
      // Tags array
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      
      // Services array  
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      
      // Outcomes array
      outcomes: [
        "+2 treatment cycles per clinic within 90 days",
        "25% reduction in administrative load for clinical staff", 
        "3-month ROI on platform investment",
        "Estimated $30,000-$40,000 monthly revenue increase per clinic"
      ],
      
      // Full content field
      content: `# How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup

*A fertility care coordination platform case study*

## Summary

When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a "foot in the door" approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.

## Business Impact

### Measurable Results
- **+2 treatment cycles** for clinics within 90 days
- **25% reduction in administrative load** for clinical staff  
- **3-month ROI** on platform investment
- **Estimated $30,000-$40,000 monthly revenue increase per clinic**

### Strategic Success
- **Avoided premature EHR integration complexity** that would have delayed market entry
- **Faster time-to-market** by prioritizing user workflow over system integration
- **MVP validation achieved** without burning funding runway
- **Foundation built** for sustainable growth and future technical investments

## The Strategic Solution

**Research Insight:** Instead of complex EHR integrations that would delay market entry, focus on immediate workflow improvements that build user trust.

**Key Discovery:** Nurses' biggest pain was manual data entry, but solving this required prohibitive FHIR compliance. The smart move: create exceptional daily coordination UX first.

**Innovation:** Context-aware dashboard that adapts information based on patient care phases - eliminating healthcare software's typical "information overload" problem.`,
      
      // Category field
      category: "Healthcare",
      
      // Project type
      projectType: "Healthcare Platform",
      
      // Status
      status: "completed"
    }
  }

  try {
    console.log('🚀 Creating with exact field structure...')
    
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellData)
    })
    
    console.log('📡 Status:', response.status)
    const text = await response.text()
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ SUCCESS with exact field structure!')
      return true
    } else {
      console.log('❌ Failed:', response.status)
      console.log('📄 Response:', text.substring(0, 200))
      return false
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    return false
  }
}

// Also try updating the existing entry with ID if we can find it
async function tryUpdatingExistingEntry() {
  console.log('\n🎯 Trying to update existing "example" entry...')
  
  // Try a few different approaches to update
  const updateMethods = [
    {
      name: "Update via slug query",
      method: "PUT",
      url: "https://builder.io/api/v1/content/case-studies?query.data.slug=example",
    },
    {
      name: "Update via urlSlug query", 
      method: "PUT",
      url: "https://builder.io/api/v1/content/case-studies?query.data.urlSlug=example",
    },
    {
      name: "Patch via slug",
      method: "PATCH", 
      url: "https://builder.io/api/v1/content/case-studies?query.data.slug=example",
    }
  ]
  
  const updateData = {
    name: "Employwell Healthcare Platform Case Study",
    published: "published",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "Strategic UX research approach delivering +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI - avoiding 6-12 months of costly EHR integration work.",
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
      client: "Employwell",
      year: "2024",
      featured: true,
      readTime: "12 min",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-thumb",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-cover"
    }
  }
  
  for (const method of updateMethods) {
    try {
      console.log(`\n📝 Trying: ${method.name}`)
      
      const response = await fetch(method.url, {
        method: method.method,
        headers: {
          'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })
      
      console.log('📡 Status:', response.status)
      
      if (response.status >= 200 && response.status < 300) {
        console.log(`✅ SUCCESS with ${method.name}!`)
        return true
      } else {
        const text = await response.text()
        console.log(`❌ ${method.name} failed:`, response.status)
      }
    } catch (error) {
      console.log(`❌ ${method.name} error:`, error.message)
    }
  }
  
  return false
}

async function run() {
  console.log('🎯 Trying to create Employwell case study with exact required fields...\n')
  
  // Method 1: Create new with exact structure
  const createSuccess = await updateWithExactFieldStructure()
  
  if (createSuccess) {
    console.log('\n🎉 SUCCESS! Case study created with proper field structure!')
    console.log('🔗 Check: http://localhost:3007/case-studies/employwell-healthcare')
    console.log('📋 Builder.io: https://builder.io/content')
    return
  }
  
  // Method 2: Update existing entry
  const updateSuccess = await tryUpdatingExistingEntry()
  
  if (updateSuccess) {
    console.log('\n🎉 SUCCESS! Updated existing entry!')
    console.log('🔗 Check: http://localhost:3007/case-studies/employwell-healthcare')
    return
  }
  
  console.log('\n💡 Still having issues. Let me know if you can share:')
  console.log('1. The exact entry ID from Builder.io dashboard URL')
  console.log('2. Or we can manually edit through Builder.io interface')
}

run()