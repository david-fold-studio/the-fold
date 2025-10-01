// Try each private key one by one to create Employwell entry
const KEYS = [
  { name: 'Key 1', key: 'bpk-5fb282d3b27447389012cc30a1f21838' },
  { name: 'Key 2', key: 'bpk-df1977f31d5941bbb246fbfa065f7e0c' },
  { name: 'Key 3', key: 'bpk-b78e7c34907843c693b049cdcff14326' },
  { name: 'Key 4', key: 'bpk-a0266bad47e740a1bc1af794f7741125' }
]

async function createEmploywellWithKey(privateKey, keyName) {
  const employwellEntry = {
    name: "Employwell Healthcare Platform Case Study",
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
      slug: "employwell-healthcare"
    },
    published: "published"
  }

  try {
    console.log(`\n🚀 Trying to create entry with ${keyName}...`)
    console.log(`🔑 Key: ${privateKey.substring(0, 15)}...`)
    
    const response = await fetch('https://builder.io/api/v1/content/case-studies', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${privateKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employwellEntry)
    })
    
    console.log(`📡 Status: ${response.status}`)
    const responseText = await response.text()
    
    if (response.status === 200 || response.status === 201) {
      if (responseText.startsWith('<!doctype') || responseText.startsWith('<html')) {
        console.log(`✅ ${keyName}: Got 200/201 status (likely successful, HTML response)`)
        return { success: true, key: privateKey, keyName }
      } else {
        try {
          const result = JSON.parse(responseText)
          console.log(`✅ ${keyName}: SUCCESS! Entry created`)
          console.log(`📋 Entry ID: ${result.id}`)
          return { success: true, key: privateKey, keyName, result }
        } catch (e) {
          console.log(`✅ ${keyName}: 200 status but unexpected response format`)
          return { success: true, key: privateKey, keyName }
        }
      }
    } else {
      console.log(`❌ ${keyName}: Failed with status ${response.status}`)
      console.log(`📄 Response: ${responseText.substring(0, 200)}`)
      return { success: false, key: privateKey, keyName, status: response.status }
    }
  } catch (error) {
    console.log(`❌ ${keyName}: Error - ${error.message}`)
    return { success: false, key: privateKey, keyName, error: error.message }
  }
}

async function tryAllKeysSequentially() {
  console.log('🎯 Trying each private key to create Employwell case study...')
  console.log('🎯 Target: case-studies data model\n')
  
  const results = []
  
  for (const { name, key } of KEYS) {
    const result = await createEmploywellWithKey(key, name)
    results.push(result)
    
    if (result.success) {
      console.log(`\n🎉 SUCCESS with ${name}! `)
      console.log(`🔑 Working key: ${key}`)
      
      // Try to verify this worked by checking content
      await verifyWithKey(key, name)
      break
    }
    
    console.log(`\n⏭️  Trying next key...`)
  }
  
  const successfulKeys = results.filter(r => r.success)
  const failedKeys = results.filter(r => !r.success)
  
  console.log(`\n${'='.repeat(60)}`)
  console.log('📊 SUMMARY:')
  console.log(`✅ Successful: ${successfulKeys.length}`)
  console.log(`❌ Failed: ${failedKeys.length}`)
  
  if (successfulKeys.length > 0) {
    console.log('\n🎉 At least one key worked! Check your Builder.io dashboard.')
    console.log('Visit: https://builder.io/content')
  } else {
    console.log('\n💥 No keys worked. There might be an API issue.')
  }
}

async function verifyWithKey(key, keyName) {
  try {
    console.log(`\n🔍 Verifying with ${keyName}...`)
    const response = await fetch('https://builder.io/api/v1/content/case-studies?limit=10', {
      headers: {
        'Authorization': `Bearer ${key}`,
      }
    })
    
    if (response.ok) {
      const text = await response.text()
      if (text.includes('Employwell') || text.includes('employwell')) {
        console.log('✅ Verification: Found Employwell in response!')
        return true
      } else {
        console.log('⚠️ Verification: No Employwell found in response')
        return false
      }
    } else {
      console.log(`❌ Verification failed: ${response.status}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Verification error: ${error.message}`)
    return false
  }
}

tryAllKeysSequentially()