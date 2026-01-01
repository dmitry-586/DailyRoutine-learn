import { Check } from 'lucide-react'

interface PartCardProps {
  partId: string
  title: string
  questionsCount: number
  isSelected: boolean
  onToggle: () => void
}

export function PartCard({
  title,
  questionsCount,
  isSelected,
  onToggle,
}: PartCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`rounded-lg border-2 p-4 text-left transition-all ${
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-gray hover:border-gray hover:bg-gray/20'
      }`}
    >
      <div className='flex items-center justify-between gap-3'>
        <div className='flex-1'>
          <h3 className='text-foreground mb-1 text-base font-semibold'>
            {title}
          </h3>
          <p className='text-light-gray text-sm'>{questionsCount} вопросов</p>
        </div>
        {isSelected && (
          <div className='bg-primary flex size-6 shrink-0 items-center justify-center rounded-full'>
            <Check className='text-background size-4' />
          </div>
        )}
      </div>
    </button>
  )
}
