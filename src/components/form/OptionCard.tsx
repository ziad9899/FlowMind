import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  title: string
  description?: string
  icon?: ReactNode
  compact?: boolean
}

export function OptionCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  compact,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative w-full rounded-2xl border bg-ink-800/50 p-4 text-right transition-all duration-150 ${
        selected
          ? 'border-brand bg-brand/5 shadow-ring'
          : 'border-line hover:border-ink-600 hover:bg-ink-800/80'
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon && (
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                selected ? 'bg-brand/15 text-brand' : 'bg-ink-700/60 text-text-dim'
              }`}
            >
              {icon}
            </div>
          )}
          <div>
            <div className={`font-medium text-text ${compact ? 'text-[14px]' : 'text-[15px]'}`}>
              {title}
            </div>
            {description && (
              <div className="mt-0.5 text-[13px] leading-6 text-text-dim">{description}</div>
            )}
          </div>
        </div>
        <div
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
            selected ? 'border-brand bg-brand text-ink-950' : 'border-line text-transparent'
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </div>
      </div>
    </button>
  )
}
