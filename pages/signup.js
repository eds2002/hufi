import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button, Input } from '../components/elements'
import Link from 'next/link'
import signupBackground from '../assets/signup.svg'
import { storefront } from '../utils/storefront'
import { createCustomer } from '../graphql/mutations/createCustomer'
import { useRouter } from 'next/router'
import { createUserAccessToken } from '../graphql/mutations/createUserAccessToken'
import { getCookie } from 'cookies-next'
import Head from 'next/head'
import Layout from '../components/global/Layout'
import { viewMenu } from '../graphql/queries/viewMenu'
import { getCustomer } from '../graphql/queries/getCustomer'


const Signup = ({pageProps}) => {
  const router = useRouter()
  const [checkbox,setCheckbox] = useState(false)
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
      autoComplete:"email",
    },
    {
      id:4,
      name:"password",
      required:true,
      placeholder:"Password",
      type:"password",
      autoComplete:"new-password"
    },
    {
      id:5,
      name:"confirmPassword",
      required:true,
      placeholder:"Confirm",
      type:"password",
      autoComplete:"new-password",
      error:undefined,
    },
  ])
  const [values, setValues] = useState({})

  const onChange =  (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(values.password != values.confirmPassword){
      setInputs(current=> current.map(obj=>{
        if(obj.id == 4){
          return {...obj, error:'Passwords do not match, try again.'}
        }
        return obj
      }))
    }else{
      setInputs(current=> current.map(obj=>{
        if(obj.id == 4){
          return {...obj, error:undefined}
        }
        return obj
      }))
    }
    
    const {data, errors} = await storefront(createCustomer,{input:{firstName:values.firstName,lastName:values.lastName, email:values.email, password:values.password, acceptsMarketing:checkbox}})
    if(errors){
      setInputs(current=> current.map(obj=>{
        if(obj.id == 3){
          return {...obj, error:errors}
        }
        return obj
      }))
      return
    }

    // CREATES USER ACCESSTOKEN
    const {data:accessToken,errors:accessTokenError} = await storefront(createUserAccessToken,{input:{email:values.email,password:values.password}})


    // ENABLES USER ACCOUNT
    // const {data:activated, errors:activatedErrors} = await storefront(activateUser,{id:data.customerCreate.customer.id, input:{activationToken:accessToken.customerAccessTokenCreate.customerAccessToken.accessToken, password:values.password}})


    // if(data.customerCreate.customerUserErrors.length == 1){
    //   setInputs(current=> current.map(obj=>{
    //     if(obj.id == 3){
    //       return {...obj, error:data.customerCreate.customerUserErrors[0].message}
    //     }
    //     return obj
    //   }))
    //   return
    // }

    const response = await fetch('/api/storeToken',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({token:accessToken.customerAccessTokenCreate.customerAccessToken.accessToken,expires:accessToken.customerAccessTokenCreate.customerAccessToken.expiresAt})
    })

    const {code} = await response.json()
    if(code == 302){
      router.push(`/activate?access=${accessToken.customerAccessTokenCreate.customerAccessToken.accessToken}&expires=${accessToken.customerAccessTokenCreate.customerAccessToken.expiresAt}`)
    } 
  }

  return (
    <>
      <Head>
        <meta charSet='UTF-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
        <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
        <title>Hufi - Support & Refunds</title>
        <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>
      </Head>
      <Layout {...pageProps}>
        <section>
          <div className = "relative flex flex-col items-center justify-center w-full h-screen px-4 mx-auto">
            <div className = "absolute inset-0">
              <div className = "absolute inset-0 z-10 bg-black/25"/>
              <Image src = {signupBackground} layout = 'fill' objectFit="cover" className  = "w-full h-full"/>
            </div>
            <div className = "z-10 flex justify-center w-full">
              <div className = "z-10 w-full max-w-lg shadow-xl bg-surface p-7 rounded-xl">
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
                          {input.id >= 3 && (
                            <Input {...input} onChange = {onChange}/>
                          )}
                      </>
                    ))}
                  </div>
                  <div className = 'flex items-start gap-x-3'>
                    <input className = "flex-1" type = "checkbox" name = "acceptsEmailMarketing" value = {checkbox} onChange = {()=>setCheckbox(!checkbox)} />
                    <label className = "text-sm text-onSurface/70">
                      Yes, I would like to receive emails about trending products, offers, and discounts. You can cancel your subscription at any time.  
                    </label>
                  </div>
                  <div className = "mt-6">
                    <Button text = 'Use my benefits'/>
                  </div>
                  <div className = "w-full h-full mt-2 text-xs font-medium text-onSurface/60">
                    <a>Already have an account?{' '}
                      <Link href = "/login">
                        <span className = "cursor-pointer text-tertiaryVariant">Login</span>
                      </Link>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps({req,res}){
  // For layout
  const cookies = req?.cookies?.userAccess
  let pageProps = {}
  const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
  const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
  const {data:userInformation} = await storefront(getCustomer,{token:cookies || "randomletters"})
  pageProps["headerData"] = headerData || null
  pageProps["footerData"] = footerData || null
  pageProps["userData"] = userInformation || null
  pageProps["userAccess"] = cookies || null


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
      props:{pageProps:pageProps}
    }
  }
}

export default Signup