// Test different Builder.io private keys
const MODEL_ID = '7974871d708e40cdacc287be71235a07'

async function testKey(key, keyName) {
  try {
    console.log(`\n🔑 Testing ${keyName}...`)
    const response = await fetch(`https://builder.io/api/v1/content/${MODEL_ID}`, {
      headers: {
        'Authorization': `Bearer ${key}`,
      }
    })
    
    console.log(`📡 Status: ${response.status}`)
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ ${keyName} WORKS!`)
      console.log(`📊 Found ${data.results?.length || 0} entries`)
      if (data.results && data.results.length > 0) {
        console.log(`📝 First entry has ${data.results[0].data?.studies?.length || 0} studies`)
      }
      return { key, keyName, works: true, data }
    } else {
      const text = await response.text()
      const isHTML = text.startsWith('<!doctype') || text.startsWith('<html')
      console.log(`❌ ${keyName} failed - ${response.status} ${response.statusText}`)
      if (isHTML) {
        console.log(`   Response: HTML page (likely auth issue)`)
      } else {
        console.log(`   Response: ${text.substring(0, 100)}...`)
      }
      return { key, keyName, works: false }
    }
  } catch (error) {
    console.log(`❌ ${keyName} error: ${error.message}`)
    return { key, keyName, works: false }
  }
}

async function testAllKeys(keys) {
  console.log('🚀 Testing Builder.io private keys...\n')
  
  const results = []
  for (const [keyName, key] of Object.entries(keys)) {
    const result = await testKey(key, keyName)
    results.push(result)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('📋 SUMMARY:')
  
  const workingKeys = results.filter(r => r.works)
  const failedKeys = results.filter(r => !r.works)
  
  if (workingKeys.length > 0) {
    console.log(`\n✅ Working keys (${workingKeys.length}):`)
    workingKeys.forEach(r => console.log(`  - ${r.keyName}`))
  }
  
  if (failedKeys.length > 0) {
    console.log(`\n❌ Failed keys (${failedKeys.length}):`)
    failedKeys.forEach(r => console.log(`  - ${r.keyName}`))
  }
  
  return workingKeys
}

// Keys to test
const KEYS_TO_TEST = {
  'Key 1': 'bpk-5fb282d3b27447389012cc30a1f21838',
  'Key 2': 'bpk-df1977f31d5941bbb246fbfa065f7e0c',
  'Key 3': 'bpk-b78e7c34907843c693b049cdcff14326',
  'Key 4': 'bpk-a0266bad47e740a1bc1af794f7741125'
}

// Function to run with provided keys
async function runTest(customKeys = null) {
  const keysToTest = customKeys || KEYS_TO_TEST
  const workingKeys = await testAllKeys(keysToTest)
  
  if (workingKeys.length > 0) {
    console.log(`\n🎯 Use this key for the case studies script:`)
    console.log(`const BUILDER_PRIVATE_KEY = '${workingKeys[0].key}'`)
  } else {
    console.log(`\n💥 No working keys found. Check the keys or API endpoints.`)
  }
  
  return workingKeys
}

// Export for use in other scripts
module.exports = { testKey, testAllKeys, runTest }

// Run if called directly
if (require.main === module) {
  runTest()
}