export {
  filterByDifficultyV2,
  filterByTypeV2,
  getAllPartsV2,
  getAllQuestionsV2,
  getAvailablePartsV2,
  getChaptersWithQuestionsV2,
  getFilteredQuestionsV2,
  getPartStatisticsV2,
  getPartsWithQuestionCountV2,
  getQuestionByIdV2,
  getQuestionsByChapterV2,
  getQuestionsByChaptersV2 as getQuestionsByMultipleChaptersV2,
  getQuestionsByPartsV2 as getQuestionsByMultiplePartsV2,
  getQuestionsByPartV2,
  getQuestionsStatisticsV2,
  getTotalQuestionsCountV2,
  questionsBankV2,
} from './lib'

export type { QuestionsStatisticsV2 } from './lib'

export {
  distributeQuestionsByChapters,
  distributeQuestionsByDifficulty,
  shuffle,
  shuffleAnswersInQuestion,
  shuffleQuestions,
  shuffleQuestionsAndAnswers,
} from './utils'

export function getRandomQuestionsV2(
  questions: import('@/shared/types/quiz.types').QuizQuestion[],
  count: number,
  options?: {
    distributeByChapters?: boolean
    distributeByDifficulty?: boolean
    shuffleAnswers?: boolean
  },
): import('@/shared/types/quiz.types').QuizQuestion[] {
  const {
    distributeByChapters = false,
    distributeByDifficulty = false,
    shuffleAnswers = true,
  } = options || {}

  let result: import('@/shared/types/quiz.types').QuizQuestion[]

  if (distributeByChapters) {
    const { distributeQuestionsByChapters } = require('./utils')
    result = distributeQuestionsByChapters(questions, count)
  } else if (distributeByDifficulty) {
    const { distributeQuestionsByDifficulty } = require('./utils')
    result = distributeQuestionsByDifficulty(questions, count)
  } else {
    const { shuffle } = require('./utils')
    result = shuffle(questions).slice(0, count)
  }

  if (shuffleAnswers) {
    const { shuffleAnswersInQuestion } = require('./utils')
    result = result.map(shuffleAnswersInQuestion)
  }

  return result
}
