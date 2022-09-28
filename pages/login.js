import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/elements'
import Link from 'next/link'
import loginBackground from '../assets/login.svg'
import { storefront } from '../utils/storefront'
import { createUserAccessToken } from '../graphql/mutations/createUserAccessToken'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import Head from 'next/head'

const Login = () => {
  const router = useRouter()
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

  const [values, setValues] = useState({})

  const onChange =  (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const {data, errors} = await storefront(createUserAccessToken,{input:{email:values.email,password:values.password}})
    if(data?.customerAccessTokenCreate?.customerAccessToken?.accessToken){
      const response = await fetch('/api/storeToken',{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({token:data.customerAccessTokenCreate.customerAccessToken.accessToken,expires:data.customerAccessTokenCreate.customerAccessToken.expiresAt})
      })

      const {code} = await response.json()
      if(code == 302){
        router.push('/')
      }
    }else{
      alert('Sorry, issue logging in.')
    }
  }

  return (
    <>
      <Head>
        <meta charSet='UTF-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
        <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
        <title>Hufi - Login</title>
        <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>
      </Head>
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
    </>
  )
}



export async function getServerSideProps({req,res}){
  const cookie = getCookie('userAccess',{req,res})
  if(cookie){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }else{
    return{
      props:{}
    }
  }
}

export default Login