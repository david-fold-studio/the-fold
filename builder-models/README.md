# Builder.io Content Models Setup Guide

This folder contains JSON schema definitions for all your homepage content models that can be imported into Builder.io.

## Content Models Included

1. **testimonials-model.json** - Client testimonials section
2. **services-model.json** - Services offering section  
3. **benefits-model.json** - Benefits/features section
4. **hero-model.json** - Hero section with title, subtitle, and CTA buttons
5. **faq-model.json** - Frequently asked questions section
6. **case-studies-model.json** - Portfolio/case studies section

## How to Import Content Models

### Method 1: Using Builder.io Admin Interface

1. Go to your Builder.io space dashboard
2. Navigate to "Models" in the sidebar
3. Click "New Model"
4. Choose "Import from JSON"
5. Copy and paste the content from each JSON file
6. Save the model

### Method 2: Using Builder.io CLI

```bash
# Install Builder CLI globally
npm install -g @builder.io/cli

# Login to your Builder account
builder login

# Import each model
builder models create --file=testimonials-model.json
builder models create --file=services-model.json
builder models create --file=benefits-model.json
builder models create --file=hero-model.json
builder models create --file=faq-model.json
builder models create --file=case-studies-model.json
```

## Next Steps After Importing

1. **Create Content Entries**: For each model, create actual content entries with your data
2. **Update Components**: Modify your React components to fetch data from Builder.io instead of local files
3. **Add Builder SDK**: Install and configure the Builder.io SDK in your Next.js project

## Builder.io SDK Integration

### 1. Install Builder SDK

```bash
npm install @builder.io/react @builder.io/sdk
```

### 2. Add Environment Variables

Add to your `.env.local`:

```
NEXT_PUBLIC_BUILDER_API_KEY=your-public-api-key-here
BUILDER_PRIVATE_KEY=your-private-key-here
```

### 3. Create Builder Utility Functions

See `lib/builder.ts` for utility functions to fetch content from Builder.io.

## Content Model Details

### Testimonials Section
- Eyebrow text, title, and description paragraphs
- List of testimonials with name, title, and quote

### Services Section  
- Eyebrow text, title, and description paragraphs
- List of services with title and description

### Benefits Section
- Eyebrow text, title, and description paragraphs
- List of benefits with title, description, and icon selection

### Hero Section
- Main title and subtitle
- Optional background video or image
- Primary and secondary CTA buttons with styling options

### FAQ Section
- Eyebrow text, title, and description paragraphs
- List of questions and answers

### Case Studies Section
- Eyebrow text, title, and description paragraphs  
- List of case studies with title, description, image, tags, and links

## Usage Tips

1. **Model Names**: Use the exact model names specified in the JSON files when querying
2. **Field Names**: All field names are camelCase and match your existing TypeScript interfaces
3. **Content Validation**: Builder.io will validate required fields when creating content
4. **Preview**: Use Builder.io's preview feature to see content changes in real-time