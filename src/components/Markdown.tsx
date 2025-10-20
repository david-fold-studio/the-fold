'use client'

import { marked } from 'marked'
import { useMemo } from 'react'

interface MarkdownProps {
  content: string
  className?: string
}

// Configure marked with custom renderer for headings
const renderer = new marked.Renderer()

// Custom heading renderer to apply design system classes
renderer.heading = function(token) {
  const level = token.depth
  const text = token.text
  const className = level <= 3 ? `h${level}` : ''

  return `<h${level} class="${className}">${text}</h${level}>`
}

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
})

export default function Markdown({ content = '', className = '' }: MarkdownProps) {
  const htmlContent = useMemo(() => {
    if (!content) return ''

    try {
      return marked(content)
    } catch (error) {
      console.error('Error parsing markdown:', error)
      return content
    }
  }, [content])

  return (
    <div
      className={`article-body ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
