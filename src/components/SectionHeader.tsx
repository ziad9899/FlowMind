interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'start' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'start',
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-brand">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[26px] font-bold leading-tight text-text sm:text-[32px]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[15px] leading-8 text-text-dim text-pretty">{description}</p>
      )}
    </div>
  )
}
