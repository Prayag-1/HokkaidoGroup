import type { SVGProps } from 'react'

export function RiceStalkMark(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 20V4" />
      <path d="M12 7.5c-1.6-.2-3-.9-4.1-2" />
      <path d="M12 10c-1.8 0-3.3-.7-4.6-2" />
      <path d="M12 12.5c-1.8 0-3.6-.7-5.1-2.1" />
      <path d="M12 7.5c1.6-.2 3-.9 4.1-2" />
      <path d="M12 10c1.8 0 3.3-.7 4.6-2" />
      <path d="M12 12.5c1.8 0 3.6-.7 5.1-2.1" />
      <path d="M9.2 20h5.6" />
    </svg>
  )
}
