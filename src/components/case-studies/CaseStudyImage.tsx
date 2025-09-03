import Image from 'next/image'

interface CaseStudyImageProps {
  src: string
  alt: string
  caption?: string
  variant?: 'default' | 'large'
  className?: string
}

export default function CaseStudyImage({
  src,
  alt,
  caption,
  variant = 'default',
  className = ''
}: CaseStudyImageProps) {
  const maxWidth = variant === 'large' ? 'max-w-[1200px]' : 'max-w-[800px]'
  
  return (
    <div className={`mx-auto ${maxWidth} ${className}`}>
      <div className="relative w-full rounded-2xl overflow-hidden" style={{
        backgroundColor: 'var(--color-grey-900)',
        border: '1px solid var(--color-grey-800)'
      }}>
        <Image
          src={src}
          alt={alt}
          width={variant === 'large' ? 1200 : 800}
          height={variant === 'large' ? 675 : 450}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      
      {caption && (
        <div className="mt-3 text-center">
          <p className="body-sm">
            {caption}
          </p>
        </div>
      )}
    </div>
  )
}