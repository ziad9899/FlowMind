interface StepHeaderProps {
  index: number
  total: number
  title: string
  hint?: string
}

export function StepHeader({ index, total, title, hint }: StepHeaderProps) {
  const pct = Math.round((index / total) * 100)
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-text-dim">
        <span>الخطوة {index} من {total}</span>
        <span>{pct}% مكتمل</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-ink-800">
        <div
          className="h-full rounded-full bg-brand transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <h2 className="mt-7 font-display text-[22px] font-semibold leading-snug text-text sm:text-[26px]">
        {title}
      </h2>
      {hint && <p className="mt-2 text-[14px] leading-7 text-text-dim">{hint}</p>}
    </div>
  )
}
