// Test different Builder.io API endpoints
const KEYS = {
  'Key 1': 'bpk-5fb282d3b27447389012cc30a1f21838',
  'Key 2': 'bpk-df1977f31d5941bbb246fbfa065f7e0c', 
  'Key 3': 'bpk-b78e7c34907843c693b049cdcff14326',
  'Key 4': 'bpk-a0266bad47e740a1bc1af794f7741125'
}

const MODEL_ID = '7974871d708e40cdacc287be71235a07'

async function testEndpoint(key, keyName, endpoint, description) {
  try {
    console.log(`\n${description} (${keyName})...`)
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${key}`,
      }
    })
    
    console.log(`📡 Status: ${response.status}`)
    
    if (response.ok) {
      const text = await response.text()
      
      if (text.startsWith('<!doctype') || text.startsWith('<html')) {
        console.log(`❌ Got HTML instead of JSON`)
        return false
      } else {
        try {
          const data = JSON.parse(text)
          console.log(`✅ SUCCESS! Got JSON response`)
          console.log(`📊 Data keys: ${Object.keys(data).join(', ')}`)
          if (data.results) {
            console.log(`📝 Results count: ${data.results.length}`)
          }
          return true
        } catch (e) {
          console.log(`❌ Got text but not valid JSON: ${text.substring(0, 100)}...`)
          return false
        }
      }
    } else {
      console.log(`❌ Failed: ${response.status} ${response.statusText}`)
      return false
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`)
    return false
  }
}

async function runTests() {
  console.log('🚀 Testing Builder.io API endpoints...\n')
  
  for (const [keyName, key] of Object.entries(KEYS)) {
    console.log(`\n${'='.repeat(40)}`)
    console.log(`🔑 Testing ${keyName}: ${key.substring(0, 15)}...`)
    
    // Test different endpoints
    const endpoints = [
      [`https://builder.io/api/v1/content/${MODEL_ID}`, 'Specific model content'],
      [`https://builder.io/api/v1/content/case-studies-section`, 'Case studies section'],
      [`https://builder.io/api/v1/content`, 'All content'],
      [`https://builder.io/api/v1/models`, 'Models list'],
      [`https://builder.io/api/v2/content/${MODEL_ID}`, 'V2 API specific model'],
      [`https://builder.io/api/v2/content/case-studies-section`, 'V2 API case studies'],
    ]
    
    let foundWorking = false
    for (const [endpoint, description] of endpoints) {
      const works = await testEndpoint(key, keyName, endpoint, description)
      if (works && !foundWorking) {
        console.log(`\n🎯 WORKING ENDPOINT FOUND!`)
        console.log(`Key: ${key}`)
        console.log(`Endpoint: ${endpoint}`)
        foundWorking = true
        // Don't break, let's see all working endpoints
      }
    }
    
    if (!foundWorking) {
      console.log(`\n❌ No working endpoints for ${keyName}`)
    }
  }
}

runTests()