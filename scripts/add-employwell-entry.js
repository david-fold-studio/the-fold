// Add new Employwell entry to case-studies data model
const BUILDER_PRIVATE_KEY = 'bpk-df1977f31d5941bbb246fbfa065f7e0c' // Try key 2 first
const MODEL_NAME = 'case-studies'

async function createEmploywellEntry() {
  const employwellEntry = {
    name: "Employwell Healthcare Platform Case Study",
    data: {
      title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
      description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI.",
      thumbnail: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-dashboard.jpg",
      cover: "https://cdn.builder.io/api/v1/image/assets%2F4a242b8010c048df9c06392f47457ba0%2Femploywell-dashboard.jpg",
      tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
      client: "Employwell",
      industry: "Healthcare",
      services: ["UX Research", "Information Architecture", "Dashboard Design"],
      year: "2024",
      readTime: "12 min",
      featured: true,
      slug: "employwell-healthcare",
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
    },
    published: "published",
    modelId: "7974871d708e40cdacc287be71235a07"
  }

  try {
    console.log('🚀 Creating new Employwell entry in case-studies model...')
    
    const response = await fetch(`https://builder.io/api/v1/content/${MODEL_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BUILDER_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellEntry)
    })
    
    console.log('📡 Response status:', response.status)
    const responseText = await response.text()
    
    if (response.ok) {
      try {
        const result = JSON.parse(responseText)
        console.log('✅ SUCCESS! Created Employwell case study entry')
        console.log('📋 Entry ID:', result.id)
        console.log('📝 Entry name:', result.name)
        console.log('🔗 View in Builder.io:', `https://builder.io/content/${result.id}`)
        return result
      } catch (e) {
        console.log('✅ Entry created but response parsing failed:', responseText.substring(0, 200))
        return true
      }
    } else {
      console.log('❌ Failed to create entry')
      console.log('📄 Response:', responseText.substring(0, 500))
      return null
    }
  } catch (error) {
    console.error('❌ Error creating entry:', error.message)
    return null
  }
}

// Test with different keys if first one fails
const KEYS_TO_TRY = [
  'bpk-df1977f31d5941bbb246fbfa065f7e0c',
  'bpk-b78e7c34907843c693b049cdcff14326', 
  'bpk-a0266bad47e740a1bc1af794f7741125',
  'bpk-5fb282d3b27447389012cc30a1f21838'
]

async function tryAllKeys() {
  for (let i = 0; i < KEYS_TO_TRY.length; i++) {
    const key = KEYS_TO_TRY[i]
    console.log(`\n🔑 Trying key ${i + 1}: ${key.substring(0, 15)}...`)
    
    // Update the global key
    global.BUILDER_PRIVATE_KEY = key
    
    // Try creating the entry
    const result = await createEmploywellEntry()
    
    if (result) {
      console.log(`\n🎉 Success with key ${i + 1}!`)
      return result
    }
    
    console.log(`❌ Key ${i + 1} failed, trying next...`)
  }
  
  console.log('\n💥 All keys failed')
  return null
}

// Run the script
console.log('🎯 Adding Employwell entry to case-studies data model...')
console.log(`📋 Target model: ${MODEL_NAME}`)
console.log(`🆔 Model ID: 7974871d708e40cdacc287be71235a07\n`)

tryAllKeys().then(result => {
  if (result) {
    console.log('\n✅ Employwell case study has been added to your Builder.io CMS!')
  } else {
    console.log('\n❌ Failed to add case study to Builder.io')
  }
})