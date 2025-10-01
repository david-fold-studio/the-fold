# MDX Pitches Guide

This guide explains how to create and manage pitch pages using the MDX Pitches system.

## Overview

MDX Pitches allows you to create full-width pitch pages with constrained body content and full-width breakout sections for components like pricing tables and CTAs.

## Directory Structure

```
src/app/(pages)/mdx-pitches/
├── [slug]/
│   └── page.tsx                    # Dynamic pitch page template
└── content/
    ├── index.json                  # Pitch metadata index
    └── [pitch-slug]/
        └── content.mdx             # Pitch content
```

## Creating a New Pitch

### 1. Add Pitch Metadata to index.json

Edit `src/app/(pages)/mdx-pitches/content/index.json` and add your pitch entry:

```json
{
  "pitches": [
    {
      "slug": "my-pitch",
      "title": "My Amazing Pitch",
      "excerpt": "A compelling pitch description",
      "category": "Product",
      "tags": ["saas", "web-app", "b2b"],
      "publishedAt": "2024-01-15",
      "featured": true,
      "order": 1
    }
  ]
}
```

**Fields:**
- `slug`: URL-friendly identifier (must match folder name)
- `title`: Pitch title
- `excerpt`: Short description for SEO/metadata
- `category`: Category name (e.g., "Product", "Service", "Platform")
- `tags`: Array of relevant tags
- `publishedAt`: ISO date string
- `featured`: Boolean for featured pitches
- `order`: Sort order (lower numbers appear first)

### 2. Create Pitch Content Folder and MDX File

```bash
mkdir -p src/app/(pages)/mdx-pitches/content/my-pitch
```

Create `content.mdx` in the new folder:

```mdx
# Introduction

This is regular body content that will be constrained to 800px max-width.

## Problem Statement

Regular paragraphs, headings, lists, and images stay within the max-width container.

- List items are constrained
- They maintain readability
- Perfect for body content

<section className="py-20 bg-gradient-to-b from-black to-grey-900">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="h2 text-center mb-12">Pricing Plans</h2>
    {/* Your full-width pricing component */}
  </div>
</section>

## More Body Content

After the full-width section, content returns to constrained width.
```

## Content Layout System

### Constrained Content (Default)

By default, all direct children are constrained to 800px max-width with auto margins:
- Paragraphs (`<p>`)
- Headings (`<h1>` - `<h6>`)
- Lists (`<ul>`, `<ol>`)
- Images
- Blockquotes

### Full-Width Breakout Sections

Use any of these methods to create full-width sections:

#### Method 1: Section Elements (Recommended)
```mdx
<section className="py-20 bg-black">
  <div className="mx-auto max-w-7xl px-6">
    {/* Your full-width content */}
  </div>
</section>
```

#### Method 2: Full-Width Class
```mdx
<div className="full-width py-20">
  {/* Your full-width content */}
</div>
```

#### Method 3: Component Class Names (Auto-detected)
Elements with these class name patterns automatically become full-width:
- `pricing-*` (e.g., `pricing-section`)
- `cta-*` (e.g., `cta-banner`)
- `hero-*` (e.g., `hero-section`)

```mdx
<div className="pricing-section py-20">
  {/* Automatically full-width */}
</div>
```

## Images

### Inline Images (Constrained)
```mdx
![Alt text](./assets/image.png)
```

### Full-Width Images
```mdx
<section>
  <img src="/images/pitches/my-pitch/hero.png" alt="Hero" className="w-full" />
</section>
```

Images in the `assets` folder are automatically transformed to `/images/pitches/{slug}/` paths.

## CSS Styling

The pitch body uses the `.pitch-body` class with these characteristics:

- **Base styles**: Inherits from `.article-body` (color, font-weight)
- **Constrained children**: All direct children get 800px max-width
- **Full-width breakouts**: `section`, `.full-width`, and pattern-matched classes
- **Typography**: Uses design system tokens (h1-h6 classes, body classes)
- **Images**: Rounded corners, proper spacing, optional captions

### Customization

Styles are defined in `src/styles/article.css` under the `.pitch-body` namespace.

## Accessing Pitches

### Single Pitch URL
```
/mdx-pitches/[slug]
```

Example: `/mdx-pitches/my-pitch`

### Utility Functions

Import from `src/lib/utils/pitches.ts`:

```typescript
import {
  getAllPitches,
  getPitchBySlug,
  getFeaturedPitches,
  getPitchesByCategory
} from '@/lib/utils/pitches'

// Get all pitches (sorted by order, then date)
const pitches = await getAllPitches()

// Get specific pitch
const pitch = await getPitchBySlug('my-pitch')

// Get featured pitches
const featured = await getFeaturedPitches(3)

// Get by category
const productPitches = await getPitchesByCategory('Product')
```

## SEO & Metadata

Each pitch page automatically generates:
- Page title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Proper meta keywords from tags
- Robots meta tags

Metadata is pulled from the `index.json` entry for each pitch.

## Best Practices

1. **Keep body content constrained**: Let regular paragraphs and text stay within the 800px max-width for readability
2. **Use sections for impact**: Wrap pricing, CTAs, and hero elements in `<section>` tags for full-width impact
3. **Organize by slug**: Keep content organized with one folder per pitch slug
4. **Optimize images**: Place images in `/public/images/pitches/{slug}/` for proper serving
5. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
6. **Design system classes**: Use `.h1`, `.h2`, `.h3`, `.body-md` classes from your design system

## Example Full Pitch

```mdx
# Transform Your Business

We help companies build modern web applications that scale.

## The Challenge

Most businesses struggle with legacy systems that can't keep up with modern demands.

<section className="py-20 border-y border-grey-800">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="h2 text-center mb-12">Our Solution</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Feature cards */}
    </div>
  </div>
</section>

## Results

After implementing our solution, companies see:
- 50% faster load times
- 80% reduction in maintenance costs
- 3x increase in conversion rates

<div className="cta-section py-20 bg-gradient-subtle">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="h2 mb-6">Ready to Get Started?</h2>
    <button className="btn-primary">Contact Us</button>
  </div>
</div>
```

## Troubleshooting

**Pitch not appearing:**
- Check that slug in `index.json` matches folder name
- Verify `content.mdx` exists in the pitch folder
- Run `npm run build` to regenerate static paths

**Images not loading:**
- Ensure images are in `/public/images/pitches/{slug}/`
- Check image paths in MDX use correct relative or absolute paths
- Verify image file names match exactly (case-sensitive)

**Full-width not working:**
- Make sure you're using `<section>` tags or `.full-width` class
- Check that element is a direct child of `.pitch-body`
- Verify no conflicting CSS overrides
