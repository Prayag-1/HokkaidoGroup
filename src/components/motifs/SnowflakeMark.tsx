import type { SVGProps } from 'react'

export function SnowflakeMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3v18" />
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
      <path d="M7.5 4.5 12 9l4.5-4.5" />
      <path d="M7.5 19.5 12 15l4.5 4.5" />
      <path d="M3 12h18" />
    </svg>
  )
}
