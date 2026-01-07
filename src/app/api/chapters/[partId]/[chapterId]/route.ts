import { partsConfig } from '@/data-v2'
import type { ChapterMeta } from '@/shared/types'
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const CONTENT_DIR = join(process.cwd(), 'src/data-v2')

// Кэш для markdown контента (в памяти сервера)
const contentCache = new Map<string, { content: string; timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 10 // 10 минут

interface ResolvedChapter {
  chapter: ChapterMeta
  filePath: string
}

function resolveChapter(
  partId: string,
  chapterId: string,
): ResolvedChapter | null {
  const part = partsConfig.find((item) => item.id === partId)
  if (!part) return null

  const chapter = part.chapters.find((item) => item.id === chapterId)
  if (!chapter) return null

  return {
    chapter: {
      ...chapter,
      partId,
    },
    filePath: join(CONTENT_DIR, part.folder, chapter.file),
  }
}

type ChapterParams = { partId: string; chapterId: string }

export async function GET(
  _request: Request,
  context: { params: ChapterParams | Promise<ChapterParams> },
) {
  const { partId, chapterId } = await context.params

  const resolved = resolveChapter(partId, chapterId)

  if (!resolved) {
    return NextResponse.json(
      { message: 'Глава не найдена' },
      { status: 404, statusText: 'Not Found' },
    )
  }

  try {
    const cacheKey = `${partId}:${chapterId}`
    const cached = contentCache.get(cacheKey)
    const now = Date.now()

    // Проверяем кэш
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return NextResponse.json({
        id: resolved.chapter.id,
        title: resolved.chapter.title,
        content: cached.content,
        cached: true,
      })
    }

    // Читаем markdown
    const content = await readFile(resolved.filePath, 'utf-8')

    // Сохраняем в кэш
    contentCache.set(cacheKey, { content, timestamp: now })

    return NextResponse.json({
      id: resolved.chapter.id,
      title: resolved.chapter.title,
      content,
      cached: false,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось прочитать файл главы' },
      { status: 500, statusText: 'Internal Server Error' },
    )
  }
}

export const revalidate = 0
