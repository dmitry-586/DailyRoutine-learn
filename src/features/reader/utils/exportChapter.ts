import type { ChapterMeta } from '@/shared/types'

import {
  escapeHtml,
  extractDetailsContent,
  stripMarkdown,
} from './contentProcessing'
import { downloadFile, sanitizeFileName } from './fileUtils'
import { HTML_EXPORT_STYLES } from './htmlStyles'
import { convertMarkdownToHtml } from './markdownToHtml'

export interface ExportChapterParams {
  chapter: ChapterMeta
  content: string
  partTitle: string
}

/**
 * Экспорт в формате Markdown
 */
export function exportAsMarkdown({
  chapter,
  content,
  partTitle,
}: ExportChapterParams): void {
  const processedContent = extractDetailsContent(content)
  const markdown = `# ${partTitle}\n\n## ${chapter.title}\n\n${processedContent}`
  const fileName = `${sanitizeFileName(chapter.title)}.md`

  downloadFile(markdown, fileName, 'text/markdown')
}

/**
 * Создает HTML документ из контента
 */
function createHtmlDocument(
  partTitle: string,
  chapterTitle: string,
  htmlContent: string,
): string {
  const safePartTitle = escapeHtml(partTitle)
  const safeChapterTitle = escapeHtml(chapterTitle)

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeChapterTitle}</title>
  <style>${HTML_EXPORT_STYLES}</style>
</head>
<body>
  <h1>${safePartTitle}</h1>
  <h2>${safeChapterTitle}</h2>
  <div>${htmlContent}</div>
</body>
</html>`
}

/**
 * Экспорт в формате HTML
 */
export function exportAsHtml({
  chapter,
  content,
  partTitle,
}: ExportChapterParams): void {
  const htmlContent = convertMarkdownToHtml(content)
  const html = createHtmlDocument(partTitle, chapter.title, htmlContent)
  const fileName = `${sanitizeFileName(chapter.title)}.html`

  downloadFile(html, fileName, 'text/html')
}

/**
 * Экспорт в формате TXT (чистый текст)
 */
export function exportAsTxt({
  chapter,
  content,
  partTitle,
}: ExportChapterParams): void {
  const text = stripMarkdown(content)
  const plainText = `${partTitle}\n\n${chapter.title}\n\n${'='.repeat(60)}\n\n${text}`
  const fileName = `${sanitizeFileName(chapter.title)}.txt`

  downloadFile(plainText, fileName, 'text/plain')
}

export type ExportFormat = 'html' | 'markdown' | 'txt'

export function exportChapter(
  format: ExportFormat,
  params: ExportChapterParams,
): void {
  switch (format) {
    case 'html':
      exportAsHtml(params)
      break
    case 'markdown':
      exportAsMarkdown(params)
      break
    case 'txt':
      exportAsTxt(params)
      break
    default:
      throw new Error(`Неизвестный формат экспорта: ${format}`)
  }
}
