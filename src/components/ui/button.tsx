import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    const getButtonClasses = () => {
      const classes = ['btn-base']
      
      // Add size class
      if (size) {
        classes.push(`btn-${size}`)
      }
      
      // Add variant class
      if (variant && variant !== 'link') {
        classes.push(`btn-${variant}`)
      }
      
      // Handle link variant separately (no base styles needed)
      if (variant === 'link') {
        return 'text-white underline-offset-4 hover:underline bg-transparent'
      }
      
      return classes.join(' ')
    }

    return (
      <Comp
        className={cn(getButtonClasses(), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
