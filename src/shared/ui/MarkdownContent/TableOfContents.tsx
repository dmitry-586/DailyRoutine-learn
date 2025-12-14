'use client'

import { extractHeadings } from './utils'

interface TableOfContentsProps {
  content: string
  onHeadingClick?: (id: string) => void
}

export function TableOfContents({
  content,
  onHeadingClick,
}: TableOfContentsProps) {
  const headings = extractHeadings(content)

  // Показываем оглавление только если есть хотя бы 2 заголовка
  if (headings.length < 2) {
    return null
  }

  const handleClick = (id: string) => {
    if (onHeadingClick) {
      onHeadingClick(id)
    } else {
      // Прокрутка к заголовку внутри контейнера
      const element = document.getElementById(id)
      if (element) {
        // Ищем ближайший скроллируемый контейнер
        let scrollContainer = element.parentElement
        while (
          scrollContainer &&
          !scrollContainer.classList.contains('custom-scrollbar')
        ) {
          scrollContainer = scrollContainer.parentElement
        }

        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect()
          const elementRect = element.getBoundingClientRect()
          const scrollTop = scrollContainer.scrollTop
          const offset = elementRect.top - containerRect.top + scrollTop - 80

          scrollContainer.scrollTo({
            top: offset,
            behavior: 'smooth',
          })
        } else {
          // Fallback на window scroll
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }
  }

  return (
    <nav className='mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'>
      <h2 className='text-foreground mb-4 text-lg font-semibold'>Оглавление</h2>
      <ul className='space-y-1.5'>
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={`text-sm ${
              heading.level === 1
                ? 'text-base font-semibold'
                : heading.level === 2
                  ? 'ml-4 font-medium'
                  : heading.level === 3
                    ? 'ml-8'
                    : heading.level === 4
                      ? 'ml-12 text-xs'
                      : 'ml-16 text-xs'
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                handleClick(heading.id)
              }}
              className='text-foreground hover:text-primary transition-colors hover:underline'
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
