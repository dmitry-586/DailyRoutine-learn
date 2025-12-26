import { distributeByChapters, shuffleArray } from '../utils'
import { questionsBank } from './questions-bank'

import type { QuizQuestion } from '@/shared/types/quiz.types'

interface GetRandomQuestionsOptions {
  partIds?: string[]
  chapterIds?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  excludePartIds?: string[]
  distributeByChapter?: boolean
  balanceDifficulty?: boolean
}

/**
 * Балансирует вопросы по сложности
 */
function balanceByDifficulty(
  questions: QuizQuestion[],
  count: number,
): QuizQuestion[] {
  // Группируем по сложности
  const byDifficulty = {
    easy: questions.filter((q) => q.difficulty === 'easy'),
    medium: questions.filter((q) => q.difficulty === 'medium'),
    hard: questions.filter((q) => q.difficulty === 'hard'),
    unknown: questions.filter((q) => !q.difficulty),
  }

  const result: QuizQuestion[] = []
  const used = new Set<string>()

  // Целевое распределение: 40% easy, 40% medium, 20% hard
  const targets = {
    easy: Math.ceil(count * 0.4),
    medium: Math.ceil(count * 0.4),
    hard: Math.ceil(count * 0.2),
  }

  // Распределяем вопросы по сложности
  const difficulties: Array<'easy' | 'medium' | 'hard'> = [
    'easy',
    'medium',
    'hard',
  ]
  let currentCounts = { easy: 0, medium: 0, hard: 0 }

  // Сначала заполняем по целевым пропорциям
  for (const difficulty of difficulties) {
    const pool = byDifficulty[difficulty]
    const shuffled = shuffleArray(pool)
    const target = targets[difficulty]

    for (const question of shuffled) {
      if (currentCounts[difficulty] < target && !used.has(question.id)) {
        result.push(question)
        used.add(question.id)
        currentCounts[difficulty]++
        if (result.length >= count) break
      }
    }
    if (result.length >= count) break
  }

  // Если не хватило, добавляем из unknown
  if (result.length < count) {
    const shuffled = shuffleArray(byDifficulty.unknown)
    for (const question of shuffled) {
      if (!used.has(question.id)) {
        result.push(question)
        used.add(question.id)
        if (result.length >= count) break
      }
    }
  }

  // Если все еще не хватило, добавляем из любой доступной сложности
  if (result.length < count) {
    const allRemaining = questions.filter((q) => !used.has(q.id))
    const shuffled = shuffleArray(allRemaining)
    const needed = count - result.length
    result.push(...shuffled.slice(0, needed))
  }

  return shuffleArray(result).slice(0, count)
}

/**
 * Получить случайные вопросы для теста
 * Улучшенная версия с равномерным распределением по главам и балансировкой по сложности
 */
export function getRandomQuestions(
  count: number,
  options?: GetRandomQuestionsOptions,
): QuizQuestion[] {
  let filtered = questionsBank

  // По умолчанию исключаем часть 10 (подготовка к собеседованию)
  const excludeParts = options?.excludePartIds ?? ['part-10']
  filtered = filtered.filter((q) => !excludeParts.includes(q.partId))

  if (options?.partIds && options.partIds.length > 0) {
    filtered = filtered.filter((q) => options.partIds!.includes(q.partId))
  }

  if (options?.chapterIds && options.chapterIds.length > 0) {
    filtered = filtered.filter((q) => options.chapterIds!.includes(q.chapterId))
  }

  if (options?.difficulty) {
    filtered = filtered.filter((q) => q.difficulty === options.difficulty)
  }

  // Если не осталось вопросов после фильтрации
  if (filtered.length === 0) {
    return []
  }

  // Если запрошено больше вопросов, чем доступно
  const maxCount = Math.min(count, filtered.length)

  // Если включена балансировка по сложности (и не указана конкретная сложность)
  if (
    options?.balanceDifficulty &&
    !options.difficulty &&
    filtered.length >= maxCount
  ) {
    const balanced = balanceByDifficulty(filtered, maxCount)
    // Применяем распределение по главам к сбалансированному набору
    const shouldDistribute = options?.distributeByChapter !== false
    if (shouldDistribute) {
      return distributeByChapters(balanced, maxCount)
    }
    return balanced
  }

  // Если включено равномерное распределение по главам (по умолчанию true)
  const shouldDistribute = options?.distributeByChapter !== false

  if (shouldDistribute && filtered.length >= maxCount) {
    return distributeByChapters(filtered, maxCount)
  }

  // Иначе используем простое перемешивание
  const shuffled = shuffleArray(filtered)
  return shuffled.slice(0, maxCount)
}

/**
 * Получить все вопросы раздела (перемешанные)
 */
export function getAllQuestionsByPart(
  partId: string,
  options?: {
    shuffle?: boolean
    distributeByChapter?: boolean
  },
): QuizQuestion[] {
  const questions = questionsBank.filter((q) => q.partId === partId)

  if (questions.length === 0) {
    return []
  }

  const shouldShuffle = options?.shuffle !== false
  const shouldDistribute = options?.distributeByChapter !== false

  if (shouldDistribute) {
    return distributeByChapters(questions, questions.length)
  }

  if (shouldShuffle) {
    return shuffleArray(questions)
  }

  return questions
}

/**
 * Получить все доступные главы с вопросами
 */
export function getChaptersWithQuestions() {
  const chaptersMap = new Map<string, { chapterId: string; count: number }>()

  for (const question of questionsBank) {
    const existing = chaptersMap.get(question.chapterId)
    if (existing) {
      existing.count++
    } else {
      chaptersMap.set(question.chapterId, {
        chapterId: question.chapterId,
        count: 1,
      })
    }
  }

  return Array.from(chaptersMap.values())
}
