import React from 'react'


interface iButton{
  CSS?:string;
  text:string;
  onClick?:(val:any)=>void;
  tag?:string;
}

const Button:React.FC<iButton> = ({CSS, text,onClick,tag}) => {
  return (
    <button className = {`
    hover:shadow-md flex w-full items-center justify-center rounded-full  transition
    ${CSS ? CSS : 'bg-secondaryVariant text-base  text-onSecondary hover:bg-secondary py-2'}    
    ${tag ? tag : ''}
    `}
    onClick = {onClick}
    >
      {text}
    </button>
  )
}

export default Button