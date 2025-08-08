import { cn } from '@/lib/utils'
import React from 'react'

interface IHeadingProps {
  children: React.ReactNode
  className?: string
}

const Heading = ({ children, className = '' }: IHeadingProps) => {
  return (
    <h1 className={cn('text-2xl lg:text-3xl font-bold', className)}>
      {children}
    </h1>
  )
}

export default Heading
