import { IconHome } from '@/shared/components/icons'
import Link from 'next/link'

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">404</h1>
      <h2 className="mb-5">Page not found</h2>
      <Link
        className="flex items-center gap-2 hover:text-primary hover:transition-all"
        href={'/'}
      >
        <IconHome /> <span>Return homepage</span>
      </Link>
    </div>
  )
}

export default PageNotFound
