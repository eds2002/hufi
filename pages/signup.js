import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/elements'

const signup = () => {
  const [inputs,setInputs] = useState([
    {
      id:1,
      name:"email",
      required:true,
      placeholder:"Email",
      type:"email",
    },
    {
      id:2,
      name:"password",
      required:true,
      placeholder:"Password",
      type:"password",
    },
    {
      id:3,
      name:"confirm-password",
      required:true,
      placeholder:"Confirm Password",
      type:"password",
      error:undefined,
    },
  ])
  const values = []

  const onChange = (e) =>{
    values[e.target.name] = e.target.value
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(values.password != values.confirmPassword){
      setInputs(current=> current.map(obj=>{
        if(obj.id === 3){
          return {...obj, error:'Passwords do not match, try again.'}
        }
        return obj
      }))
      return
    }
    setInputs(current=> current.map(obj=>{
      if(obj.id === 3){
        return {...obj, error:undefined}
      }
      return obj
    }))

  }

  return (
    <section>
      <div className = "flex flex-col items-center justify-center w-full h-screen px-4 mx-auto">
        <div className = "absolute inset-0">
          <div className = "grid w-full h-full grid-cols-8">
            <div className = "flex flex-col items-center justify-center col-span-3">
              <div className = "w-full max-w-sm px-4">
                <h1 className = "text-3xl font-medium sm:text-3xl lg:text-4xl">Sign up</h1>
                <p className = "text-base text-left xl:text-lg text-onBackground/80">You're a couple steps away from being a rewards member.</p>
                <form className = "w-full bg-white" onSubmit={(e)=>handleSubmit(e)}>
                  {inputs.map((props,key)=>(
                    <Input onChange={onChange} {...props} key = {key}/>
                  ))}

                  <div className = "mt-4">
                    <Button text = "Next"/>
                  </div>
                </form>
              </div>
            </div>
            <div className = "relative w-full h-full col-span-5">
              <Image src = "https://images.pexels.com/photos/6778208/pexels-photo-6778208.jpeg?cs=srgb&dl=pexels-heyy-kazz-6778208.jpg&fm=jpg" layout = 'fill' objectFit='cover'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default signup