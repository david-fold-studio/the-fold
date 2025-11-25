"use client"
import { Builder, builder } from '@builder.io/react'

// Initialize Builder with API key
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_BUILDER_API_KEY) {
  builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY)
}

// Import your custom components
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import CaseStudies from '@/components/CaseStudies'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Articles from '@/components/Articles'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import NavigationMinimal from '@/components/NavigationMinimal'
import PitchPricing from '@/components/pitch/PitchPricing'
import PitchSection from '@/components/pitch/PitchSection'
import TeamCard from '@/components/TeamCard'
import TimelineRail from '@/components/ui/timeline-rail'
import DevelopmentProcessComparison from '@/components/pitch/DevelopmentProcessComparison'
import TeamSection from '@/components/pitch/TeamSection'
import Markdown from '@/components/Markdown'
import PitchCTA from '@/components/pitch/PitchCTA'
import PitchTestimonials from '@/components/pitch/PitchTestimonials'

// Register components with Builder.io
Builder.registerComponent(Hero, {
  name: 'Hero',
  description: 'Hero section with video background, title, subtitle, and CTA buttons',
  inputs: [
    {
      name: 'data.eyebrowText',
      friendlyName: 'Eyebrow Text',
      type: 'string',
      helperText: 'Optional eyebrow text above the title'
    },
    {
      name: 'data.title',
      friendlyName: 'Title',
      type: 'string',
      defaultValue: 'Software made just for you now in reach for every business',
      helperText: 'Main hero heading (H1)'
    },
    {
      name: 'data.subtitle',
      friendlyName: 'Subtitle',
      type: 'longText',
      defaultValue: 'AI-driven custom software solutions and automations tailored to your needs, built faster and cheaper than ever with user experience at the core.',
      helperText: 'Hero description text'
    },
    {
      name: 'data.titleMaxWidth',
      friendlyName: 'Title Max Width',
      type: 'string',
      defaultValue: '640px',
      helperText: 'Maximum width of title text (e.g., "640px", "100%")'
    },
    {
      name: 'data.subtitleMaxWidth',
      friendlyName: 'Subtitle Max Width',
      type: 'string',
      defaultValue: '640px',
      helperText: 'Maximum width of subtitle text (e.g., "640px", "100%")'
    },
    {
      name: 'data.italicsStart',
      friendlyName: 'Italics Start (Word Index)',
      type: 'number',
      helperText: 'Starting word index for italic text (optional, 0-based)'
    },
    {
      name: 'data.italicsEnd',
      friendlyName: 'Italics End (Word Index)',
      type: 'number',
      helperText: 'Ending word index for italic text (optional, 0-based)'
    },
    {
      name: 'data.titleLineBreaks',
      friendlyName: 'Title Line Breaks',
      type: 'list',
      helperText: 'Word indices where title should break to new line (optional)',
      subFields: [
        {
          name: 'value',
          type: 'number'
        }
      ]
    },
    {
      name: 'data.subtitleLineBreaks',
      friendlyName: 'Subtitle Line Breaks',
      type: 'list',
      helperText: 'Word indices where subtitle should break to new line (optional)',
      subFields: [
        {
          name: 'value',
          type: 'number'
        }
      ]
    },
    {
      name: 'data.videoSrc',
      friendlyName: 'Video Source',
      type: 'file',
      allowedFileTypes: ['mp4', 'webm'],
      defaultValue: '/video-background.mp4',
      helperText: 'Background video URL'
    },
    {
      name: 'data.backgroundImage',
      friendlyName: 'Background Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'],
      helperText: 'Fallback background image if no video'
    },
    {
      name: 'data.primaryButton.text',
      friendlyName: 'Primary Button Text',
      type: 'string',
      defaultValue: 'Schedule a Call',
      helperText: 'Primary button text'
    },
    {
      name: 'data.primaryButton.variant',
      friendlyName: 'Primary Button Variant',
      type: 'string',
      enum: ['primary', 'secondary', 'outline'],
      defaultValue: 'primary',
      helperText: 'Primary button style'
    },
    {
      name: 'data.primaryButton.size',
      friendlyName: 'Primary Button Size',
      type: 'string',
      enum: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      helperText: 'Primary button size'
    },
    {
      name: 'data.primaryButton.href',
      friendlyName: 'Primary Button Link',
      type: 'string',
      helperText: 'Primary button link URL'
    },
    {
      name: 'data.primaryButton.icon',
      friendlyName: 'Primary Button Icon',
      type: 'string',
      helperText: 'Primary button icon (Lucide icon name, e.g., "ArrowRight")'
    },
    {
      name: 'data.primaryButton.iconPosition',
      friendlyName: 'Primary Button Icon Position',
      type: 'string',
      enum: ['left', 'right'],
      defaultValue: 'right',
      helperText: 'Primary button icon position'
    },
    {
      name: 'data.secondaryButton.text',
      friendlyName: 'Secondary Button Text',
      type: 'string',
      defaultValue: 'Learn More',
      helperText: 'Secondary button text (leave empty to hide)'
    },
    {
      name: 'data.secondaryButton.variant',
      friendlyName: 'Secondary Button Variant',
      type: 'string',
      enum: ['primary', 'secondary', 'outline'],
      defaultValue: 'secondary',
      helperText: 'Secondary button style'
    },
    {
      name: 'data.secondaryButton.size',
      friendlyName: 'Secondary Button Size',
      type: 'string',
      enum: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      helperText: 'Secondary button size'
    },
    {
      name: 'data.secondaryButton.href',
      friendlyName: 'Secondary Button Link',
      type: 'string',
      defaultValue: '#benefits',
      helperText: 'Secondary button link URL'
    },
    {
      name: 'data.secondaryButton.icon',
      friendlyName: 'Secondary Button Icon',
      type: 'string',
      defaultValue: 'ArrowDownCircle',
      helperText: 'Secondary button icon (Lucide icon name)'
    },
    {
      name: 'data.secondaryButton.iconPosition',
      friendlyName: 'Secondary Button Icon Position',
      type: 'string',
      enum: ['left', 'right'],
      defaultValue: 'right',
      helperText: 'Secondary button icon position'
    }
  ],
})

Builder.registerComponent(Benefits, {
  name: 'Benefits',
  inputs: [
    {
      name: 'data',
      type: 'object',
      defaultValue: {
        eyebrowText: 'WHY US?',
        title: 'You\'ll love working with the Fold.',
        paragraphs: ['We balance the empathy-driven approach of experience design with the economical savings afforded by cutting-edge AI engineering technologies.'],
        benefits: [
          {
            title: 'Custom Solutions',
            description: 'Custom solutions built specifically for your needs',
            icon: 'HandHeart'
          },
          {
            title: 'Transparent Pricing',
            description: 'Pre-scoped estimates with time & materials billing',
            icon: 'BookOpen'
          },
          {
            title: 'Value-First Delivery',
            description: 'Sprint-based delivery - lowest hanging fruit first',
            icon: 'Gem'
          },
          {
            title: 'Flexible Engagement',
            description: 'You can cancel at any point',
            icon: 'IterationCw'
          }
        ]
      },
      subFields: [
        {
          name: 'eyebrowText',
          type: 'string',
          required: true,
        },
        {
          name: 'title',
          type: 'string',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'list',
          defaultValue: ['We balance the empathy-driven approach of experience design with the economical savings afforded by cutting-edge AI engineering technologies.'],
          subFields: [
            {
              name: 'text',
              type: 'longText',
            }
          ]
        },
        {
          name: 'benefits',
          type: 'list',
          defaultValue: [
            {
              title: 'Custom Solutions',
              description: 'Custom solutions built specifically for your needs',
              icon: 'HandHeart'
            }
          ],
          subFields: [
            {
              name: 'title',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'longText',
              required: true,
            },
            {
              name: 'icon',
              type: 'string',
              enum: ['HandHeart', 'BookOpen', 'Gem', 'IterationCw'],
              defaultValue: 'HandHeart',
            }
          ]
        }
      ]
    }
  ],
})

Builder.registerComponent(CaseStudies, {
  name: 'Case Studies',
})

Builder.registerComponent(Services, {
  name: 'Services',
})

Builder.registerComponent(Process, {
  name: 'Process',
})

Builder.registerComponent(Pricing, {
  name: 'Pricing',
  description: 'Call-to-action section with customizable title, description, and action buttons',
  inputs: [
    {
      name: 'eyebrowText',
      type: 'string',
      defaultValue: 'Get Started',
      helperText: 'Small text above the title'
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Ready to Build Something Amazing?',
      helperText: 'Main heading text'
    },
    {
      name: 'paragraphs',
      type: 'list',
      defaultValue: [
        "Let's discuss your project and see how we can bring your vision to life.",
        "Everything starts with a quick intro call."
      ],
      helperText: 'Description paragraphs'
    },
    {
      name: 'primaryButtonText',
      type: 'string',
      defaultValue: 'Schedule a Call',
      helperText: 'Text for the primary button'
    },
    {
      name: 'primaryButtonUrl',
      type: 'string',
      defaultValue: 'https://tidycal.com/daviddejong/the-fold-discovery-mpoxpll',
      helperText: 'URL for the primary button'
    },
    {
      name: 'secondaryButtonText',
      type: 'string',
      defaultValue: 'View Our Work',
      helperText: 'Text for the secondary button'
    },
    {
      name: 'secondaryButtonUrl',
      type: 'string',
      defaultValue: '/case-studies',
      helperText: 'URL for the secondary button'
    }
  ],
})

Builder.registerComponent(Testimonials, {
  name: 'Testimonials',
  description: 'Client testimonials section with header and testimonial cards',
  inputs: [
    {
      name: 'data',
      type: 'object',
      defaultValue: {
        eyebrowText: 'CLIENT TESTIMONIALS',
        title: 'What Our Clients Say',
        paragraphs: ['Real feedback from the businesses we\'ve helped grow and transform'],
        testimonials: [
          {
            name: 'Ryan Shelby',
            title: 'CEO & Founder at RespSafety',
            quote: 'We\'ve partnered with The Fold Studio for over a year, and they\'ve been an integral part of our team. Their expertise in design and user experience optimization has significantly enhanced our site\'s flow, leading to a huge increase in user engagement.',
          },
          {
            name: 'Drew Sherman',
            title: 'SVP Brand Strategy at RPM',
            quote: 'David is an instrumental part of my team and has helped bolster our digital strategy. He is not only an incredible UX designer, he is a well-rounded strategist that I lean on constantly for sound advice and the most current trends and best practices.',
          },
          {
            name: 'Chase Binnie',
            title: 'CEO at RetailWire',
            quote: 'David showed great understanding and insight into the brand, enhancing it with his thoughtful UX design. His ability to create customized solutions adds significant value to any web project.',
          },
        ]
      },
      subFields: [
        {
          name: 'eyebrowText',
          type: 'string',
          required: true,
          helperText: 'Small text above the title'
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          helperText: 'Main section heading'
        },
        {
          name: 'paragraphs',
          type: 'list',
          defaultValue: ['Real feedback from the businesses we\'ve helped grow and transform'],
          helperText: 'Description paragraphs'
        },
        {
          name: 'testimonials',
          type: 'list',
          required: true,
          defaultValue: [
            {
              name: 'Client Name',
              title: 'Job Title',
              quote: 'Testimonial quote goes here...'
            }
          ],
          subFields: [
            {
              name: 'name',
              type: 'string',
              required: true,
              helperText: 'Client name'
            },
            {
              name: 'title',
              type: 'string',
              required: true,
              helperText: 'Client job title and company'
            },
            {
              name: 'quote',
              type: 'longText',
              required: true,
              helperText: 'Testimonial quote'
            }
          ]
        }
      ]
    }
  ],
})

Builder.registerComponent(FAQ, {
  name: 'FAQ',
})

Builder.registerComponent(Articles, {
  name: 'Articles',
})

Builder.registerComponent(Footer, {
  name: 'Footer',
})

Builder.registerComponent(Navigation, {
  name: 'Navigation',
})

Builder.registerComponent(NavigationMinimal, {
  name: 'Navigation Minimal',
  description: 'Minimal top navigation with logo and configurable CTA button',
  inputs: [
    {
      name: 'logoUrl',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
      defaultValue: '/logo-full.svg',
      helperText: 'Logo image URL'
    },
    {
      name: 'logoAlt',
      type: 'string',
      defaultValue: 'The Fold',
      helperText: 'Logo alt text for accessibility'
    },
    {
      name: 'buttonText',
      type: 'string',
      defaultValue: 'Get Started',
      helperText: 'Text for the CTA button'
    },
    {
      name: 'buttonUrl',
      type: 'string',
      defaultValue: 'mailto:david@thefold.studio',
      helperText: 'URL or mailto link for the button'
    },
    {
      name: 'buttonVariant',
      type: 'string',
      enum: ['primary', 'secondary', 'outline'],
      defaultValue: 'primary',
      helperText: 'Button style variant'
    }
  ],
})

// Register Pitch Components
Builder.registerComponent(PitchPricing, {
  name: 'Pitch Pricing',
  inputs: [
    {
      name: 'eyebrowText',
      type: 'string',
      helperText: 'Small text above title (optional)'
    },
    {
      name: 'sectionTitle',
      type: 'string',
      helperText: 'Section heading (optional)'
    },
    {
      name: 'sectionParagraphs',
      type: 'list',
      helperText: 'Section description paragraphs (optional)',
      defaultValue: ['Description paragraph goes here']
    },
    {
      name: 'columns',
      type: 'number',
      enum: [
        { label: '2 Columns', value: 2 },
        { label: '3 Columns', value: 3 }
      ],
      defaultValue: 2,
      helperText: 'Number of columns for pricing options'
    },
    {
      name: 'hidePreview',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Hide the preview image section'
    },
    {
      name: 'previewImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
      helperText: 'Preview image (optional)'
    },
    {
      name: 'options',
      type: 'list',
      required: true,
      defaultValue: [
        {
          badge: 'OPTION 1',
          title: 'Starter',
          description: 'Perfect for getting started',
          timeline: '2-4 weeks',
          price: '$3,000',
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        }
      ],
      subFields: [
        {
          name: 'badge',
          type: 'string',
          required: true,
          defaultValue: 'OPTION 1',
        },
        {
          name: 'title',
          type: 'string',
          required: true,
          defaultValue: 'Starter',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          defaultValue: 'Perfect for getting started',
        },
        {
          name: 'timeline',
          type: 'string',
          defaultValue: '2-4 weeks',
          helperText: 'Optional timeline (e.g., "2-4 weeks")'
        },
        {
          name: 'price',
          type: 'string',
          required: true,
          defaultValue: '$3,000',
        },
        {
          name: 'features',
          type: 'list',
          required: true,
          defaultValue: ['Feature 1', 'Feature 2', 'Feature 3'],
          helperText: 'List of features for this pricing option'
        }
      ]
    }
  ],
})

Builder.registerComponent(PitchSection, {
  name: 'Pitch Section',
  inputs: [
    {
      name: 'id',
      type: 'string',
      helperText: 'Optional section ID for anchor links'
    },
    {
      name: 'eyebrowText',
      type: 'string',
      helperText: 'Small text above title'
    },
    {
      name: 'title',
      type: 'string',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'longText',
    },
    {
      name: 'backgroundColor',
      type: 'color',
      defaultValue: 'var(--color-black-solid)',
    },
    {
      name: 'maxWidth',
      type: 'string',
      enum: ['max-w-7xl', 'max-w-6xl', 'max-w-5xl', 'max-w-none'],
      defaultValue: 'max-w-7xl',
    },
    {
      name: 'alignment',
      type: 'string',
      enum: ['left', 'center'],
      defaultValue: 'center',
    },
    {
      name: 'className',
      type: 'string',
      helperText: 'Additional CSS classes'
    }
  ],
  canHaveChildren: true,
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Text',
        options: {
          text: 'Add your content here'
        }
      }
    }
  ]
})

Builder.registerComponent(TeamCard, {
  name: 'Team Card',
  inputs: [
    {
      name: 'name',
      type: 'string',
      required: true,
      defaultValue: 'Team Member'
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      defaultValue: 'Job Title'
    },
    {
      name: 'description',
      type: 'longText',
      required: true,
      defaultValue: 'Brief description of the team member and their expertise.'
    },
    {
      name: 'avatar',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
      required: true,
      helperText: 'Team member photo or use "users-icon" for icon'
    },
    {
      name: 'isSpecialCard',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Use special styling (for "+" cards)'
    }
  ],
})

Builder.registerComponent(TimelineRail, {
  name: 'Timeline Rail',
  inputs: [
    {
      name: 'items',
      type: 'list',
      required: true,
      defaultValue: [
        {
          label: 'Step 1',
          caption: 'Description of step 1',
        },
        {
          label: 'Step 2',
          caption: 'Description of step 2',
        }
      ],
      subFields: [
        {
          name: 'label',
          type: 'string',
          required: true,
        },
        {
          name: 'caption',
          type: 'longText',
          required: true,
        },
        {
          name: 'dotColor',
          type: 'color',
          helperText: 'Custom dot color (optional)'
        },
        {
          name: 'labelColor',
          type: 'color',
          helperText: 'Custom label color (optional)'
        }
      ]
    },
    {
      name: 'size',
      type: 'string',
      enum: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    {
      name: 'lineThickness',
      type: 'number',
      defaultValue: 2,
      helperText: 'Thickness of connecting line in pixels'
    },
    {
      name: 'lineColorClass',
      type: 'string',
      defaultValue: 'bg-zinc-800',
      helperText: 'Tailwind color class for line'
    },
    {
      name: 'dotClass',
      type: 'string',
      defaultValue: 'bg-zinc-600',
      helperText: 'Tailwind color class for dots'
    },
    {
      name: 'dotActiveClass',
      type: 'string',
      defaultValue: 'bg-zinc-100',
      helperText: 'Tailwind color class for active dots'
    },
    {
      name: 'labelAngle',
      type: 'number',
      defaultValue: 0,
      helperText: 'Angle of labels in degrees'
    },
    {
      name: 'gapClassName',
      type: 'string',
      defaultValue: 'justify-between',
      helperText: 'Tailwind gap class for spacing'
    }
  ],
})

// Register complete pitch sections (drag & drop ready)
Builder.registerComponent(TeamSection, {
  name: 'Team Section',
  description: 'Complete team section with 4 team members pre-configured',
})

Builder.registerComponent(DevelopmentProcessComparison, {
  name: 'Development Process Comparison',
  description: 'Three-way comparison of development approaches with timelines',
})

Builder.registerComponent(Markdown, {
  name: 'Markdown',
  description: 'Render markdown content with a textarea input',
  inputs: [
    {
      name: 'content',
      type: 'longText',
      required: true,
      defaultValue: '# Welcome\n\nStart typing your **markdown** content here.\n\n- List item 1\n- List item 2\n\n[Link example](https://example.com)',
      helperText: 'Enter markdown content. Supports headings, bold, italic, lists, links, etc.'
    },
    {
      name: 'className',
      type: 'string',
      helperText: 'Additional CSS classes'
    }
  ],
})

Builder.registerComponent(PitchCTA, {
  name: 'Pitch CTA',
  description: 'Call-to-action section with customizable title, description, and buttons',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Ready to Get Started?',
    },
    {
      name: 'description',
      type: 'longText',
      defaultValue: "Let's eliminate credentialing chaos and give you your time back.",
    },
    {
      name: 'primaryButtonText',
      type: 'string',
      defaultValue: 'Get Started',
    },
    {
      name: 'primaryButtonUrl',
      type: 'string',
      defaultValue: 'mailto:david@thefold.studio',
    },
    {
      name: 'secondaryButtonText',
      type: 'string',
      defaultValue: 'Book Review Call',
    },
    {
      name: 'secondaryButtonUrl',
      type: 'string',
      defaultValue: 'https://tidycal.com/daviddejong/the-fold-discovery-mpoxpll',
    },
  ],
})

Builder.registerComponent(PitchTestimonials, {
  name: 'Pitch Testimonials',
  description: 'Pre-configured testimonials section with 3 client testimonials',
})

// Register design tokens with Builder.io for VS Code extension
Builder.register("designTokens", {
  colors: [
    { name: "White", value: "var(--color-white)" },
    { name: "Black", value: "var(--color-black)" },
    { name: "Gray", value: "var(--color-gray)" },
    { name: "Background", value: "var(--color-background)" },
    { name: "Background Secondary", value: "var(--color-background-secondary)" },
    { name: "Text", value: "var(--color-text)" },
    { name: "Text Secondary", value: "var(--color-text-secondary)" },
    { name: "Accent", value: "var(--color-accent)" },
    { name: "Primary", value: "var(--color-primary)" },
    { name: "Secondary", value: "var(--color-secondary)" },
    { name: "Success", value: "var(--color-success)" },
    { name: "Warning", value: "var(--color-warning)" },
    { name: "Error", value: "var(--color-error)" },
  ]
})

// Register font sizes as design tokens
Builder.register("designTokens.fontSize", [
  { name: "XS", value: "var(--font-size-xs)" },
  { name: "SM", value: "var(--font-size-sm)" },
  { name: "Base", value: "var(--font-size-base)" },
  { name: "MD", value: "var(--font-size-md)" },
  { name: "LG", value: "var(--font-size-lg)" },
  { name: "XL", value: "var(--font-size-xl)" },
  { name: "2XL", value: "var(--font-size-2xl)" },
])

// Register spacing as design tokens
Builder.register("designTokens.spacing", [
  { name: "None", value: "0" },
  { name: "XS", value: "0.5rem" },
  { name: "SM", value: "0.75rem" },
  { name: "Base", value: "1rem" },
  { name: "MD", value: "1.5rem" },
  { name: "LG", value: "2rem" },
  { name: "XL", value: "3rem" },
  { name: "2XL", value: "4rem" },
])

// Register border radius as design tokens
Builder.register("designTokens.borderRadius", [
  { name: "SM", value: "var(--border-radius-sm)" },
  { name: "MD", value: "var(--border-radius-md)" },
  { name: "LG", value: "var(--border-radius-lg)" },
  { name: "XL", value: "var(--border-radius-xl)" },
  { name: "2XL", value: "var(--border-radius-2xl)" },
])

// Also register with editor settings for web editor compatibility
Builder.register("editor.settings", {
  designTokens: {
    colors: [
      { name: "White", value: "var(--color-white)" },
      { name: "Black", value: "var(--color-black)" },
      { name: "Gray", value: "var(--color-gray)" },
      { name: "Background", value: "var(--color-background)" },
      { name: "Background Secondary", value: "var(--color-background-secondary)" },
      { name: "Text", value: "var(--color-text)" },
      { name: "Text Secondary", value: "var(--color-text-secondary)" },
      { name: "Accent", value: "var(--color-accent)" },
      { name: "Primary", value: "var(--color-primary)" },
      { name: "Secondary", value: "var(--color-secondary)" },
      { name: "Success", value: "var(--color-success)" },
      { name: "Warning", value: "var(--color-warning)" },
      { name: "Error", value: "var(--color-error)" },
    ],
    fontSize: [
      { name: "XS", value: "var(--font-size-xs)" },
      { name: "SM", value: "var(--font-size-sm)" },
      { name: "Base", value: "var(--font-size-base)" },
      { name: "MD", value: "var(--font-size-md)" },
      { name: "LG", value: "var(--font-size-lg)" },
      { name: "XL", value: "var(--font-size-xl)" },
      { name: "2XL", value: "var(--font-size-2xl)" },
    ],
    spacing: [
      { name: "None", value: "0" },
      { name: "XS", value: "0.5rem" },
      { name: "SM", value: "0.75rem" },
      { name: "Base", value: "1rem" },
      { name: "MD", value: "1.5rem" },
      { name: "LG", value: "2rem" },
      { name: "XL", value: "3rem" },
      { name: "2XL", value: "4rem" },
    ],
    borderRadius: [
      { name: "SM", value: "var(--border-radius-sm)" },
      { name: "MD", value: "var(--border-radius-md)" },
      { name: "LG", value: "var(--border-radius-lg)" },
      { name: "XL", value: "var(--border-radius-xl)" },
      { name: "2XL", value: "var(--border-radius-2xl)" },
    ],
  }
})

export default function BuilderRegistry() {
  return null
}