import { marked } from 'marked'

import { escapeHtml, extractDetailsContent } from './contentProcessing'

/**
 * Конвертирует markdown в HTML с удалением details/summary тегов
 */
export function convertMarkdownToHtml(markdown: string): string {
  const processedContent = extractDetailsContent(markdown)

  try {
    marked.setOptions({
      breaks: true,
      gfm: true,
    })
    let htmlContent = marked.parse(processedContent) as string

    // Удаляем теги <details> и <summary> из HTML
    htmlContent = htmlContent
      .replace(/<details[^>]*>/gi, '')
      .replace(/<\/details>/gi, '')
      .replace(/<summary[^>]*>/gi, '')
      .replace(/<\/summary>/gi, '')

    return htmlContent
  } catch (error) {
    console.error('Ошибка конвертации markdown в HTML:', error)
    return `<p>${escapeHtml(processedContent)}</p>`
  }
}
