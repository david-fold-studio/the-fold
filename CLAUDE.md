# Claude Code Documentation for The Fold

## Case Studies Content Management

### Overview
This project uses Builder.io CMS to manage case studies. The case-studies data model (ID: `case-studies`) stores all case study content and metadata.

### Case Study Data Model Fields

**Core Content:**
- `title` - Main case study title (displayed in Hero H1, NOT in MDX content)
- `description` - Brief description/excerpt (displayed below Hero H1)
- `content` - Full MDX content (exclude title and summary sections)

**Media:**
- `cover` - Hero background image URL
- `thumbnail` - Website thumbnail and social media OG image URL

**Navigation & Organization:**
- `urlSlug` - URL slug for the case study (e.g., 'employwell-healthcare')
- `tags` - Array of topic tags for filtering and organization
- `client` - Array containing client name(s)
- `services` - Array of services provided (displayed as badges)

**SEO Fields:**
- `seoTitle` - Full SEO title with branding (e.g., "Title - Case Study | The Fold")
- `seoDescription` - Meta description (MUST be under 160 characters)
- `seoTags` - Array of SEO keywords

### Content Guidelines for Agents

#### MDX Content Structure
When creating or editing MDX content:

1. **DO NOT include the main title** - The title is handled by the Hero component via the `title` field
2. **DO NOT include a Summary section** - The description field provides the summary below the Hero
3. **Start directly with substantive content** - Begin with background, challenge, or methodology sections
4. **Use relative image paths** - Format: `![Alt text](./assets/image-name.jpg)` (will be processed to `/images/case-studies/{slug}/image-name.jpg`)
5. **Keep placeholder images** - Unless specifically provided new images, leave existing placeholder URLs intact

#### Required Content Sections (in order):
- **Background/Challenge** - Client situation and problems
- **Approach/Methodology** - How The Fold approached the project
- **Solution** - What was delivered
- **Results/Impact** - Measurable outcomes and success metrics

#### Field Population Guidelines:

**Title:** 
- Clear, action-oriented case study title
- Focus on outcomes or key differentiator
- Example: "How UX Research & Product Strategy prevented Costly EHR Integration"

**Description (under 300 chars):**
- Compelling summary that hooks readers
- Include key metrics or outcomes
- Example: "When Employwell faced expensive EHR integrations, strategic UX research revealed a 'foot in the door' approach. +2 treatment cycles per clinic, 25% admin reduction, 3-month ROI."

**SEO Description (MUST be under 160 chars):**
- Optimized for search engines
- Include primary keywords and key outcome
- Example: "Strategic UX research helped Employwell avoid costly EHR delays, achieving +2 treatment cycles per clinic and 25% admin reduction."

**Tags (5-8 recommended):**
- Mix of industry, methodology, and technology tags
- Example: ['Healthcare', 'UX Research', 'Product Strategy', 'EHR Integration', 'Startup', 'Dashboard Design']

**Services (4-6 recommended):**
- Specific services delivered to client
- Example: ['UX Research', 'Product Strategy', 'Information Architecture', 'Dashboard Design', 'User Experience Design']

**Client:**
- Array format: ['Client Name']

### Builder.io Integration

#### API Access:
- **Read API Key (Public):** `4a242b8010c048df9c06392f47457ba0` - Safe for client-side use
- **Write API Key (Private):** `bpk-5fb282d3b27447389012cc30a1f21838` - Server-side only, for CMS updates

#### Write API Usage:
```javascript
// Update existing entry
const response = await fetch(`https://builder.io/api/v1/write/case-studies/${entryId}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${privateKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Case Study Name',
    data: caseStudyData,
    published: 'published'
  })
})
```

#### Working Script Pattern:
See `/scripts/fix-seo-and-services.js` for a complete working example of updating case study content.

### Security Considerations
- Public API key is safe for client-side read operations
- Private API key must only be used server-side or in build scripts
- Never commit private keys to version control (use environment variables in production)
- Private key is acceptable in scripts for development/content management

### Quality Checklist
Before publishing a case study, verify:
- [ ] Title appears in Hero H1, not in MDX content
- [ ] No Summary section in MDX (handled by description field)
- [ ] SEO description under 160 characters
- [ ] All required fields populated (title, description, client, services, tags)
- [ ] Thumbnail set for social sharing
- [ ] Content follows logical structure (Background → Approach → Solution → Results)
- [ ] Images use relative paths or maintain existing placeholders
- [ ] URL slug is SEO-friendly and unique

### File Structure
```
/scripts/
  ├── fix-seo-and-services.js     # Working example for updates
  ├── complete-employwell-fields.js # Complete field population example
/src/
  ├── lib/utils/case-studies.ts   # Case study data fetching logic
  ├── app/(pages)/case-studies/[slug]/page.tsx # Case study page template
```

### Future Expansion
This documentation pattern will be extended to other data models:
- Testimonials
- Team members
- Services
- Projects

---

*This documentation is for Claude Code agents working on The Fold project. Always refer to this guide when creating or modifying case study content.*