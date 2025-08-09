import { cn } from '@/lib/utils'

interface IHeadingProps {
  children: React.ReactNode
  className?: string
}

const Heading = ({ children, className = '' }: IHeadingProps) => {
  return (
    <h1 className={cn('text-2xl font-bold lg:text-3xl', className)}>
      {children}
    </h1>
  )
}

export default Heading
