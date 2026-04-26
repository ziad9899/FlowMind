import { Minus, Plus } from 'lucide-react'

interface StepCounterProps {
  value: number
  min?: number
  max?: number
  onChange: (n: number) => void
}

export function StepCounter({ value, min = 1, max = 10, onChange }: StepCounterProps) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  let helper = 'رحلة قصيرة وسلسة.'
  let tone = 'text-ok'
  if (value === 4) {
    helper = 'رحلة على الحد المقبول.'
    tone = 'text-text-dim'
  } else if (value === 5) {
    helper = 'تقترب من الحد، أي عثرة قد تكلفك.'
    tone = 'text-warn'
  } else if (value >= 6) {
    helper = 'رحلة طويلة، يتوقع تخلٍّ كبير.'
    tone = 'text-bad'
  }

  return (
    <div>
      <div className="flex items-center justify-between rounded-2xl border border-line bg-ink-800/50 p-4">
        <button
          type="button"
          onClick={dec}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-900 text-text-dim transition-colors hover:border-ink-600 hover:text-text"
          aria-label="إنقاص"
        >
          <Minus size={16} />
        </button>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold text-text">{value}</span>
          <span className="text-sm text-text-dim">خطوات</span>
        </div>
        <button
          type="button"
          onClick={inc}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-900 text-text-dim transition-colors hover:border-ink-600 hover:text-text"
          aria-label="زيادة"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className={`mt-3 text-center text-sm ${tone}`}>{helper}</p>
    </div>
  )
}
