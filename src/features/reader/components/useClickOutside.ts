import { useEffect, type RefObject } from 'react'

/**
 * Хук для обработки клика вне элемента
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  isEnabled: boolean,
): void {
  useEffect(() => {
    if (!isEnabled) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler, isEnabled])
}
