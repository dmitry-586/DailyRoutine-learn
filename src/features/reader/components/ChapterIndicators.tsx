import { cn } from '@/shared/lib'
import type { Part } from '@/shared/types'

import { getGlobalChapterIndex } from '../lib'

interface ChapterIndicatorsProps {
  chapters: Part['chapters']
  currentIndex: number
  parts: Part[]
  currentPart: Part
  onScrollTo: (index: number) => void
}

export function ChapterIndicators({
  chapters,
  currentIndex,
  parts,
  currentPart,
  onScrollTo,
}: ChapterIndicatorsProps) {
  return (
    <div className='scrollbar-hide flex max-w-[40vw] gap-2 overflow-x-auto'>
      {chapters.map((_, index) => (
        <button
          key={index}
          onClick={() =>
            onScrollTo(getGlobalChapterIndex(parts, currentPart.id, index))
          }
          className={cn(
            'h-1.5 rounded-full transition-all',
            index === currentIndex
              ? 'bg-primary w-8 shadow-sm'
              : 'w-1.5 bg-white/30 hover:bg-white/50',
          )}
          aria-label={`Перейти к главе ${index + 1}`}
        />
      ))}
    </div>
  )
}
