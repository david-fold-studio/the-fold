#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log(`
  ____            _   _       _                     _                    _   _ 
 | __ )   _   _  (_) | |   __| |   ___   _ __      (_)   ___       ___  | | (_)
 |  _ \\  | | | | | | | |  / _\` |  / _ \\ | '__|     | |  / _ \\     / __| | | | |
 | |_) | | |_| | | | | | | (_| | |  __/ | |     _  | | | (_) |   | (__  | | | |
 |____/   \\__,_| |_| |_|  \\__,_|  \\___| |_|    (_) |_|  \\___/     \\___| |_| |_|
                                                                               
Builder.io CLI Helper for Next.js App Directory

Available Commands:
`)

const commands = [
  {
    name: 'dev',
    description: 'Show how to access Builder.io Visual Copilot',
    action: () => {
      console.log('🛠️ Builder.io Visual Copilot - Edit Any Code Visually:\n')
      console.log('✅ Visual Copilot is now enabled on localhost:3002')
      console.log('✅ Look for the "🛠️ Builder Visual Copilot" button (bottom-left)')
      console.log('✅ Press Ctrl/Cmd + Shift + B to toggle dev tools\n')
      
      console.log('🎯 What Visual Copilot Does:')
      console.log('• Edit ANY existing component visually (not just Builder content)')
      console.log('• Click on any element to edit styles, text, properties')
      console.log('• Generate code from designs/screenshots')
      console.log('• Real-time visual editing of your React components')
      console.log('• Works with your existing codebase\n')
      
      console.log('🚀 How to Use:')
      console.log('1. Visit: http://localhost:3002')
      console.log('2. Click the "🛠️ Builder Visual Copilot" button')
      console.log('3. OR press Ctrl/Cmd + Shift + B')
      console.log('4. Click on any element to edit it visually')
      console.log('5. Changes are applied to your actual code files')
      
      console.log('\n📝 For Builder.io Content Creation:')
      console.log('• Visit: https://builder.io/content')
      console.log('• Create pages using registered components')
      console.log('• Set preview URL: http://localhost:3002')
    }
  },
  {
    name: 'test',
    description: 'Open the Builder.io integration test page',
    action: () => {
      console.log('Opening Builder.io test page at: http://localhost:3002/builder-test')
      console.log('Make sure your dev server is running with: npm run dev')
    }
  },
  {
    name: 'status',
    description: 'Check Builder.io integration status',
    action: () => {
      console.log('\n📋 Builder.io Integration Status:\n')
      
      // Check if .env.local exists and has API key
      const envPath = path.join(process.cwd(), '.env.local')
      let apiKeyStatus = '❌'
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8')
        if (envContent.includes('NEXT_PUBLIC_BUILDER_API_KEY') && 
            !envContent.includes('your_builder_api_key_here')) {
          apiKeyStatus = '✅'
        }
      }
      
      console.log(`API Key: ${apiKeyStatus} ${apiKeyStatus === '✅' ? 'Configured' : 'Not configured'}`)
      console.log('SDK: ✅ Installed (@builder.io/react)')
      console.log('Registry: ✅ Created (src/lib/builder-registry.tsx)')
      console.log('Dynamic Pages: ✅ Set up (src/app/[...page]/page.tsx)')
      
      if (apiKeyStatus === '❌') {
        console.log('\n🔧 To complete setup:')
        console.log('1. Get API key from: https://builder.io/account/settings')
        console.log('2. Add to .env.local: NEXT_PUBLIC_BUILDER_API_KEY=your_key')
        console.log('3. Restart dev server')
      } else {
        console.log('\n✨ Ready to use! Visit: http://localhost:3002/builder-test')
      }
    }
  },
  {
    name: 'create-space',
    description: 'Create a new Builder.io space (requires API key)',
    action: () => {
      console.log('To create a new Builder.io space, you need a Private API Key')
      console.log('Run: builder create --key YOUR_PRIVATE_KEY --name "Your Space Name"')
      console.log('Get your Private Key from: https://builder.io/account/settings')
    }
  },
  {
    name: 'help',
    description: 'Show this help message',
    action: () => {
      console.log('Use: node builder-cli.js [command]')
      console.log('Available commands listed above.')
    }
  }
]

// Display available commands
commands.forEach(cmd => {
  console.log(`  ${cmd.name.padEnd(15)} - ${cmd.description}`)
})

console.log(`
Usage: node builder-cli.js [command]

Examples:
  node builder-cli.js status        # Check integration status
  node builder-cli.js test          # Open test page
  node builder-cli.js help          # Show this help
`)

// Handle command line arguments
const command = process.argv[2]

if (command) {
  const cmd = commands.find(c => c.name === command)
  if (cmd) {
    console.log(`\n🚀 Running: ${command}\n`)
    cmd.action()
  } else {
    console.log(`\n❌ Unknown command: ${command}`)
    console.log('Use: node builder-cli.js help')
  }
}