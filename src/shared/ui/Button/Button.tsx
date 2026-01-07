'use client'

import { cn } from '@/shared/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'glass-icon'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex cursor-pointer items-center justify-center text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
          {
            // Дефолтный вариант для текстовых кнопок навигации
            'border-primary bg-primary text-primary-foreground hover:bg-primary/80 h-9 gap-2 rounded-lg border-2 px-4 py-2 hover:border-transparent':
              variant === 'default',
            // Primary вариант для стандартных кнопок
            'border-primary text-primary hover:bg-primary/10 h-9 gap-2 rounded-lg border-2 bg-transparent px-4 py-2':
              variant === 'primary',
            // Glass-icon для круглых иконок
            'pointer-events-auto size-12 rounded-full border-0 bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)] hover:bg-white/20 active:scale-95':
              variant === 'glass-icon',
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
