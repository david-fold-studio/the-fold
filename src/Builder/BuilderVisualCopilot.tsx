"use client"
import { useEffect, useState } from 'react'

export default function BuilderVisualCopilot() {
  const [isEditMode, setIsEditMode] = useState(false)
  
  useEffect(() => {
    // Check if we're in edit mode and initialize Builder
    const checkEditMode = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const editMode = urlParams.has('builder.editMode') || urlParams.has('builder.frameEditing')
      setIsEditMode(editMode)
      
      // Initialize Builder if in edit mode
      if (editMode && typeof window !== 'undefined') {
        // Wait for Builder script to load
        const initBuilder = () => {
          if (window.Builder) {
            window.Builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!)
            console.log('Builder Visual Copilot initialized')
          } else {
            setTimeout(initBuilder, 100)
          }
        }
        initBuilder()
      }
    }
    
    checkEditMode()
    
    // Listen for URL changes
    window.addEventListener('popstate', checkEditMode)
    return () => window.removeEventListener('popstate', checkEditMode)
  }, [])

  // Add keyboard shortcut to toggle edit mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press Ctrl/Cmd + Shift + B to toggle Builder edit mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'B') {
        e.preventDefault()
        toggleEditMode()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isEditMode])

  const toggleEditMode = () => {
    const url = new URL(window.location.href)
    
    if (isEditMode) {
      // Exit edit mode - go back to clean URL
      url.searchParams.delete('builder.editMode')
      url.searchParams.delete('builder.frameEditing')
      url.searchParams.delete('builder.preview')
      url.searchParams.delete('builder.editing')
      window.location.href = url.toString()
    } else {
      // Enter visual editing mode with various Builder parameters
      url.searchParams.set('builder.editing', 'true')
      url.searchParams.set('builder.frameEditing', 'true')
      url.searchParams.set('builder.editMode', 'true')
      url.searchParams.set('builder.preview', window.location.origin)
      console.log('Entering Builder visual editing mode')
      window.location.href = url.toString()
    }
  }

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        zIndex: 999999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        userSelect: 'none',
        opacity: 0.8,
        transition: 'opacity 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
      onClick={toggleEditMode}
      title="Press Ctrl/Cmd + Shift + B to open Builder.io Content Editor"
    >
      🛠️ {isEditMode ? 'Exit Preview' : 'Edit in Builder'}
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Builder?: {
      init: (apiKey: string) => void
      editMode?: boolean
    }
  }
}