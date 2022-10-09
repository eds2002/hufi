import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'

const StarsComponent = ({starRating}) => {
  return (
    <span className = "flex">
      {[0,1,2,3,4].map((index)=>(
        <StarIcon 
          className = {`w-[18px] h-[18px] ${index > Math.round(starRating - 1 ) ? 'text-secondaryVariant/25' : 'text-secondaryVariant' }`}
          key = {index}
        />
      ))}
    </span>
  )
}

export default StarsComponent