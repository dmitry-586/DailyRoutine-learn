import { questionsBankV2 } from './questions-bank'

export interface QuestionsStatisticsV2 {
  total: number
  byPart: Record<
    string,
    {
      total: number
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
        text: number
      }
    }
  >
  byDifficulty: {
    easy: number
    medium: number
    hard: number
    unknown: number
  }
  byType: {
    single: number
    multiple: number
    text: number
  }
}

export function getQuestionsStatisticsV2(): QuestionsStatisticsV2 {
  const stats: QuestionsStatisticsV2 = {
    total: questionsBankV2.length,
    byPart: {},
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      unknown: 0,
    },
    byType: {
      single: 0,
      multiple: 0,
      text: 0,
    },
  }

  questionsBankV2.forEach((q) => {
    if (!stats.byPart[q.partId]) {
      stats.byPart[q.partId] = {
        total: 0,
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
          text: 0,
        },
      }
    }

    const partStats = stats.byPart[q.partId]
    partStats.total++

    partStats.byChapter[q.chapterId] =
      (partStats.byChapter[q.chapterId] || 0) + 1

    const difficulty = q.difficulty || 'unknown'
    partStats.byDifficulty[difficulty as keyof typeof partStats.byDifficulty]++
    stats.byDifficulty[difficulty as keyof typeof stats.byDifficulty]++

    partStats.byType[q.type]++
    stats.byType[q.type]++
  })

  return stats
}

export function getPartStatisticsV2(partId: string) {
  const questions = questionsBankV2.filter((q) => q.partId === partId)

  const stats = {
    total: questions.length,
    byChapter: {} as Record<string, number>,
    byDifficulty: {
      easy: 0,
      medium: 0,
      hard: 0,
      unknown: 0,
    },
    byType: {
      single: 0,
      multiple: 0,
      text: 0,
    },
  }

  questions.forEach((q) => {
    stats.byChapter[q.chapterId] = (stats.byChapter[q.chapterId] || 0) + 1

    const difficulty = q.difficulty || 'unknown'
    stats.byDifficulty[difficulty as keyof typeof stats.byDifficulty]++

    stats.byType[q.type]++
  })

  return stats
}

export function getAvailablePartsV2(): string[] {
  const parts = new Set<string>()
  questionsBankV2.forEach((q) => parts.add(q.partId))
  return Array.from(parts).sort()
}
