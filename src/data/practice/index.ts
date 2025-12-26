export interface PracticeItem {
  id: string
  title: string
  file: string
  solutionsFile?: string
}

export const practiceConfig: PracticeItem[] = [
  {
    id: 'javascript-practice',
    title: 'Практикум по основам JavaScript, DOM и асинхронности',
    file: 'javascript-practice.md',
    solutionsFile: 'javascript-solutions.md',
  },
  {
    id: 'react-practice',
    title: 'Практикум по React и архитектуре',
    file: 'react-practice.md',
    solutionsFile: 'react-solutions.md',
  },
]

/**
 * Получает список всех практических заданий
 */
export function getPracticeList(): PracticeItem[] {
  return practiceConfig
}
