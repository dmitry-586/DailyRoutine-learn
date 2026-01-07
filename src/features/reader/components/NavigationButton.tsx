import { cn } from '@/shared/lib'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationButtonProps {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
  label: string
}

export function NavigationButton({
  direction,
  disabled,
  onClick,
  label,
}: NavigationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex size-9 cursor-pointer items-center justify-center rounded-full transition-all',
        disabled
          ? 'text-light-gray/30 cursor-not-allowed bg-white/10'
          : 'bg-primary/90 hover:bg-primary shadow-md active:scale-95',
      )}
      aria-label={label}
    >
      <Icon className='size-6' />
    </button>
  )
}
