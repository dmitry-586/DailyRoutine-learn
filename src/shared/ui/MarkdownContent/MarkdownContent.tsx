'use client'

import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { markdownComponents } from './config'
import type { MarkdownContentProps } from './types'
import { normalizeHeadings } from './utils'

export function MarkdownContent({ content }: MarkdownContentProps) {
  const processedContent = useMemo(() => {
    return normalizeHeadings(content)
  }, [content])

  return (
    <div className='prose max-w-none px-4 py-6 sm:px-6 lg:px-8'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeSanitize]}
        components={markdownComponents}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
