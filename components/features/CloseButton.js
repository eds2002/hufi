import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

const CloseButton = ({onClick,color,padding}) => {
  return (
    <div 
      className = {`
      ${color ? color : 'text-onBackground'}
      ${padding ? `p-${padding}` : 'mt-4 mr-4'}
      absolute top-0 right-0 cursor-pointer hover:text-onBackground/60 transition z-10
      `}
      onClick = {onClick}
    >
      <XMarkIcon className = "w-6 h-6"/>
    </div>
  )
}

export default CloseButton