import { motion } from 'framer-motion'

interface ScoreGaugeProps {
  value: number
  size?: number
}

function gradeFor(value: number): { label: string; color: string; ring: string } {
  if (value >= 80) return { label: 'فكرة قوية', color: '#10B981', ring: 'rgba(16,185,129,0.2)' }
  if (value >= 65) return { label: 'فكرة جيدة', color: '#38BDF8', ring: 'rgba(56,189,248,0.18)' }
  if (value >= 45) return { label: 'فكرة تحتاج تحسينات', color: '#F59E0B', ring: 'rgba(245,158,11,0.2)' }
  return { label: 'فكرة بمخاطر عالية', color: '#EF4444', ring: 'rgba(239,68,68,0.22)' }
}

export function ScoreGauge({ value, size = 220 }: ScoreGaugeProps) {
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - value / 100)
  const grade = gradeFor(value)

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F2A3D"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={grade.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-display text-5xl font-bold text-text">{value}</div>
          <div className="mt-1 text-xs uppercase tracking-widest text-text-dim">من 100</div>
        </div>
      </div>
      <div
        className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
        style={{ borderColor: grade.ring, color: grade.color, background: grade.ring }}
      >
        {grade.label}
      </div>
    </div>
  )
}
