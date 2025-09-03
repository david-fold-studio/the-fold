import { builder } from '@builder.io/sdk'

// Initialize the Builder SDK
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)

export { builder }

// Builder.io configuration
export const builderConfig = {
  apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY!,
  model: 'page', // Default model name
}