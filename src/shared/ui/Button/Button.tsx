'use client'

import { cn } from '@/shared/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'default' | 'sm'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'border-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-primary-foreground hover:bg-primary/80 hover:border-transparent':
              variant === 'default',
            'text-primary hover:bg-primary/10 bg-transparent':
              variant === 'primary',
            'bg-gray text-foreground hover:bg-gray/80': variant === 'secondary',
            'h-9 px-4 py-2': size === 'default',
            'h-8 gap-1.5 px-3': size === 'sm',
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'
