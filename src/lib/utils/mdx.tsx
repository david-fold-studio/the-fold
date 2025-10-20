import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { Fragment } from 'react'
import { useMDXComponents } from '../../../mdx-components'

export async function compileMDX(source: string) {
  const components = useMDXComponents({})

  try {
    // Evaluate MDX directly with proper runtime
    const { default: MDXContent } = await evaluate(source, {
      ...runtime,
      Fragment,
      development: process.env.NODE_ENV === 'development',
      baseUrl: import.meta.url,
    })

    // Return the rendered component with our custom components
    return <MDXContent components={components} />
  } catch (error) {
    console.error('MDX compilation error:', error)
    throw error
  }
}

export function getMDXComponents() {
  return useMDXComponents({})
}
