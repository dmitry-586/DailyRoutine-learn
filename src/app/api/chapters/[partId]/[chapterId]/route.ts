import { partsConfig } from '@/data'
import type { ChapterMeta } from '@/shared/types'
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const CONTENT_DIR = join(process.cwd(), 'src/data')

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
    const content = await readFile(resolved.filePath, 'utf-8')

    return NextResponse.json({
      id: resolved.chapter.id,
      title: resolved.chapter.title,
      content,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось прочитать файл главы' },
      { status: 500, statusText: 'Internal Server Error' },
    )
  }
}

export const revalidate = 0
