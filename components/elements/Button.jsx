import React from 'react'

const Button = ({CSS, text}) => {
  return (
    <button className = {`
    flex w-full items-center justify-center rounded-sm border border-transparent bg-secondary2 px-8 py-1 text-base font-medium text-primary1 hover:bg-secondary1  md:px-10 md:text-lg transition py-2
    ${CSS}    
    `}>
      {text}
    </button>
  )
}

export default Button