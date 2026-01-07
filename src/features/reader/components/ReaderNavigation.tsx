'use client'

import type { Part } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ChapterIndicators } from './ChapterIndicators'
import { NavigationButton } from './NavigationButton'

interface ReaderNavigationProps {
  chapterIndexInPart: number
  currentPart: Part | null
  parts: Part[]
  canScrollPrev: boolean
  canScrollNext: boolean
  currentGlobalIndex: number
  totalChapters: number
  onScrollPrev: () => void
  onScrollNext: () => void
  onScrollTo: (index: number) => void
  onOpenTableOfContents: () => void
}

export function ReaderNavigation({
  chapterIndexInPart,
  currentPart,
  parts,
  canScrollPrev,
  canScrollNext,
  currentGlobalIndex,
  totalChapters,
  onScrollPrev,
  onScrollNext,
  onScrollTo,
  onOpenTableOfContents,
}: ReaderNavigationProps) {
  const router = useRouter()

  if (!currentPart) return null

  const handleBackToMenu = () => {
    router.push('/')
  }

  const handleGenerateTest = () => {
    router.push('/quiz')
  }

  return (
    <>
      {/* Кнопка "Назад" слева внизу - скрыта на мобильных */}
      <div className='fixed bottom-4 left-4 z-50 hidden sm:block'>
        <Button
          onClick={handleBackToMenu}
          variant='glass-icon'
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
        >
          <ArrowLeft className='text-foreground size-6' />
        </Button>
      </div>

      {/* Центральная навигация */}
      <div className='pointer-events-auto fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center'>
        <nav className='pointer-events-auto rounded-full bg-white/10 shadow-lg backdrop-blur-xl [backdrop-filter:blur(20px)_saturate(180%)]'>
          <div className='flex items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3 md:gap-4 md:px-4'>
            <NavigationButton
              direction='prev'
              disabled={!canScrollPrev}
              onClick={onScrollPrev}
              label='Предыдущая глава'
            />

            {/* Индикаторы глав - скрыты на мобильных */}
            <div className='hidden md:block'>
              <ChapterIndicators
                chapters={currentPart.chapters}
                currentIndex={chapterIndexInPart}
                parts={parts}
                currentPart={currentPart}
                onScrollTo={onScrollTo}
              />
            </div>

            {/* Счетчик глав - виден только на мобильных */}
            <button
              onClick={onOpenTableOfContents}
              className='text-foreground hover:text-primary pointer-events-auto flex min-w-14 items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all hover:bg-white/10 active:scale-95 md:hidden'
              aria-label='Открыть оглавление'
            >
              <span className='tabular-nums'>
                {currentGlobalIndex + 1}/{totalChapters}
              </span>
            </button>

            <NavigationButton
              direction='next'
              disabled={!canScrollNext}
              onClick={onScrollNext}
              label='Следующая глава'
            />
          </div>
        </nav>
      </div>

      {/* Кнопка "Тесты" справа внизу - скрыта на мобильных */}
      <div className='fixed right-4 bottom-4 z-50 hidden sm:block'>
        <Button
          onClick={handleGenerateTest}
          variant='glass-icon'
          title='Пройти тест'
          aria-label='Пройти тест'
        >
          <GraduationCap className='text-foreground size-6' />
        </Button>
      </div>

      {/* Мобильная навигация: кнопки меню и тестов - на одной высоте с центральной навигацией */}
      <div className='pointer-events-none fixed right-4 bottom-4 left-4 z-40 flex items-center justify-between sm:hidden'>
        <Button
          onClick={handleBackToMenu}
          variant='glass-icon'
          title='Вернуться в меню'
          aria-label='Вернуться в меню'
          className='pointer-events-auto size-10'
        >
          <ArrowLeft className='text-foreground size-5' />
        </Button>

        {/* Пустое место для центральной навигации */}
        <div className='flex-1' />

        <Button
          onClick={handleGenerateTest}
          variant='glass-icon'
          title='Пройти тест'
          aria-label='Пройти тест'
          className='pointer-events-auto size-10'
        >
          <GraduationCap className='text-foreground size-5' />
        </Button>
      </div>
    </>
  )
}
