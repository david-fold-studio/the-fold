// Add Employwell case study via local API
async function addEmploywellCaseStudy() {
  const baseUrl = 'http://localhost:3007' // Adjust port if needed
  
  const employwellCaseStudy = {
    title: "How Strategic UX Research Prevented Costly EHR Integration Delays for a Healthcare Startup",
    description: "When Employwell faced the choice between expensive EHR integrations or building a user-first solution, strategic UX research revealed a 'foot in the door' approach that delivered immediate value while positioning for future growth. The result: +2 treatment cycles per clinic, 25% admin reduction, and 3-month ROI - all while avoiding 6-12 months of costly integration work.",
    image: "/images/case-studies/employwell-dashboard.jpg",
    tags: ["Healthcare", "UX Research", "Startup", "EHR", "Fertility Care"],
    link: "/case-studies/employwell-healthcare"
  }

  try {
    console.log('🚀 Adding Employwell case study via API...')
    
    const response = await fetch(`${baseUrl}/api/builder/case-studies`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseStudy: employwellCaseStudy
      })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API call failed: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ Successfully added Employwell case study!')
    console.log('📊 Response:', JSON.stringify(result, null, 2))
    
    // Verify by getting all case studies
    console.log('\n🔍 Fetching all case studies to verify...')
    const verifyResponse = await fetch(`${baseUrl}/api/builder/case-studies`)
    
    if (verifyResponse.ok) {
      const allCaseStudies = await verifyResponse.json()
      console.log('📋 Current case studies:', allCaseStudies.data?.studies?.length || 0)
      console.log('📝 Studies:', allCaseStudies.data?.studies?.map(s => s.title) || [])
    }
    
    return result
  } catch (error) {
    console.error('❌ Error adding case study:', error.message)
    return null
  }
}

// Test API connection first
async function testConnection() {
  const baseUrl = 'http://localhost:3007'
  
  try {
    console.log('🔧 Testing API connection...')
    const response = await fetch(`${baseUrl}/api/builder/case-studies`)
    console.log('📡 Status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ API is working!')
      console.log('📊 Current data:', data)
      return { connected: true, status: response.status }
    } else if (response.status === 404) {
      const text = await response.text()
      console.log('✅ API is working - no existing case studies found (expected)')
      console.log('⚠️ Response:', text)
      return { connected: true, status: response.status }
    } else {
      const text = await response.text()
      console.log('❌ API error:', text)
      return { connected: false, status: response.status }
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    return { connected: false, status: null }
  }
}

// Run the script
async function run() {
  console.log('🎯 Starting case study addition process...\n')
  
  const { connected, status } = await testConnection()
  
  if (!connected) {
    console.log('\n💡 Make sure your dev server is running on localhost:3007')
    console.log('Run: npm run dev')
    return
  }
  
  console.log('\n' + '='.repeat(50))
  await addEmploywellCaseStudy()
  
  console.log('\n🎉 Process complete!')
  console.log('✅ Employwell case study should now be visible in your Builder.io CMS')
}

run()