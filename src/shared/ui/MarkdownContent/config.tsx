import type { Components } from 'react-markdown'

export const markdownComponents: Components & Record<string, unknown> = {
  h1: ({ children }) => (
    <h1 className='text-foreground mb-6 text-3xl font-bold'>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className='text-foreground mt-8 mb-4 text-2xl font-semibold'>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className='text-foreground mt-6 mb-3 text-xl font-semibold'>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className='text-foreground mb-4 text-base leading-relaxed'>{children}</p>
  ),
  ul: ({ children }) => (
    <ul className='text-foreground mb-4 list-inside list-disc space-y-2'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='text-foreground mb-4 list-inside list-decimal space-y-2'>
      {children}
    </ol>
  ),
  li: ({ children }) => <li className='ml-4'>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className='border-primary bg-gray my-4 border-l-4 py-2 pl-4 italic'>
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    if (!className) {
      return (
        <code
          className='bg-gray text-primary rounded px-2 py-1 font-mono text-sm'
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        className={`${className} bg-dark-gray text-foreground block overflow-x-auto rounded-lg p-4 text-sm`}
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }) => <pre className='mb-4 overflow-x-auto'>{children}</pre>,
  a: ({ children, href }) => (
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
    <strong className='text-foreground font-bold'>{children}</strong>
  ),
  em: ({ children }) => <em className='text-foreground italic'>{children}</em>,
  hr: () => <hr className='border-gray my-8 border-t-2' />,
}
