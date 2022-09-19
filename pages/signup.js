import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/elements'

const Signup = () => {
  const [inputs,setInputs] = useState([
    {
      id:1,
      name:"firstName",
      required:true,
      placeholder:"First Name",
      type:"text",
    },
    {
      id:2,
      name:"lastName",
      required:true,
      placeholder:"Last Name",
      type:"lastName",
    },
    {
      id:3,
      name:"email",
      required:true,
      placeholder:"Email",
      type:"email",
    },
    {
      id:4,
      name:"password",
      required:true,
      placeholder:"Password",
      type:"password",
    },
    {
      id:5,
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
          <div className = "flex flex-col items-center justify-center h-full px-4">
            <div className = "flex flex-col-reverse w-full max-w-6xl gap-6 p-6 md:flex-row bg-surface rounded-xl">
              <div className = "flex-1">
                <h1 className = "text-3xl font-medium sm:text-3xl lg:text-4xl">Sign up</h1>
                <p className = "max-w-sm mt-2 text-base text-left xl:text-lg text-onBackground/70">You&apos;re a couple steps away from being a rewards member.</p>
                <form className = "w-full max-w-md mt-7" onSubmit={(e)=>handleSubmit(e)}>
                  <div className = "flex justify-between w-full gap-3 mt-3">
                    {inputs.map((input)=>(
                      <>
                          {input.id <= 2 && (
                            <Input {...input} onChange = {onChange} />
                          )}
                      </>
                    ))}
                  </div>
                  <div className = "">
                    {inputs.map((input)=>(
                      <>
                          {input.id > 2 && (
                            <Input {...input} onChange = {onChange}/>
                          )}
                      </>
                    ))}
                  </div>
                  <div className = 'flex items-start gap-x-3'>
                    <input type = "checkbox" name = "acceptsEmailMarketing"/>
                    <label className = "text-sm text-onSurface/70">
                      Yes, I would like to receive emails about trending products, offers, and discounts. You can cancel your subscription at any time.  
                    </label>
                  </div>
                  <div className = "mt-6">
                    <Button text = 'Use my benefits'/>
                  </div>
                </form>
              </div>
              <div className = "relative flex-1 hidden h-full overflow-hidden rounded-xl md:block">
                <div className = "absolute inset-0 z-10 flex items-center justify-center w-full h-full p-4 bg-black/20 ">
                  <div className = "flex flex-col items-center justify-center">
                    <h2 className = "text-base text-center lg:text-2xl md:text-xl text-background">Over 100,000 satisfied customers worldwide.</h2>
                    <p className = "text-sm text-center lg:text-lg md:text-base text-background/80">And that number is getting bigger everyday.</p>
                    <span className = "mt-4 text-sm font-medium text-left sm:text-base text-primaryVariant">Hufi</span>
                  </div>
                </div>
                <Image src = {"https://images.pexels.com/photos/4554395/pexels-photo-4554395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} layout = 'fill' objectFit="cover" className  = "w-full h-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup