# Builder.io CMS Integration Setup

This guide walks you through integrating Builder.io CMS with your existing homepage components.

## 1. Install Builder.io Packages

```bash
npm install @builder.io/react @builder.io/sdk
```

## 2. Environment Variables

Add your Builder.io API keys to `.env.local`:

```env
# Get these from your Builder.io space settings
NEXT_PUBLIC_BUILDER_API_KEY=your-public-api-key-here
BUILDER_PRIVATE_KEY=your-private-key-here
```

## 3. Import Content Models

### Option A: Manual Import via UI
1. Go to [builder.io](https://builder.io) and log into your space
2. Navigate to "Models" in the sidebar
3. Click "New Model" 
4. Select "Import from JSON"
5. Copy and paste each JSON file content from the `builder-models/` folder
6. Repeat for all 6 models

### Option B: Using Builder CLI (Recommended)
```bash
# Install CLI
npm install -g @builder.io/cli

# Login
builder login

# Navigate to builder-models directory
cd builder-models

# Import all models
builder models create --file=testimonials-model.json
builder models create --file=services-model.json  
builder models create --file=benefits-model.json
builder models create --file=hero-model.json
builder models create --file=faq-model.json
builder models create --file=case-studies-model.json
```

## 4. Create Content Entries

After importing models, create actual content entries:

1. Go to Content tab in Builder.io
2. Click "New Entry" for each model type
3. Fill in your actual content data
4. Publish the entries

## 5. Update Your Components

You have two integration approaches:

### Approach 1: Gradual Migration (Recommended)
Keep your existing components and data, but fetch from Builder.io with fallbacks:

```tsx
// Example: Update your existing component
import { getTestimonialsData, withFallback } from '@/lib/builder'
import { testimonialsData as fallbackData } from './data'

export default async function Testimonials() {
  const builderData = await getTestimonialsData()
  const data = withFallback(builderData, fallbackData)
  
  // Rest of your component stays the same
  return (
    <section>
      <h2>{data.title}</h2>
      {/* ... */}
    </section>
  )
}
```

### Approach 2: Full CMS Integration
Replace local data entirely with Builder.io:

```tsx
import { getTestimonialsData } from '@/lib/builder'

export default async function Testimonials() {
  const data = await getTestimonialsData()
  
  if (!data) {
    return <div>Loading...</div>
  }
  
  return (
    <section>
      <h2>{data.title}</h2>
      {/* ... */}
    </section>
  )
}
```

## 6. Test Your Integration

1. Start your development server: `npm run dev`
2. Check that data loads from Builder.io
3. Verify fallbacks work when Builder.io is unavailable
4. Test in Builder.io's preview mode

## Content Model Mapping

Your existing data structure maps directly to Builder.io:

| Local File | Builder Model | Content Type |
|------------|---------------|--------------|
| `testimonials/data/index.ts` | `testimonials-section` | Testimonials |
| `services/data/index.ts` | `services-section` | Services |
| `benefits/data/index.ts` | `benefits-section` | Benefits |
| (Add hero data) | `hero-section` | Hero |
| (Add FAQ data) | `faq-section` | FAQ |
| (Add case studies data) | `case-studies-section` | Case Studies |

## Best Practices

1. **Always use fallbacks** during development
2. **Test offline behavior** - ensure your site works without Builder.io
3. **Cache Builder.io responses** in production
4. **Use TypeScript interfaces** to maintain type safety
5. **Preview content** in Builder.io before publishing

## Troubleshooting

### Common Issues:

**Build errors**: Make sure environment variables are set
**No data returned**: Check your API key and model names
**Type errors**: Verify your interfaces match Builder.io field names
**Performance**: Consider caching and static generation

### Debug Mode:
Add this to see what Builder.io is returning:

```tsx
const data = await getTestimonialsData()
console.log('Builder.io data:', JSON.stringify(data, null, 2))
```

## Next Steps

1. Import all content models
2. Create your first content entry
3. Update one component to test integration
4. Gradually migrate other components
5. Set up preview URLs in Builder.io
6. Configure caching for production