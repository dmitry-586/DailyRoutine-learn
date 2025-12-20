'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useDeferredValue, useMemo, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { markdownComponents } from './config'
import type { MarkdownContentProps } from './types'
import { normalizeHeadings } from './utils'

const VIRTUALIZATION_THRESHOLD = 32
const MIN_BLOCK_HEIGHT = 140
const MAX_BLOCK_HEIGHT = 1100
const OVERSCAN = 1

function splitMarkdownIntoBlocks(markdown: string): string[] {
  const lines = markdown.split('\n')
  const blocks: string[] = []
  const buffer: string[] = []
  let inFence = false

  lines.forEach((line) => {
    const trimmed = line.trim()
    const isFence = trimmed.startsWith('```')

    if (isFence) {
      inFence = !inFence
    }

    const isSeparator = !inFence && trimmed === ''

    if (isSeparator) {
      if (buffer.length > 0) {
        blocks.push(buffer.join('\n').trim())
        buffer.length = 0
      }
      return
    }

    buffer.push(line)
  })

  if (buffer.length > 0) {
    blocks.push(buffer.join('\n').trim())
  }

  return blocks.filter((block) => block.length > 0)
}

function estimateBlockHeight(block: string): number {
  const lineCount = block.split('\n').length
  const densityFactor = Math.ceil(block.length / 650)
  const estimated = lineCount * 20 + densityFactor * 70

  return Math.min(
    MAX_BLOCK_HEIGHT,
    Math.max(MIN_BLOCK_HEIGHT, Math.round(estimated)),
  )
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const processedContent = useMemo(() => normalizeHeadings(content), [content])
  const deferredContent = useDeferredValue(processedContent)

  const blocks = useMemo(
    () => splitMarkdownIntoBlocks(deferredContent),
    [deferredContent],
  )

  const shouldVirtualize = blocks.length >= VIRTUALIZATION_THRESHOLD

  const estimateSize = useCallback(
    (index: number) => estimateBlockHeight(blocks[index]),
    [blocks],
  )

  const virtualizer = useVirtualizer({
    count: blocks.length,
    getScrollElement: () => containerRef.current,
    estimateSize,
    overscan: OVERSCAN,
    measureElement: (element) => element.getBoundingClientRect().height,
    enabled: shouldVirtualize,
  })

  if (!shouldVirtualize) {
    return (
      <div
        ref={containerRef}
        className='custom-scrollbar prose h-full max-w-none overflow-y-auto px-4 py-6 sm:px-6 lg:px-8'
      >
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

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      ref={containerRef}
      className='custom-scrollbar prose relative h-full max-w-none overflow-y-auto px-4 py-6 sm:px-6 lg:px-8'
    >
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualItems.map((item) => (
          <div
            key={item.key}
            ref={virtualizer.measureElement}
            data-index={item.index}
            className='absolute right-0 left-0'
            style={{ transform: `translateY(${item.start}px)` }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeSanitize]}
              components={markdownComponents}
            >
              {blocks[item.index]}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  )
}
