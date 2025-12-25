'use client'

import type { ChapterMeta, Part } from '@/shared/types'
import { Menu } from 'lucide-react'

import { ChapterExportMenu } from './ChapterExportMenu'

interface ReaderHeaderProps {
  part: Part
  chapterIndex: number
  currentChapter: ChapterMeta | null
  chapterContent: string | null
  onOpenTableOfContents: () => void
}

export function ReaderHeader({
  part,
  chapterIndex,
  currentChapter,
  chapterContent,
  onOpenTableOfContents,
}: ReaderHeaderProps) {
  const canExport = currentChapter !== null && chapterContent !== null

  return (
    <div className='border-gray bg-background sticky top-0 z-10 border-b px-4 py-3 sm:px-6'>
      <div className='flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h1 className='text-foreground truncate text-lg font-bold sm:text-xl'>
            {part.title}
          </h1>
          <div className='text-light-gray mt-1 text-xs sm:text-sm'>
            Глава {chapterIndex + 1} из {part.chapters.length}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {canExport && (
            <ChapterExportMenu
              chapter={currentChapter}
              content={chapterContent}
              partTitle={part.title}
            />
          )}
          <button
            onClick={onOpenTableOfContents}
            className='text-foreground hover:text-primary rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
            aria-label='Открыть оглавление'
            title='Оглавление'
          >
            <Menu className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>
  )
}
