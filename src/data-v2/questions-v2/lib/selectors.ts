import type { QuizQuestion } from '@/shared/types/quiz.types'
import { questionsBankV2 } from './questions-bank'

export function getQuestionsByPartV2(partId: string): QuizQuestion[] {
  return questionsBankV2.filter((q) => q.partId === partId)
}

export function getQuestionsByChapterV2(
  partId: string,
  chapterId: string,
): QuizQuestion[] {
  return questionsBankV2.filter(
    (q) => q.partId === partId && q.chapterId === chapterId,
  )
}

export function getChaptersWithQuestionsV2(partId: string): string[] {
  const chapters = new Set<string>()
  questionsBankV2.forEach((q) => {
    if (q.partId === partId) {
      chapters.add(q.chapterId)
    }
  })
  return Array.from(chapters).sort()
}

export function getPartsWithQuestionCountV2(): Array<{
  partId: string
  count: number
}> {
  const partCounts = new Map<string, number>()

  questionsBankV2.forEach((q) => {
    const current = partCounts.get(q.partId) || 0
    partCounts.set(q.partId, current + 1)
  })

  return Array.from(partCounts.entries())
    .map(([partId, count]) => ({ partId, count }))
    .sort((a, b) => a.partId.localeCompare(b.partId))
}

export function getAllPartsV2(): string[] {
  const parts = new Set<string>()
  questionsBankV2.forEach((q) => parts.add(q.partId))
  return Array.from(parts).sort()
}
