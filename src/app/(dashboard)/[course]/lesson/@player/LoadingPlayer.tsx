import React from 'react'

const LoadingPlayer = () => {
  return (
    <div>
      <div className="aspect-video rounded-lg skeleton mb-5" />
      <div className="flex gap-3 mb-5">
        <div className="size-10 rounded-lg skeleton" />
        <div className="size-10 rounded-lg skeleton" />
      </div>
      <div className="w-full h-9 mb-10 skeleton" />
    </div>
  )
}

export default LoadingPlayer
