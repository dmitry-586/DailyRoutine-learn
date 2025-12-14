'use client'

import { cn } from '@/shared/lib'
import type { Part } from '@/shared/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ReaderNavigationProps {
  currentChapterIndex: number
  currentPart: Part | null
  parts: Part[]
  canScrollPrev: boolean
  canScrollNext: boolean
  onScrollPrev: () => void
  onScrollNext: () => void
  onScrollTo: (index: number) => void
}

export function ReaderNavigation({
  currentChapterIndex,
  currentPart,
  parts,
  canScrollPrev,
  canScrollNext,
  onScrollPrev,
  onScrollNext,
  onScrollTo,
}: ReaderNavigationProps) {
  // Получаем главы текущей части для отображения
  const currentPartChapters = currentPart?.chapters ?? []

  // Вычисляем индекс главы внутри текущей части
  const chapterIndexInPart = currentPart
    ? currentChapterIndex -
      parts
        .slice(
          0,
          parts.findIndex((p) => p.id === currentPart.id),
        )
        .reduce((sum, part) => sum + part.chapters.length, 0)
    : 0

  return (
    <div className='no-safe-area-padding fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center'>
      <nav
        className='rounded-full bg-white/10 shadow-lg backdrop-blur-xl'
        style={{
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className='flex items-center gap-4 px-5 py-2'>
          <button
            onClick={onScrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              'flex size-8 items-center justify-center rounded-full transition-all',
              canScrollPrev
                ? 'bg-primary/90 text-background hover:bg-primary shadow-md active:scale-95'
                : 'text-light-gray/30 cursor-not-allowed bg-white/10',
            )}
            aria-label='Предыдущая глава'
          >
            <ChevronLeft className='size-5' />
          </button>

          {/* Индикаторы глав текущей части */}
          <div className='scrollbar-hide flex max-w-[40vw] gap-2 overflow-x-auto'>
            {currentPartChapters.map((_, index) => {
              const partIndex = parts.findIndex((p) => p.id === currentPart!.id)
              const globalIndex =
                parts
                  .slice(0, partIndex)
                  .reduce((sum, part) => sum + part.chapters.length, 0) + index
              return (
                <button
                  key={index}
                  onClick={() => onScrollTo(globalIndex)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    index === chapterIndexInPart
                      ? 'bg-primary w-8 shadow-sm'
                      : 'w-1.5 bg-white/30 hover:bg-white/50',
                  )}
                  aria-label={`Перейти к главе ${index + 1}`}
                />
              )
            })}
          </div>

          <button
            onClick={onScrollNext}
            disabled={!canScrollNext}
            className={cn(
              'flex size-8 items-center justify-center rounded-full transition-all',
              canScrollNext
                ? 'bg-primary/90 text-background hover:bg-primary shadow-md active:scale-95'
                : 'text-light-gray/30 cursor-not-allowed bg-white/10',
            )}
            aria-label='Следующая глава'
          >
            <ChevronRight className='size-5' />
          </button>
        </div>
      </nav>
    </div>
  )
}
