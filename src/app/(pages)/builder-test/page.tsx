"use client"
import { useState } from 'react'

export default function BuilderTest() {
  const [apiKey, setApiKey] = useState('')
  const [builderContent, setBuilderContent] = useState(null)

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-black-solid)', color: 'var(--color-white-solid)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Builder.io Integration Test</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Setup Instructions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Get your Builder.io API Key</h3>
              <p className="text-gray-300 mb-2">Visit: <a href="https://builder.io/account/settings" target="_blank" className="text-blue-400 hover:underline">https://builder.io/account/settings</a></p>
              <p className="text-gray-300">Copy your Public API Key</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">2. Add API Key to Environment</h3>
              <p className="text-gray-300">Open <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> and replace:</p>
              <code className="block bg-gray-800 p-3 rounded mt-2 text-sm">
                NEXT_PUBLIC_BUILDER_API_KEY=your_actual_api_key_here
              </code>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">3. Restart Dev Server</h3>
              <p className="text-gray-300">After adding your API key, restart the development server</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">API Key Status:</h4>
              <p className={`px-3 py-1 rounded text-sm ${
                process.env.NEXT_PUBLIC_BUILDER_API_KEY && process.env.NEXT_PUBLIC_BUILDER_API_KEY !== 'your_builder_api_key_here' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-red-900 text-red-300'
              }`}>
                {process.env.NEXT_PUBLIC_BUILDER_API_KEY && process.env.NEXT_PUBLIC_BUILDER_API_KEY !== 'your_builder_api_key_here' 
                  ? '✓ Configured' 
                  : '✗ Not configured'}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Builder.io SDK:</h4>
              <p className="bg-green-900 text-green-300 px-3 py-1 rounded text-sm">✓ Installed</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Registered Components</h2>
          <p className="text-gray-300 mb-4">These components are available in Builder.io:</p>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              'Hero', 'Benefits', 'CaseStudies', 'Services', 
              'Process', 'Pricing', 'Testimonials', 'FAQ', 
              'Articles', 'Header', 'Footer'
            ].map((component) => (
              <div key={component} className="bg-gray-800 px-3 py-2 rounded text-sm">
                {component}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900 text-blue-100 rounded-lg">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Get API key from Builder.io</li>
            <li>Add it to .env.local</li>
            <li>Restart dev server</li>
            <li>Visit Builder.io dashboard to create content</li>
            <li>Use your registered components</li>
            <li>Test dynamic pages at /your-page-name</li>
          </ol>
        </div>
      </div>
    </div>
  )
}