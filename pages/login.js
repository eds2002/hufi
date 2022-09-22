import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/elements'
import Link from 'next/link'
import loginBackground from '../assets/login.svg'

const Login = () => {
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
      <div className = "relative flex flex-col items-center justify-center w-full h-screen px-4 mx-auto">
        <div className = "absolute inset-0">
          <div className = "absolute inset-0 z-10 bg-black/25"/>
          <Image src = {loginBackground} layout = 'fill' objectFit="cover" className  = "w-full h-full"/>
        </div>
        <div className = "z-10 flex justify-center w-full">
          <div className = "z-10 w-full max-w-lg shadow-xl bg-surface p-7 rounded-xl">
            <h1 className = "text-3xl font-medium sm:text-3xl lg:text-4xl">Login</h1>
            <p className = "max-w-sm mt-2 text-base text-left xl:text-lg text-onBackground/70">Hi, welcome back! We&apos;re happy to see you again.</p>
            <form className = "w-full max-w-md mt-7" onSubmit={(e)=>handleSubmit(e)}>
              {inputs.map((input,key)=>(
                <Input {...input} onChange = {onChange} key = {key}/>
              ))}
              <div className = "mt-6">
                <Button text = 'Login'/>
              </div>
              <div className = "w-full h-full mt-2 text-xs font-medium text-onSurface/60">
                <a>Need an account?{' '}
                  <Link href = "/signup">
                    <span className = "cursor-pointer text-tertiaryVariant">Signup</span>
                  </Link>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login