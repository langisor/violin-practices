export function BowGlyph({ filled }: { filled: boolean }) {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" className="shrink-0">
      <path
        d="M2 12 C 8 2, 26 2, 32 12"
        fill="none"
        stroke={filled ? "#C9932B" : "#5B6660"}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="2" cy="12" r="1.6" fill={filled ? "#C9932B" : "#5B6660"} />
      <circle cx="32" cy="12" r="1.6" fill={filled ? "#C9932B" : "#5B6660"} />
    </svg>
  );
}