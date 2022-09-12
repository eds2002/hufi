import React from 'react'

const Button = ({CSS, text,onClick}) => {
  return (
    <button className = {`
    flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryVariant px-8  text-base font-medium text-onSecondary hover:bg-secondary  md:px-10 md:text-lg transition py-2
    ${CSS}    
    `}
    onClick = {onClick}
    >
      {text}
    </button>
  )
}

export default Button