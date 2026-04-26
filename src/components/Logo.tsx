interface LogoProps {
  size?: number
  showText?: boolean
  subtitle?: 'en' | 'ar' | 'none'
}

export function Logo({ size = 32, showText = true, subtitle = 'en' }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="0.5" y="0.5" width="39" height="39" rx="9" fill="#0E1424" stroke="#1F2A3D" />
        <path
          d="M7 27 C 13 27, 13 13, 20 13 S 27 27, 33 27"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="7" cy="27" r="2" fill="#9CA3AF" />
        <circle cx="20" cy="13" r="2" fill="#9CA3AF" />
        <g>
          <circle cx="33" cy="27" r="3" fill="#38BDF8" />
          <circle cx="33" cy="27" r="5" fill="none" stroke="#38BDF8" strokeOpacity="0.35" />
        </g>
      </svg>

      {showText && (
        <div className="leading-tight">
          <div className="font-display text-[17px] font-bold tracking-tight text-text">
            FlowMind
          </div>
          {subtitle !== 'none' && (
            <div className="text-[11px] text-text-dim">
              {subtitle === 'en' ? 'UX Decision Simulator' : 'محاكي قرار المستخدم'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
