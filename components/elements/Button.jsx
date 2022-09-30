import React from 'react'

const Button = ({CSS, text,onClick}) => {
  return (
    <button className = {`
    hover:shadow-md flex w-full items-center justify-center rounded-full  transition 
    ${CSS ? CSS : 'bg-secondaryVariant text-base  text-onSecondary hover:bg-secondary py-2'}    
    `}
    onClick = {onClick}
    >
      {text}
    </button>
  )
}

export default Button