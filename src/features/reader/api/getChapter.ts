'use client'

import type { ChapterMeta } from '@/shared/types'

interface ChapterContentResponse {
  id: string
  title: string
  content: string
}

export async function getChapterContent(
  chapter: ChapterMeta,
): Promise<ChapterContentResponse> {
  const response = await fetch(
    `/api/chapters/${chapter.partId}/${chapter.id}`,
    { cache: 'no-store' },
  )

  if (!response.ok) {
    throw new Error('Не удалось загрузить главу')
  }

  return response.json()
}
