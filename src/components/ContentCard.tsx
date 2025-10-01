import { Button } from './ui/button'

interface ContentCardProps {
  title: string
  description: string
  image?: string
  imageFocal?: string
  alt?: string
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline'
  buttonSize?: 'sm' | 'md' | 'lg'
  onButtonClick?: () => void
  href?: string
  internalLink?: boolean
  className?: string
  aspectRatio?: string
  showImage?: boolean
}

export default function ContentCard({
  title,
  description,
  image,
  imageFocal = 'center',
  alt,
  buttonText,
  buttonVariant = 'outline',
  buttonSize = 'sm',
  onButtonClick,
  href,
  internalLink = false,
  className = '',
  aspectRatio = '12/9',
  showImage = true
}: ContentCardProps) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick()
    } else if (href) {
      if (internalLink) {
        window.location.href = href
      } else {
        window.open(href, '_blank')
      }
    }
  }

  /* card container */
  return (
    <div
      className={`group overflow-hidden transition-colors border hover:bg-[var(--gradient-subtle-hover)] ${className}`}
      style={{
        background: 'var(--color-grey-850)',
        borderColor: 'var(--color-grey-750)',
        borderRadius: 'var(--br-1)',
      }}
    >
      {/* image container */}
      {showImage && image && (
        <div
          className='overflow-hidden'
          style={{
            aspectRatio: aspectRatio,
            borderRadius: 'var(--br-05)',
            marginLeft: 'var(--space-05)',
            marginRight: 'var(--space-05)',
            marginTop: 'var(--space-05)',
            border: '1px solid var(--color-grey-750)',
          }}
        >
          <img
            src={image}
            alt={alt || title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
            style={{ objectPosition: imageFocal }}
          />
        </div>
      )}
      
      {/* content container */}
      <div className="p-6">
        {/* title */}
        <h3 className="h3 mb-3">
          {title}
        </h3>
        {/* description */}
        <p className="body-sm mb-6">
          {description}
        </p>
        {/* button */}
        {buttonText && (
          <Button 
            variant={buttonVariant} 
            size={buttonSize}
            onClick={handleClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}