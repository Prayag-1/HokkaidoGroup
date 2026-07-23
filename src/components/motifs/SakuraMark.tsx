import type { SVGProps } from 'react'

export function SakuraMark(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 5.25c1.8 0 2.9 1.3 3.35 2.8.4 1.3 1.35 2.1 2.65 2.35 1.6.3 2.75 1.45 2.75 3.1 0 1.7-1.2 2.8-2.85 3.1-1.35.25-2.2 1.05-2.6 2.35-.45 1.5-1.55 2.8-3.3 2.8s-2.85-1.25-3.3-2.8c-.4-1.3-1.25-2.1-2.6-2.35-1.65-.3-2.85-1.4-2.85-3.1 0-1.65 1.15-2.8 2.75-3.1 1.3-.25 2.25-1.05 2.65-2.35.45-1.5 1.55-2.8 3.35-2.8Z" />
      <path d="M12 8.5c-1.15 1.1-1.9 2.55-1.9 4 0 1.75.95 3.2 1.9 4.05.95-.85 1.9-2.3 1.9-4.05 0-1.45-.75-2.9-1.9-4Z" />
      <path d="M8.1 10.2c1.5.25 2.75 1.05 3.9 2.3 1.15-1.25 2.4-2.05 3.9-2.3" />
    </svg>
  )
}
