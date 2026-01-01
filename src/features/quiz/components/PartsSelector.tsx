import { PartCard } from './PartCard'

interface Part {
  id: string
  title: string
  chapters: { id: string }[]
}

interface PartsSelectorProps {
  parts: Part[]
  selectedParts: string[]
  partsWithCounts: Map<string, number>
  onTogglePart: (partId: string) => void
}

export function PartsSelector({
  parts,
  selectedParts,
  partsWithCounts,
  onTogglePart,
}: PartsSelectorProps) {
  return (
    <div className='space-y-4 pb-16'>
      <h2 className='text-foreground text-lg font-medium'>
        Части{' '}
        <span className='text-light-gray font-normal'>
          {selectedParts.length === 0 ? '(все)' : `(${selectedParts.length})`}
        </span>
      </h2>
      <div className='grid gap-3 sm:grid-cols-2'>
        {parts.map((part) => (
          <PartCard
            key={part.id}
            partId={part.id}
            title={part.title}
            questionsCount={partsWithCounts.get(part.id) ?? 0}
            isSelected={selectedParts.includes(part.id)}
            onToggle={() => onTogglePart(part.id)}
          />
        ))}
      </div>
    </div>
  )
}
