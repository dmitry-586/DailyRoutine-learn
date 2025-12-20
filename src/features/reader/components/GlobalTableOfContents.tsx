'use client'

import { usePWAInstall } from '@/shared/lib/pwa'
import type { ReaderContent } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { Download, X } from 'lucide-react'

interface GlobalTableOfContentsProps {
  content: ReaderContent
  currentChapterIndex: number
  onNavigateToChapter: (index: number) => void
  isOpen: boolean
  onClose: () => void
}

export function GlobalTableOfContents({
  content,
  currentChapterIndex,
  onNavigateToChapter,
  isOpen,
  onClose,
}: GlobalTableOfContentsProps) {
  const { deferredPrompt, isInstalled, isCheckingPrompt, handleInstall } =
    usePWAInstall()

  const handleChapterClick = (globalIndex: number) => {
    onNavigateToChapter(globalIndex)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className='fixed inset-0 z-40 bg-black/50 transition-opacity duration-150 ease-out'
        onClick={onClose}
        aria-hidden='true'
      />

      <aside className='bg-background custom-scrollbar fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto shadow-xl transition-transform duration-150 ease-out sm:max-w-md'>
        <div className='bg-background sticky top-0 border-b border-gray-200 px-4 py-4 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <h2 className='text-foreground text-xl font-bold'>Оглавление</h2>
            <button
              onClick={onClose}
              className='text-foreground hover:text-primary rounded p-1 transition-colors'
              aria-label='Закрыть оглавление'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
        </div>

        <nav className='p-4'>
          <ul className='space-y-4'>
            {content.navigation.map((navPart) => {
              const isCurrentPart =
                currentChapterIndex >= navPart.partStartIndex &&
                currentChapterIndex <
                  navPart.partStartIndex + navPart.chapters.length

              return (
                <li key={navPart.id}>
                  <h3
                    className={`mb-2 text-sm font-semibold tracking-wide uppercase ${
                      isCurrentPart ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    {navPart.title}
                  </h3>
                  <ul className='ml-4 space-y-1'>
                    {navPart.chapters.map((chapter) => {
                      const isCurrentChapter =
                        chapter.globalIndex === currentChapterIndex

                      return (
                        <li key={chapter.id}>
                          <button
                            onClick={() =>
                              handleChapterClick(chapter.globalIndex)
                            }
                            className={`hover:text-primary w-full text-left text-sm transition-colors ${
                              isCurrentChapter
                                ? 'text-primary font-medium'
                                : 'text-foreground/80'
                            }`}
                          >
                            {chapter.title}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>

          {!isInstalled && !isCheckingPrompt && deferredPrompt && (
            <div className='border-gray mt-6 border-t pt-4'>
              <Button
                onClick={handleInstall}
                variant='primary'
                className='flex w-full items-center justify-center gap-2'
              >
                <Download size={16} />
                Установить приложение
              </Button>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
