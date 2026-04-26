import { motion } from 'framer-motion'

interface ScoreBarProps {
  label: string
  value: number
  hint?: string
}

function toneFor(value: number): string {
  if (value >= 75) return '#10B981'
  if (value >= 55) return '#38BDF8'
  if (value >= 40) return '#F59E0B'
  return '#EF4444'
}

export function ScoreBar({ label, value, hint }: ScoreBarProps) {
  const color = toneFor(value)
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="text-[14px] font-medium text-text">{label}</div>
          {hint && <div className="text-[12px] text-text-mute">{hint}</div>}
        </div>
        <div className="font-display text-lg font-semibold tabular-nums" style={{ color }}>
          {value}%
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700/70">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
