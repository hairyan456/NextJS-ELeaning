import React, { ComponentProps } from 'react'

const IconArrowRight = (props: ComponentProps<'svg'>) => {
  return (
    <svg
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconArrowRight
