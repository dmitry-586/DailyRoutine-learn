import type { QuizQuestion } from '@/shared/types/quiz.types'
import { shuffleArray } from './shuffle'

interface ChapterDistribution {
  chapterId: string
  questions: QuizQuestion[]
  targetCount: number
  currentCount: number
  weight: number
}

/**
 * Распределяет вопросы равномерно по главам с учетом пропорций
 * Улучшенный алгоритм, который учитывает количество вопросов в каждой главе
 */
export function distributeByChapters(
  questions: QuizQuestion[],
  count: number,
): QuizQuestion[] {
  // Группируем вопросы по главам
  const byChapter = new Map<string, QuizQuestion[]>()
  for (const question of questions) {
    const existing = byChapter.get(question.chapterId) ?? []
    existing.push(question)
    byChapter.set(question.chapterId, existing)
  }

  const totalQuestions = questions.length
  const chapters: ChapterDistribution[] = Array.from(byChapter.entries()).map(
    ([chapterId, chapterQuestions]) => {
      // Вычисляем целевую долю вопросов для этой главы
      const chapterWeight = chapterQuestions.length / totalQuestions
      const targetCount = Math.ceil(count * chapterWeight)

      return {
        chapterId,
        questions: shuffleArray(chapterQuestions), // Перемешиваем заранее
        targetCount: Math.min(targetCount, chapterQuestions.length),
        currentCount: 0,
        weight: chapterWeight,
      }
    },
  )

  // Сортируем по весу (больше вопросов = выше приоритет)
  chapters.sort((a, b) => b.weight - a.weight)

  const result: QuizQuestion[] = []
  const used = new Set<string>()

  // Распределяем вопросы пропорционально
  let totalDistributed = 0
  let chapterIndex = 0
  let attempts = 0
  const maxAttempts = count * 3

  while (totalDistributed < count && attempts < maxAttempts) {
    attempts++

    // Находим главу, которая еще не достигла целевого количества
    let found = false
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[chapterIndex % chapters.length]
      chapterIndex++

      if (
        chapter.currentCount < chapter.targetCount &&
        chapter.currentCount < chapter.questions.length
      ) {
        // Находим первый неиспользованный вопрос
        const availableQuestion = chapter.questions.find((q) => !used.has(q.id))

        if (availableQuestion) {
          result.push(availableQuestion)
          used.add(availableQuestion.id)
          chapter.currentCount++
          totalDistributed++
          found = true
          break
        }
      }
    }

    // Если не нашли подходящую главу, пробуем любую доступную
    if (!found) {
      for (const chapter of chapters) {
        const availableQuestion = chapter.questions.find((q) => !used.has(q.id))
        if (availableQuestion) {
          result.push(availableQuestion)
          used.add(availableQuestion.id)
          chapter.currentCount++
          totalDistributed++
          found = true
          break
        }
      }
    }

    if (!found) break
  }

  // Если не набрали достаточно вопросов, добавляем оставшиеся случайным образом
  if (result.length < count) {
    const remaining = questions.filter((q) => !used.has(q.id))
    const shuffled = shuffleArray(remaining)
    const needed = count - result.length
    result.push(...shuffled.slice(0, needed))
  }

  // Финальное перемешивание для случайного порядка
  return shuffleArray(result).slice(0, count)
}
