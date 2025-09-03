"use client"
import { Builder } from '@builder.io/react'

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
import Header from '@/components/Navigation'

// Register components with Builder.io
Builder.registerComponent(Hero, {
  name: 'Hero',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Software made just for you',
    },
    {
      name: 'subtitle',
      type: 'longText',
      defaultValue: 'AI-driven solutions tailored to your needs, built faster and cheaper than ever with user experience at the core.',
    },
  ],
})

Builder.registerComponent(Benefits, {
  name: 'Benefits',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'The AI Advantage - Stand Out in a New Marketplace',
    },
    {
      name: 'badge',
      type: 'string',
      defaultValue: 'WHY NOW?',
    },
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
})

Builder.registerComponent(Testimonials, {
  name: 'Testimonials',
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

Builder.registerComponent(Header, {
  name: 'Header',
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