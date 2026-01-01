interface QuestionCountSliderProps {
  value: number
  maxValue: number
  onChange: (value: number) => void
}

export function QuestionCountSlider({
  value,
  maxValue,
  onChange,
}: QuestionCountSliderProps) {
  const isAllQuestions = value === 999

  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <label className='text-foreground text-lg'>Количество вопросов</label>
        <span className='text-primary text-xl font-bold'>
          {isAllQuestions ? `Все (${maxValue})` : value}
        </span>
      </div>
      <input
        type='range'
        min={5}
        max={55}
        step={5}
        value={isAllQuestions ? 55 : value}
        onChange={(e) => {
          const val = Number(e.target.value)
          onChange(val === 55 ? 999 : val)
        }}
        className='accent-primary w-full cursor-pointer border-none'
      />
    </div>
  )
}
