"use client"

import { BuilderComponent } from '@builder.io/react'
import BuilderRegistry from '@/lib/builder-registry'

interface BuilderComponentClientProps {
  model: string
  content: any
  context?: any
}

export default function BuilderComponentClient({ 
  model, 
  content, 
  context 
}: BuilderComponentClientProps) {
  return (
    <>
      <BuilderRegistry />
      <BuilderComponent 
        model={model} 
        content={content}
        context={context}
      />
    </>
  )
}