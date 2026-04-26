import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import type { JourneyStep } from '../../lib/types'

const config = {
  ok: { icon: CheckCircle2, color: '#10B981', label: 'سلسة' },
  warn: { icon: AlertTriangle, color: '#F59E0B', label: 'تحتاج انتباه' },
  risk: { icon: XCircle, color: '#EF4444', label: 'نقطة تسريب' },
} as const

interface JourneyTimelineProps {
  steps: JourneyStep[]
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-text">رحلة المستخدم المتوقعة</h3>
          <p className="mt-1 text-sm text-text-dim">
            ست لحظات يمر بها أي مستخدم. كل لحظة قد تبني الثقة أو تكسرها.
          </p>
        </div>
        <Legend />
      </div>

      <ol className="relative">
        <div
          className="absolute right-[19px] top-2 bottom-2 w-px bg-line"
          aria-hidden="true"
        />
        {steps.map((s, i) => {
          const c = config[s.status]
          const Icon = c.icon
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="relative flex gap-4 py-3"
            >
              <div
                className="z-10 mt-0.5 flex h-10 w-10 items-center justify-center rounded-full ring-4"
                style={{ background: c.color + '22', color: c.color, boxShadow: '0 0 0 4px #0E1424' }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 rounded-xl border border-line bg-ink-900/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-text">{s.label}</div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px]"
                    style={{ background: c.color + '15', color: c.color }}
                  >
                    {c.label}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-7 text-text-dim">{s.note}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

function Legend() {
  return (
    <div className="hidden items-center gap-3 sm:flex">
      {(['ok', 'warn', 'risk'] as const).map((k) => {
        const c = config[k]
        return (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 text-[11px] text-text-dim"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: c.color }}
            />
            {c.label}
          </span>
        )
      })}
    </div>
  )
}
