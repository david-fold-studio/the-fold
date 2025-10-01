// Update the case study with slug "example" to be the Employwell case study
const BUILDER_PRIVATE_KEY = 'bpk-5fb282d3b27447389012cc30a1f21838'

async function findEntryBySlug(slug) {
  try {
    console.log(`🔍 Looking for entry with slug "${slug}"...`)
    
    // Try different ways to query by slug
    const endpoints = [
      `https://builder.io/api/v1/content/case-studies?query.data.slug=${slug}`,
      `https://builder.io/api/v1/content/case-studies?query.data.urlSlug=${slug}`,
      `https://builder.io/api/v1/content/case-studies?includeUnpublished=true&query.data.slug=${slug}`,
      `https://builder.io/api/v1/content/case-studies?includeUnpublished=true`
    ]
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\n🚀 Trying: ${endpoint}`)
        const response = await fetch(endpoint, {
          headers: {
            'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
          }
        })
        
        console.log('📡 Status:', response.status)
        const text = await response.text()
        
        if (text.includes(slug) || text.includes('example')) {
          console.log('✅ Found reference to slug in response!')
          
          // Try to extract entry ID from HTML response
          const idMatches = text.match(/\/content\/([a-f0-9]{24,})/g) || 
                          text.match(/"id":\s*"([a-f0-9]{24,})"/g) ||
                          text.match(/entry\/([a-f0-9]{24,})/g)
          
          if (idMatches) {
            const entryId = idMatches[0].replace(/.*\/([a-f0-9]{24,}).*/, '$1')
            console.log('📋 Found potential entry ID:', entryId)
            return entryId
          }
        }
        
        // If we get JSON, parse it
        if (text.startsWith('{') || text.startsWith('[')) {
          try {
            const data = JSON.parse(text)
            if (data.results) {
              const entry = data.results.find(e => 
                e.data?.slug === slug || 
                e.data?.urlSlug === slug ||
                e.name?.toLowerCase().includes('example') ||
                e.name?.toLowerCase().includes('employwell')
              )
              if (entry) {
                console.log('✅ Found entry in JSON:', entry.id)
                return entry.id
              }
            }
          } catch (e) {
            // Not JSON, continue
          }
        }
      } catch (error) {
        console.log('❌ Error with endpoint:', error.message)
      }
    }
    
    return null
  } catch (error) {
    console.error('❌ Error finding entry:', error.message)
    return null
  }
}

async function updateToEmploywell(entryId) {
  const employwellContent = {
    name: "Employwell Healthcare Platform",
    published: "published",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.",
      slug: "employwell-healthcare", // Change from "example" to proper slug
      urlSlug: "employwell-healthcare",
      thumbnail: "/images/case-studies/employwell-dashboard.jpg",
      cover: "/images/case-studies/employwell-dashboard.jpg",
      client: "Employwell",
      year: "2024",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      industry: "Healthcare",
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      featured: true,
      readTime: "12 min",
      category: "Healthcare",
      outcomes: [
        "+2 treatment cycles per clinic within 90 days",
        "25% reduction in administrative load for clinical staff",
        "3-month ROI on platform investment",
        "Estimated $30,000-$40,000 monthly revenue increase per clinic"
      ],
      content: `# How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup

*A fertility care coordination platform case study*

## Summary

When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a "foot in the door" approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.

## Overview

**Client:** Employwell - Seed-stage fertility care coordination startup with 4 employees  
**Challenge:** Create nurse-friendly interface in complex EHR market without breaking the bank  
**Target Users:** Nurses and practitioners at fertility clinics (10-100 employees)  
**Market:** EHR/EMR integration space  
**Approach:** Research-driven phased dashboard prioritizing workflow over feature completeness  

**Key Innovation:** Context-aware information architecture that adapts to patient care phases

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

**Innovation:** Context-aware dashboard that adapts information based on patient care phases - eliminating healthcare software's typical "information overload" problem.

## Lessons for Other Startups

### 1. Strategic Sequencing Beats Feature Completeness
**The Solution:** Identify a valuable "foot in the door" problem that builds user trust and adoption before tackling expensive integrations.

### 2. User Research Drives Business Strategy  
**The Impact:** This research pivot saved 6-12 months of development and hundreds of thousands in integration costs.

### 3. Agility Trumps Perfection in Healthcare Tech
**The Approach:** Build for learning and iteration rather than trying to predict every requirement upfront.

### 4. Information Architecture as Competitive Advantage
**The Innovation:** Context-aware interfaces that adapt to user workflow phases create superior user experiences and better business outcomes.

### 5. Time-to-Market Velocity Matters for Funding
**The Payoff:** Faster validation cycles and real-world results help secure additional funding rounds and investor confidence.`
    }
  }

  try {
    console.log(`\n📝 Updating entry ${entryId} with full Employwell content...`)
    
    const response = await fetch(`https://builder.io/api/v1/content/${entryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellContent)
    })
    
    console.log('📡 Update Status:', response.status)
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Successfully updated entry with Employwell content!')
      console.log('🔄 Slug changed from "example" to "employwell-healthcare"')
      console.log('📤 Entry published!')
      return true
    } else {
      const text = await response.text()
      console.log('❌ Failed to update:', response.status)
      console.log('📄 Response:', text.substring(0, 300))
      return false
    }
  } catch (error) {
    console.error('❌ Error updating entry:', error.message)
    return false
  }
}

async function tryDirectSlugUpdate() {
  console.log('\n🎯 Trying direct slug-based update...')
  
  // Try updating via slug query
  const updateData = {
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
      client: "Employwell"
    }
  }
  
  try {
    const response = await fetch('https://builder.io/api/v1/content/case-studies?query.data.slug=example', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
    
    console.log('📡 Status:', response.status)
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ Direct slug update successful!')
      return true
    } else {
      console.log('❌ Direct slug update failed')
      return false
    }
  } catch (error) {
    console.log('❌ Error with direct update:', error.message)
    return false
  }
}

async function run() {
  console.log('🎯 Updating the "example" slug entry to be Employwell case study...\n')
  
  // Method 1: Find by slug and update
  const entryId = await findEntryBySlug('example')
  
  if (entryId) {
    console.log(`\n✅ Found entry with ID: ${entryId}`)
    const success = await updateToEmploywell(entryId)
    
    if (success) {
      console.log('\n🎉 SUCCESS! Your case study is now:')
      console.log('✅ Updated with full Employwell content')
      console.log('✅ Slug changed to "employwell-healthcare"') 
      console.log('✅ Published and live!')
      console.log('\n🔗 New URL: http://localhost:3007/case-studies/employwell-healthcare')
      console.log('📋 Builder.io: https://builder.io/content')
      return
    }
  }
  
  // Method 2: Try direct update
  console.log('\n⏭️ Trying alternative update method...')
  const directSuccess = await tryDirectSlugUpdate()
  
  if (directSuccess) {
    console.log('\n🎉 SUCCESS via direct update!')
    console.log('🔗 Check: http://localhost:3007/case-studies/employwell-healthcare')
  } else {
    console.log('\n💡 Manual approach needed:')
    console.log('1. Go to Builder.io dashboard')
    console.log('2. Open your "Employwell" draft entry')
    console.log('3. Copy the entry ID from the URL')
    console.log('4. Share it with me for targeted update')
  }
}

run()