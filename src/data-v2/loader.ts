import type { Part, ReaderContent } from '@/shared/types/reader.types'

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
 * Собирает мета-структуру контента без загрузки markdown
 */
export function loadContent(
  partsConfig: PartConfig[],
): Omit<ReaderContent, 'navigation'> {
  const parts: Part[] = partsConfig.map((partConfig) => {
    return {
      id: partConfig.id,
      title: partConfig.title,
      folder: partConfig.folder,
      chapters: partConfig.chapters.map((chapterConfig) => ({
        id: chapterConfig.id,
        title: chapterConfig.title,
        file: chapterConfig.file,
        partId: partConfig.id,
      })),
    }
  })

  return {
    title: 'Полное руководство по фронтенд-разработке',
    parts,
  }
}
