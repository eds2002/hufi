import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'

const CloseButton = ({onClick,color,padding}) => {
  return (
    <div 
      className = {`
      ${color ? color : 'text-onBackground'}
      ${padding ? padding : 'mt-4 mr-4'}
      absolute top-0 right-0 cursor-pointer hover:text-onBackground/60 transition
      `}
      onClick = {onClick}
    >
      <XMarkIcon className = "w-6 h-6"/>
    </div>
  )
}

export default CloseButton