import { readFileSync } from 'fs'
import { join } from 'path'

import type { Chapter, Part, ReaderContent } from '@/shared/types'

const CONTENT_DIR = join(process.cwd(), 'src/data/content')

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
 * Читает markdown файл и возвращает его содержимое
 */
function readMarkdownFile(filePath: string): string {
  try {
    return readFileSync(filePath, 'utf-8')
  } catch (error) {
    throw new Error(
      `Не удалось прочитать файл: ${filePath}\n` +
        `Убедитесь, что файл существует и путь указан правильно.`,
    )
  }
}

/**
 * Извлекает заголовок из markdown (первая строка с #)
 */
function extractTitleFromMarkdown(content: string): string {
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('# ')) {
      return trimmed.replace(/^#\s+/, '')
    }
  }
  return ''
}

/**
 * Загружает главы из папки части
 */
function loadPartChapters(
  partFolder: string,
  partConfig: PartConfig,
): Chapter[] {
  return partConfig.chapters.map((chapterConfig) => {
    const filePath = join(partFolder, chapterConfig.file)
    const content = readMarkdownFile(filePath)
    const title = chapterConfig.title || extractTitleFromMarkdown(content)

    return {
      id: chapterConfig.id,
      title,
      content,
    }
  })
}

/**
 * Загружает контент из markdown файлов (без навигации)
 */
export function loadContent(
  partsConfig: PartConfig[],
): Omit<ReaderContent, 'navigation'> {
  const parts: Part[] = partsConfig.map((partConfig) => {
    const partFolder = join(CONTENT_DIR, partConfig.folder)
    const chapters = loadPartChapters(partFolder, partConfig)

    return {
      id: partConfig.id,
      title: partConfig.title,
      chapters,
    }
  })

  return {
    title: 'Полное руководство по фронтенд-разработке',
    parts,
  }
}
