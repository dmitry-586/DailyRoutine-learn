import { readFileSync } from 'fs'
import { join } from 'path'

import type { Part, ReaderContent } from '@/shared/types/reader.types'

const CONTENT_DIR = join(process.cwd(), 'src/data-v2')

interface PartConfig {
  id: string
  title: string
  folder: string
  chapters: Array<{
    id: string
    title: string
    file: string
  }>
}

/**
 * Собирает структуру контента и загружает markdown глав при сборке (без API).
 */
export function loadContent(
  partsConfig: PartConfig[],
): Omit<ReaderContent, 'navigation'> {
  const parts: Part[] = partsConfig.map((partConfig) => {
    return {
      id: partConfig.id,
      title: partConfig.title,
      folder: partConfig.folder,
      chapters: partConfig.chapters.map((chapterConfig) => {
        const filePath = join(
          CONTENT_DIR,
          partConfig.folder,
          chapterConfig.file,
        )
        let content: string | undefined
        try {
          content = readFileSync(filePath, 'utf-8')
        } catch {
          content = undefined
        }
        return {
          id: chapterConfig.id,
          title: chapterConfig.title,
          file: chapterConfig.file,
          partId: partConfig.id,
          content,
        }
      }),
    }
  })

  return {
    title: 'Полное руководство по фронтенд-разработке',
    parts,
  }
}
