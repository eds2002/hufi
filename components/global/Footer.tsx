import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { slugify } from "../../utils/slugify"
import Image from 'next/image'
import {useEffect, useState} from 'react'
import { Button } from "../elements"


interface iData{
  data:{
    menu:{
      handle:string;
      items:Array<{
        id:string;
        items:iItems[];
        title:string;
        url:string;
      }>
    }
  }
}

interface iItems{
  id:string;
  items:iItems[];
  title:string;
  url:string;
}

export default function Footer({data}:iData) {
  const [modal,setModal] = useState(false)
  const [responseResult,setResponseResult] = useState({})


  const handleSubmit = async (e:any) =>{
    const email = e.target.parentElement.email.value
    if(email === '') return

    const domain = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://www.hufistore.com'


    const response = await fetch(`${domain}/api/sendMail`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({email:email})
    }).then((data)=>data.json().catch((error)=> error))


    if(response){
      setModal(true)
      setResponseResult(response)
      e.target.parentElement.email.value = ""
    }
  }


  return (
    <>
      <footer className=" bg-secondaryVariant">
        <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
          <div className = 'pointer-events-none select-none'>
            <Image 
              src = "/HufiBlack.svg"
              width = {100}
              height = {100}
            />
          </div>
          <div className = "grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3">
            {data?.menu?.items.map((menu)=>(
              <nav className = "mb-10" key = {menu.title}>
                <p className = 'text-base font-medium text-onSecondary w-max'>{menu.title}</p>
                <ul className = "mt-2">
                {menu.items.map((subMenu)=>(
                  <Link href = {`/${slugify(menu.title)}/${slugify(subMenu.title === "help@hufisupport.com" ? '' : subMenu.title)}`} key = {subMenu.title}>
                    <li className = 'items-start my-1 text-sm cursor-pointer text-onSecondary/70 hover:text-onSecondary/40 w-max'>{subMenu.title}</li>
                  </Link>
                ))}
                </ul>
              </nav>
            ))}
            <form className = "flex-col items-start justify-start hidden w-full h-full max-w-xs text-sm md:text-base md:flex" onClick = {(e)=>e.preventDefault()}>
              <h5 className = "text-base font-medium text-onSecondary">Need a good read?</h5>
              <p className = "text-sm text-onSecondary/60"> Subscribe to learn more about future products and future discounts.</p>
              <form className = "relative flex w-full mt-4 border rounded-full">
                <input 
                  className = "w-full px-4 py-2 text-white bg-transparent border-t border-b border-l rounded-full border-onSecondary focus:outline-none focus:border-onBackground/50" 
                  placeholder="Email"
                  required={true}
                  type={'email'}
                  name = "email"
                />
                <button 
                  className = "absolute top-0 bottom-0 right-0 z-10 h-full px-4 transition border-2 rounded-full w-max hover:bg-onSecondary text-onSecondary hover:text-secondaryVariant"
                  onClick = {(e:any)=>handleSubmit(e)}
                >
                  <PaperAirplaneIcon className = "w-5 h-5 pointer-events-none"/>
                </button>
              </form>
            </form>
          </div>
          <div className = 'flex flex-col items-start justify-between w-full mt-8 md:items-center md:flex-row'>
            <p className="text-xs text-center text-onSecondary/70 ">&copy; 2022 Hufi, Inc. All rights reserved.</p>
            <div className = "flex flex-row items-start mt-10 md:items-center gap-x-4 md:mt-0 gap-y-4">
              <Link href = "/pages/terms-of-service">
                <a className = "text-xs text-onSecondary/70">Terms of Service</a>
              </Link>
              <Link href = "/pages/refund-policy">
                <a className = "text-xs text-onSecondary/70">Refund Policy</a>
              </Link>
              <Link href = "/pages/privacy-policy">
                <a className = "text-xs text-onSecondary/70">Privacy Policy</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <SuccessModal
      modal={modal}
      setModal={setModal}
      responseResult={responseResult}
      />
    </>
  )
}

interface iSuccessModalProps{
  modal:boolean;
  setModal:(value:boolean)=>void;
  responseResult:{
    code?:number;
    message?:string;
  }
}

function SuccessModal({modal,setModal,responseResult}:iSuccessModalProps){
  useEffect(()=>{
    if(modal){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = ""
    }
  },[modal])
  return(
    <>
    {modal && (
      <div className = "fixed inset-0 flex items-center justify-center bg-black/70  z-[9999]">
        <div className = "max-w-md p-6 w-max rounded-xl bg-background">
          <h6 className = "text-3xl font-semibold">
            {
            responseResult.message === "SUCCESS" 
              ? "You're in. " 
              : responseResult.message === "Member Exists" 
                ? "You're already subscribed"
                : "Something went wrong."
            }
          </h6>
          {responseResult.message === "SUCCESS" && (
            <p className = "mt-2 text-onBackground/70">
              You&apos;re our newest reader. We hope to be able to provide high quality reads for you. Check your email for our articles!
            </p>
          )}
          {responseResult.message === "Member Exists" && (
            <p className = "mt-2 text-onBackground/70">
              Woah, excited? It seems as if you are already subscribed to us. Error on our part? Message us at support@hufistore.com
            </p>
          )}
          {(responseResult.message != "Member Exists" && responseResult.message != "SUCCESS") && (
            <p className = "mt-2 text-onBackground/70">
              Something went terribly wrong, we apologize for this inconvenience. Please email us at support@hufistore.com.
            </p>
          )}
          <div className = "mt-7">
            <Button
              text = 'Back to home'
              onClick={()=>setModal(false)}
            />
          </div>
        </div>
      </div>
    )}
    </>
  )
}
