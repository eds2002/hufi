import { useState } from "react"

const Input = ({onChange,error, ...props}) => {
  const [focused,setFocused] = useState(false)
  return (
    <div className = "w-full mb-4">
      <input className = {`
        bg-transparent w-full px-4 py-2 transition border-2 rounded-full border-neutral-400 focus:border-black focus:ring-0 focus:outline-none ${focused && 'invalid:border-tertiaryVariant'}
        ${error && ('border-tertiaryVariant focus:border-tertiaryVariant')}
      `}
        onChange={(e)=>onChange(e)}
        {...props}
        onBlur={()=>setFocused(true)}
      />
      <span className = "text-sm text-red-500">{error}</span>
    </div>
  )
}

export default Input