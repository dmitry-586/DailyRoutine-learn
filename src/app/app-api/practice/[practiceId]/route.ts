import { practiceConfig } from '@/data/practice'
import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const PRACTICE_DIR = join(process.cwd(), 'src/data/practice')

type PracticeParams = { practiceId: string }

export async function GET(
  _request: Request,
  context: { params: PracticeParams | Promise<PracticeParams> },
) {
  const { practiceId } = await context.params

  const practice = practiceConfig.find((p) => p.id === practiceId)

  if (!practice) {
    return NextResponse.json(
      { message: 'Практическое задание не найдено' },
      { status: 404, statusText: 'Not Found' },
    )
  }

  try {
    const contentPath = join(PRACTICE_DIR, practice.file)
    const content = await readFile(contentPath, 'utf-8')

    let solutions: string | undefined
    if (practice.solutionsFile) {
      const solutionsPath = join(PRACTICE_DIR, practice.solutionsFile)
      solutions = await readFile(solutionsPath, 'utf-8')
    }

    return NextResponse.json({
      id: practice.id,
      title: practice.title,
      content,
      solutions,
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Не удалось прочитать файл практики' },
      { status: 500, statusText: 'Internal Server Error' },
    )
  }
}

export const revalidate = 0
