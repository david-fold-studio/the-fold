import EyebrowHeader from './EyebrowHeader'

interface SectionHeaderProps {
  eyebrowText?: string
  title: string
  paragraphs: string[]
  alignment?: 'center' | 'left'
  maxWidth?: string
  className?: string
}

export default function SectionHeader({ 
  eyebrowText, 
  title, 
  paragraphs, 
  alignment = 'center',
  maxWidth,
  className = ''
}: SectionHeaderProps) {
  const alignmentClasses = alignment === 'center' ? 'text-center' : 'text-left'
  const containerClasses = alignment === 'center' ? 'mx-auto' : ''
  
  return (
    <div className={`${alignmentClasses} ${className}`}>
      <hgroup className="mb-6">
        {eyebrowText && (
          <div className={`mb-6 ${alignment === 'center' ? 'flex justify-center' : ''}`}>
            <EyebrowHeader text={eyebrowText} />
          </div>
        )}
        
        <h2 className="h2">
          {title}
        </h2>
      </hgroup>
      
      <div className={`${containerClasses} ${maxWidth || ''}`}>
        {paragraphs.map((paragraph, index) => (
          <p 
            key={index} 
            className={`body-md ${index < paragraphs.length - 1 ? (alignment === 'left' ? 'mb-6' : 'mb-1') : ''}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}