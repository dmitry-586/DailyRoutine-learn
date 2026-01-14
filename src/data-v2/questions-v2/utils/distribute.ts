import type { QuizQuestion } from '@/shared/types/quiz.types'
import { shuffle } from './shuffle'

export function distributeQuestionsByChapters(
  questions: QuizQuestion[],
  count: number,
): QuizQuestion[] {
  if (questions.length === 0) return []
  if (count >= questions.length) return shuffle(questions)

  const questionsByChapter = new Map<string, QuizQuestion[]>()

  questions.forEach((q) => {
    const chapter = q.chapterId
    if (!questionsByChapter.has(chapter)) {
      questionsByChapter.set(chapter, [])
    }
    questionsByChapter.get(chapter)!.push(q)
  })

  questionsByChapter.forEach((qs, chapter) => {
    questionsByChapter.set(chapter, shuffle(qs))
  })

  const result: QuizQuestion[] = []
  const chapters = Array.from(questionsByChapter.keys())
  let chapterIndex = 0

  while (result.length < count) {
    const currentChapter = chapters[chapterIndex % chapters.length]
    const chapterQuestions = questionsByChapter.get(currentChapter)!

    if (chapterQuestions.length > 0) {
      result.push(chapterQuestions.shift()!)
    }

    if (chapterQuestions.length === 0) {
      chapters.splice(chapterIndex % chapters.length, 1)
      if (chapters.length === 0) break
    } else {
      chapterIndex++
    }
  }

  return result
}

export function distributeQuestionsByDifficulty(
  questions: QuizQuestion[],
  count: number,
): QuizQuestion[] {
  if (questions.length === 0) return []
  if (count >= questions.length) return shuffle(questions)

  const easy = questions.filter((q) => q.difficulty === 'easy')
  const medium = questions.filter((q) => q.difficulty === 'medium')
  const hard = questions.filter((q) => q.difficulty === 'hard')
  const noDifficulty = questions.filter((q) => !q.difficulty)

  const total = questions.length
  const easyCount = Math.floor((easy.length / total) * count)
  const mediumCount = Math.floor((medium.length / total) * count)
  const hardCount = Math.floor((hard.length / total) * count)
  const noDifficultyCount = Math.floor((noDifficulty.length / total) * count)

  let remaining =
    count - easyCount - mediumCount - hardCount - noDifficultyCount

  const result: QuizQuestion[] = [
    ...shuffle(easy).slice(0, easyCount),
    ...shuffle(medium).slice(0, mediumCount),
    ...shuffle(hard).slice(0, hardCount),
    ...shuffle(noDifficulty).slice(0, noDifficultyCount),
  ]

  if (remaining > 0) {
    const used = new Set(result.map((q) => q.id))
    const unused = questions.filter((q) => !used.has(q.id))
    result.push(...shuffle(unused).slice(0, remaining))
  }

  return shuffle(result)
}
