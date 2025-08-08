import React from 'react'

const LoadingOutline = () => {
  return (
    <div>
      {/* progress bar */}
      <div className="h-3 w-full rounded-full mb-2 skeleton" />
      {/* lesson content */}
      <div className="flex flex-col gap-5">
        <div className="skeleton w-full h-14 rounded-lg" />
        <div className="skeleton w-full h-14 rounded-lg" />
      </div>
    </div>
  )
}

export default LoadingOutline
