'use client'

import { Download } from 'lucide-react'
import { useRef, useState } from 'react'

import type { ChapterMeta } from '@/shared/types'

import { exportChapter, type ExportFormat } from '../utils/exportChapter'
import { EXPORT_FORMATS } from './exportFormats'
import { useClickOutside } from './useClickOutside'

interface ChapterExportMenuProps {
  chapter: ChapterMeta
  content: string
  partTitle: string
}

export function ChapterExportMenu({
  chapter,
  content,
  partTitle,
}: ChapterExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useClickOutside(menuRef, () => setIsOpen(false), isOpen)

  const handleExport = (format: ExportFormat) => {
    exportChapter(format, { chapter, content, partTitle })
    setIsOpen(false)
  }

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-foreground hover:text-primary rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
        aria-label='Экспорт главы'
        title='Экспорт главы'
      >
        <Download className='h-5 w-5' />
      </button>

      {isOpen && (
        <div className='bg-background border-gray absolute top-full right-0 z-50 mt-2 min-w-[160px] rounded-lg border shadow-lg'>
          <div className='py-1'>
            {EXPORT_FORMATS.map(({ format, label, icon: Icon }) => (
              <button
                key={format}
                onClick={() => handleExport(format)}
                className='text-foreground flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <Icon className='h-4 w-4' />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
