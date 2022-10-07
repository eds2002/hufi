import { StarIcon } from '@heroicons/react/20/solid'
import React from 'react'

const StarsComponent = () => {
  return (
    <div>
      {[0,1,2,3,4].map(()=>(
        <StarIcon/>
      ))}
    </div>
  )
}

export default StarsComponent