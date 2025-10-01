// Use Builder.io SDK to create Employwell case study
const { builder } = require('@builder.io/sdk')

// Initialize with the working key
builder.init('bpk-5fb282d3b27447389012cc30a1f21838')

async function createEmploywellWithSDK() {
  const employwellData = {
    name: "Employwell Healthcare Platform Case Study",
    modelId: "7974871d708e40cdacc287be71235a07",
    published: "published",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
      thumbnail: "/images/case-studies/employwell-dashboard.jpg",
      cover: "/images/case-studies/employwell-dashboard.jpg", 
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      client: "Employwell",
      industry: "Healthcare", 
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      year: "2024",
      readTime: "12 min",
      featured: true,
      slug: "employwell-healthcare",
      urlSlug: "employwell-healthcare",
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
- **Foundation built** for sustainable growth and future technical investments`
    }
  }

  try {
    console.log('🚀 Creating Employwell case study using Builder.io SDK...')
    console.log('📋 Model ID: 7974871d708e40cdacc287be71235a07')
    
    // Try using the SDK's create method
    const result = await builder.create('case-studies', employwellData)
    
    if (result) {
      console.log('✅ SUCCESS! Created with SDK')
      console.log('📋 Result:', JSON.stringify(result, null, 2))
      return result
    } else {
      console.log('❌ SDK returned null/undefined')
      return null
    }
  } catch (error) {
    console.error('❌ SDK Error:', error.message)
    
    // Try direct API call as fallback
    console.log('\n⏭️  Trying direct API call as fallback...')
    return await createWithDirectAPI()
  }
}

async function createWithDirectAPI() {
  try {
    const response = await fetch('https://cdn.builder.io/api/v1/write', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer bpk-5fb282d3b27447389012cc30a1f21838',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        models: [{
          name: 'case-studies',
          id: '7974871d708e40cdacc287be71235a07'
        }],
        data: {
          name: "Employwell Healthcare Platform Case Study",
          data: {
            title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
            description: "Strategic UX research delivered immediate value: +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI - avoiding 6-12 months of costly EHR integration work.",
            slug: "employwell-healthcare",
            client: "Employwell",
            industry: "Healthcare",
            featured: true
          }
        }
      })
    })
    
    console.log('📡 Direct API Status:', response.status)
    const text = await response.text()
    
    if (response.ok) {
      console.log('✅ Direct API Success!')
      return { status: 'success', response: text }
    } else {
      console.log('❌ Direct API Failed:', text.substring(0, 200))
      return null
    }
  } catch (error) {
    console.error('❌ Direct API Error:', error.message)
    return null
  }
}

// Also try to verify existing content
async function checkExistingContent() {
  try {
    console.log('\n🔍 Checking existing case studies...')
    const content = await builder.getAll('case-studies', {
      limit: 10,
      options: {
        includeRefs: true
      }
    })
    
    if (content && content.length > 0) {
      console.log(`✅ Found ${content.length} case studies`)
      content.forEach((study, index) => {
        console.log(`  ${index + 1}. ${study.name || study.data?.title || 'Untitled'}`)
        if (study.name?.includes('Employwell') || study.data?.title?.includes('Employwell')) {
          console.log('     🎯 EMPLOYWELL FOUND!')
        }
      })
      return content
    } else {
      console.log('❌ No case studies found')
      return []
    }
  } catch (error) {
    console.error('❌ Error checking content:', error.message)
    return []
  }
}

// Run the process
async function run() {
  console.log('🎯 Using Builder.io SDK to create Employwell case study...\n')
  
  // First check existing content
  await checkExistingContent()
  
  // Try to create the new entry
  console.log('\n' + '='.repeat(50))
  const result = await createEmploywellWithSDK()
  
  // Check again to see if it was created
  console.log('\n' + '='.repeat(50))
  await checkExistingContent()
  
  if (result) {
    console.log('\n🎉 Process completed!')
    console.log('✅ Check your Builder.io dashboard: https://builder.io/content')
  } else {
    console.log('\n💥 Process failed. Try checking Builder.io dashboard manually.')
  }
}

run()