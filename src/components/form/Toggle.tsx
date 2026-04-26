interface ToggleProps {
  label: string
  description?: string
  value: boolean
  onChange: (next: boolean) => void
}

export function Toggle({ label, description, value, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border bg-ink-800/50 p-4 text-right transition-colors ${
        value ? 'border-brand/60 bg-brand/5' : 'border-line hover:border-ink-600'
      }`}
    >
      <div>
        <div className="text-[15px] font-medium text-text">{label}</div>
        {description && (
          <div className="mt-0.5 text-[13px] leading-6 text-text-dim">{description}</div>
        )}
      </div>
      <div
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          value ? 'bg-brand' : 'bg-ink-700'
        }`}
        role="presentation"
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-text transition-all ${
            value ? 'right-0.5' : 'right-[22px]'
          }`}
        />
      </div>
    </button>
  )
}
