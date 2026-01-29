import { access } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export const dynamic = 'force-dynamic'

const AUDIO_DIR = join(process.cwd(), 'public/audio')

// Поддерживаемые форматы аудио (в порядке приоритета)
const AUDIO_FORMATS = ['.m4a', '.mp3']

type AudioParams = { partId: string }

export async function GET(
  _request: Request,
  context: { params: AudioParams | Promise<AudioParams> },
) {
  const { partId } = await context.params

  // Проверяем наличие файла в разных форматах
  for (const format of AUDIO_FORMATS) {
    const filePath = join(AUDIO_DIR, `${partId}${format}`)

    try {
      await access(filePath)
      return NextResponse.json({
        path: `/audio/${partId}${format}`,
      })
    } catch {
      continue
    }
  }

  return NextResponse.json({ message: 'Аудиофайл не найден' }, { status: 404 })
}

export const revalidate = 0
