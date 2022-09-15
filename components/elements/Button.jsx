import React from 'react'

const Button = ({CSS, text,onClick}) => {
  return (
    <button className = {`
    hover:shadow-md flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryVariant text-base  text-onSecondary hover:bg-secondary transition py-2
    ${CSS}    
    `}
    onClick = {onClick}
    >
      {text}
    </button>
  )
}

export default Button