/**
 * Преобразует заголовки формата "X.Y. Текст" и "Глава X. Текст" в markdown заголовки
 * Это необходимо, так как исходные markdown файлы используют нумерованный формат
 */
export function normalizeHeadings(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Пропускаем строки, которые уже являются markdown заголовками
    if (trimmed.match(/^#{1,6}\s+/)) {
      result.push(line)
      continue
    }

    // Преобразуем "Глава X. Текст" в h1 (только в начале файла)
    if (i < 5 && trimmed.match(/^Глава \d+\.\s+.+$/)) {
      const text = trimmed.replace(/^Глава \d+\.\s+/, '')
      result.push(`# ${text}`)
      continue
    }

    // Преобразуем "X.Y. Текст" в h2 и "X.Y.Z. Текст" в h3
    const headingMatch = trimmed.match(/^(\d+)\.(\d+)(\.\d+)?\.\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[3] ? 3 : 2 // X.Y.Z = h3, X.Y = h2
      const text = headingMatch[4]
      const hashes = '#'.repeat(level)
      result.push(`${hashes} ${text}`)
      continue
    }

    // Оставляем остальные строки без изменений
    result.push(line)
  }

  return result.join('\n')
}

/**
 * Извлекает заголовки из markdown для создания оглавления
 * Работает с нормализованным markdown (заголовки в формате # ## ###)
 */
export function extractHeadings(
  content: string,
): Array<{ level: number; text: string; id: string }> {
  const headings: Array<{ level: number; text: string; id: string }> = []
  const lines = content.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/)

    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2]
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      headings.push({ level, text, id })
    }
  }

  return headings
}
