"use client"
import { useEffect, useState } from 'react'

export default function BuilderDevTools() {
  const [isBuilderPreview, setIsBuilderPreview] = useState(false)

  useEffect(() => {
    // Check if we're in Builder.io preview mode
    const urlParams = new URLSearchParams(window.location.search)
    const isPreview = urlParams.get('builder.preview') === 'true' ||
                     urlParams.get('builder.editing') === 'true' ||
                     window.location.search.includes('builder.space')

    setIsBuilderPreview(isPreview)

    // Add development helper styles when in Builder preview
    if (isPreview) {
      const style = document.createElement('style')
      style.textContent = `
        .builder-dev-helper {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #2563eb;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          z-index: 9999;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .builder-component {
          border: 1px dashed #3b82f6 !important;
          position: relative;
        }
        .builder-component:hover::after {
          content: attr(data-builder-component);
          position: absolute;
          top: -25px;
          left: 0;
          background: #1f2937;
          color: white;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 10px;
          z-index: 10000;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  // Don't render anything in production or when not in Builder preview
  if (process.env.NODE_ENV === 'production' || !isBuilderPreview) {
    return null
  }

  return (
    <div className="builder-dev-helper">
      🚀 Builder.io Preview Mode
    </div>
  )
}