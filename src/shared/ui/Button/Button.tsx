'use client'

import { cn } from '@/shared/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'glass' | 'glass-icon'
  size?: 'default' | 'sm' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const isGlassIcon = variant === 'glass-icon'

    return (
      <button
        className={cn(
          'inline-flex cursor-pointer items-center justify-center text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
          {
            // Стандартные варианты
            'border-primary bg-primary text-primary-foreground hover:bg-primary/80 gap-2 rounded-lg border-2 hover:border-transparent':
              variant === 'default',
            'border-primary text-primary hover:bg-primary/10 gap-2 rounded-lg border-2 bg-transparent':
              variant === 'primary',
            'border-gray bg-gray text-foreground hover:bg-gray/80 gap-2 rounded-lg border-2':
              variant === 'secondary',
            // Стеклянные варианты
            'gap-2 rounded-lg border-0 bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)] hover:bg-white/20 active:scale-95':
              variant === 'glass',
            'rounded-full border-0 bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)] hover:bg-white/20 active:scale-95':
              isGlassIcon,
            // Размеры для обычных кнопок
            'h-9 px-4 py-2': !isGlassIcon && size === 'default',
            'h-8 gap-1.5 px-3': !isGlassIcon && size === 'sm',
            'h-12 px-6 py-3 text-base': !isGlassIcon && size === 'lg',
            // Размеры для круглых иконок
            'size-12': isGlassIcon && size === 'default',
            'size-10': isGlassIcon && size === 'sm',
            'size-14': isGlassIcon && size === 'lg',
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
