import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

const nodes = [
  { label: 'وصول', status: 'ok' as const, note: 'انطباع أول واضح' },
  { label: 'فهم القيمة', status: 'ok' as const, note: 'العرض مفهوم' },
  { label: 'تفكير', status: 'warn' as const, note: 'يبحث عن ضمانات' },
  { label: 'دفع', status: 'risk' as const, note: '6 خطوات طويلة' },
  { label: 'إكمال', status: 'ok' as const, note: 'تأكيد سريع' },
]

const colorMap = {
  ok: { ring: 'ring-ok/30', bg: 'bg-ok/15', text: 'text-ok', icon: CheckCircle2 },
  warn: { ring: 'ring-warn/30', bg: 'bg-warn/15', text: 'text-warn', icon: AlertTriangle },
  risk: { ring: 'ring-bad/30', bg: 'bg-bad/15', text: 'text-bad', icon: XCircle },
}

export function MiniFlow() {
  return (
    <div className="card relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-0 grid-soft-bg opacity-60" aria-hidden="true" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-dim">معاينة مصغرة</p>
            <h3 className="mt-1 font-display text-lg font-semibold">رحلة مستخدم — تطبيق توصيل</h3>
          </div>
          <span className="chip">مثال</span>
        </div>

        <div className="relative mt-8">
          <div className="absolute right-4 left-4 top-5 h-px bg-gradient-to-l from-transparent via-line to-transparent" />
          <div className="relative grid grid-cols-5 gap-2">
            {nodes.map((n, i) => {
              const c = colorMap[n.status]
              const Icon = c.icon
              return (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ring-4 ${c.ring} ${c.bg}`}
                  >
                    <Icon size={16} className={c.text} />
                  </div>
                  <div className="mt-2 text-[12px] font-medium text-text">{n.label}</div>
                  <div className="mt-1 hidden text-[11px] text-text-dim sm:block">{n.note}</div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-5">
          <Stat label="الوضوح" value={82} tone="ok" />
          <Stat label="الثقة" value={61} tone="warn" />
          <Stat label="التحويل" value={48} tone="bad" />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'ok' | 'warn' | 'bad' }) {
  const colors = {
    ok: 'bg-ok',
    warn: 'bg-warn',
    bad: 'bg-bad',
  }
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-text-dim">{label}</span>
        <span className="font-display text-sm font-semibold text-text">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${colors[tone]}`}
        />
      </div>
    </div>
  )
}
