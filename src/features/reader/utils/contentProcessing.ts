/**
 * Извлекает содержимое из скрытых блоков (details/summary)
 * Удаляет теги <details> и <summary>, оставляя только содержимое
 */
export function extractDetailsContent(content: string): string {
  return content
    .replace(/<details[^>]*>/gi, '')
    .replace(/<\/details>/gi, '')
    .replace(/<summary[^>]*>/gi, '')
    .replace(/<\/summary>/gi, '')
}

/**
 * Очищает markdown контент от разметки для экспорта в простой текст
 */
export function stripMarkdown(markdown: string): string {
  let text = extractDetailsContent(markdown)

  // Удаляем блоки кода
  text = text.replace(/```[\s\S]*?```/g, (match) => {
    return match
      .replace(/```[\w]*\n?/g, '')
      .replace(/```/g, '')
      .trim()
  })

  // Удаляем инлайн код
  text = text.replace(/`([^`]+)`/g, '$1')

  // Удаляем заголовки
  text = text.replace(/^#{1,6}\s+/gm, '')

  // Удаляем жирный текст
  text = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1')

  // Удаляем курсив
  text = text.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, '$1')
  text = text.replace(/(?<!_)_(?!_)([^_]+?)(?<!_)_(?!_)/g, '$1')

  // Удаляем ссылки
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
  text = text.replace(/\[([^\]]+)\]\[[^\]]+\]/g, '$1')

  // Удаляем изображения
  text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1')

  // Удаляем горизонтальные линии
  text = text.replace(/^[-*]{3,}$/gm, '')

  // Удаляем цитаты
  text = text.replace(/^>\s+/gm, '')

  // Удаляем маркеры списков
  text = text.replace(/^[-*+]\s+/gm, '').replace(/^\d+\.\s+/gm, '')

  // Удаляем таблицы
  text = text.replace(/\|.*\|/g, (match) => {
    return match
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean)
      .join(' | ')
  })

  // Удаляем HTML теги
  text = text.replace(/<[^>]+>/g, '')

  // Нормализуем переносы строк и пробелы
  text = text.replace(/\n{3,}/g, '\n\n').replace(/^[ \t]+/gm, '')

  return text.trim()
}

/**
 * Экранирует HTML для безопасной вставки в HTML документ
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m] ?? m)
}
