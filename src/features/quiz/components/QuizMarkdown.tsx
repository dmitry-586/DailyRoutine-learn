'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface QuizMarkdownProps {
  content: string
  className?: string
}

const baseText = 'text-foreground'

export function QuizMarkdown({ content, className }: QuizMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Keep quiz layout compact
          p: ({ children }) => (
            <span className={`${baseText} leading-relaxed`}>{children}</span>
          ),
          code: ({ className: mdClassName, children, ...props }) => {
            const isInline = !mdClassName
            if (isInline) {
              return (
                <code
                  className='bg-dark-gray rounded px-1.5 py-0.5 font-mono text-sm text-gray-200'
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code className='font-mono text-sm text-gray-100' {...props}>
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className='bg-dark-gray mt-2 overflow-x-auto rounded-lg p-3 font-mono text-sm text-gray-100'>
              {children}
            </pre>
          ),
          strong: ({ children }) => (
            <strong className={`${baseText} font-semibold`}>{children}</strong>
          ),
          em: ({ children }) => (
            <em className={`${baseText} italic`}>{children}</em>
          ),
          ul: ({ children }) => (
            <ul className={`${baseText} list-outside list-disc space-y-1 pl-5`}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className={`${baseText} list-outside list-decimal space-y-1 pl-5`}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => <li className='leading-relaxed'>{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
