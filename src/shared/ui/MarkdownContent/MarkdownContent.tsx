'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { markdownComponents } from './config'
import type { MarkdownContentProps } from './types'

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className='prose max-w-none px-4 py-6 sm:px-6 lg:px-8'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
