'use client'

import { memo, useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { markdownComponents } from './config'
import type { MarkdownContentProps } from './types'
import { normalizeHeadings } from './utils'

/**
 * Мемоизированный компонент для рендеринга markdown
 * Предотвращает лишние ре-рендеры при неизменном контенте
 */
const MemoizedReactMarkdown = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    )
  },
  (prev, next) => prev.content === next.content,
)

MemoizedReactMarkdown.displayName = 'MemoizedReactMarkdown'

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const processedContent = useMemo(() => normalizeHeadings(content), [content])

  return (
    <div
      ref={containerRef}
      className='custom-scrollbar prose h-full max-w-none overflow-y-auto px-4 pt-5 pb-16 sm:px-6 lg:px-8'
    >
      <MemoizedReactMarkdown content={processedContent} />
    </div>
  )
}
