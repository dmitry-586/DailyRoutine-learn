import { questionsBank } from './questions-bank'

export interface QuestionsStatistics {
  total: number
  byPart: Record<string, number>
  byChapter: Record<string, number>
  byDifficulty: {
    easy: number
    medium: number
    hard: number
    unknown: number
  }
  byType: {
    single: number
    multiple: number
  }
}

/**
 * Получить статистику по всем вопросам
 */
export function getQuestionsStatistics(): QuestionsStatistics {
  const stats: QuestionsStatistics = {
    total: questionsBank.length,
    byPart: {},
    byChapter: {},
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      unknown: 0,
    },
    byType: {
      single: 0,
      multiple: 0,
    },
  }

  for (const question of questionsBank) {
    // По частям
    stats.byPart[question.partId] = (stats.byPart[question.partId] ?? 0) + 1

    // По главам
    stats.byChapter[question.chapterId] =
      (stats.byChapter[question.chapterId] ?? 0) + 1

    // По сложности
    const difficulty = question.difficulty ?? 'unknown'
    if (difficulty in stats.byDifficulty) {
      stats.byDifficulty[difficulty as keyof typeof stats.byDifficulty]++
    } else {
      stats.byDifficulty.unknown++
    }

    // По типу
    if (question.type === 'single') {
      stats.byType.single++
    } else {
      stats.byType.multiple++
    }
  }

  return stats
}

/**
 * Получить статистику по вопросам для конкретной части
 */
export function getPartStatistics(
  partId: string,
): Omit<QuestionsStatistics, 'byPart'> {
  const partQuestions = questionsBank.filter((q) => q.partId === partId)

  const stats: Omit<QuestionsStatistics, 'byPart'> = {
    total: partQuestions.length,
    byChapter: {},
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      unknown: 0,
    },
    byType: {
      single: 0,
      multiple: 0,
    },
  }

  for (const question of partQuestions) {
    stats.byChapter[question.chapterId] =
      (stats.byChapter[question.chapterId] ?? 0) + 1

    const difficulty = question.difficulty ?? 'unknown'
    if (difficulty in stats.byDifficulty) {
      stats.byDifficulty[difficulty as keyof typeof stats.byDifficulty]++
    } else {
      stats.byDifficulty.unknown++
    }

    if (question.type === 'single') {
      stats.byType.single++
    } else {
      stats.byType.multiple++
    }
  }

  return stats
}

/**
 * Получить доступные части с количеством вопросов
 */
export function getPartsWithQuestionCount() {
  const partsMap = new Map<string, number>()

  for (const question of questionsBank) {
    partsMap.set(question.partId, (partsMap.get(question.partId) ?? 0) + 1)
  }

  return Array.from(partsMap.entries()).map(([partId, count]) => ({
    partId,
    count,
  }))
}
