'use client'

import type { Components } from 'react-markdown'

const baseText = 'text-foreground'
const headingBase = `${baseText} font-semibold`

export const markdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h1
        id={id}
        className={`${headingBase} mb-6 scroll-mt-20 text-3xl`}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h2
        id={id}
        className={`${headingBase} mt-8 mb-4 scroll-mt-20 text-2xl`}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h3
        id={id}
        className={`${headingBase} mt-6 mb-3 scroll-mt-20 text-xl`}
        {...props}
      >
        {children}
      </h3>
    )
  },
  h4: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h4
        id={id}
        className={`${headingBase} mt-4 mb-2 scroll-mt-20 text-lg`}
        {...props}
      >
        {children}
      </h4>
    )
  },
  h5: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h5
        id={id}
        className={`${headingBase} mt-3 mb-2 scroll-mt-20 text-base`}
        {...props}
      >
        {children}
      </h5>
    )
  },
  h6: ({ children, ...props }) => {
    const id = props.id as string | undefined
    return (
      <h6
        id={id}
        className={`${headingBase} mt-3 mb-2 scroll-mt-20 text-sm`}
        {...props}
      >
        {children}
      </h6>
    )
  },
  p: ({ children, ...props }) => (
    <p className={`${baseText} mb-4 text-base leading-relaxed`} {...props}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className={`${baseText} mb-4 list-outside list-disc space-y-1.5 pl-6`}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className={`${baseText} mb-4 list-outside list-decimal space-y-1.5 pl-6`}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='leading-relaxed'>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className='border-primary bg-gray my-4 border-l-4 py-2 pl-4 italic'>
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className='bg-dark-gray mb-4 overflow-x-auto rounded-lg p-4 font-mono text-sm text-gray-100'>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className

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
  a: ({ href, children }) => (
    <a
      href={href}
      className='text-primary underline hover:opacity-80'
      target='_blank'
      rel='noopener noreferrer'
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className={`${baseText} font-bold`}>{children}</strong>
  ),
  em: ({ children }) => <em className={`${baseText} italic`}>{children}</em>,
  hr: () => <hr className='border-gray my-8 border-t-2' />,
  table: ({ children }) => (
    <table className='mb-4 w-full border-collapse'>{children}</table>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className='border p-2 text-left font-semibold'>{children}</th>
  ),
  td: ({ children }) => <td className='border p-2'>{children}</td>,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className='my-4 max-w-full rounded-lg' />
  ),
}
