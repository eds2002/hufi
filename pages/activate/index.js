import React from 'react'
import { getCookies, getCookie, setCookie, removeCookies } from 'cookies-next';
import { getCustomer } from '../../graphql/queries/getCustomer';
import { accessTokenRenew } from '../../graphql/queries/accessTokenRenew';
import { storefront } from '../../utils/storefront';
import Link from 'next/link';
import { Button } from '../../components/elements';
import svg from '../../assets/successfulSignup.svg'
import Image from 'next/image';

const index = () => {
  return (
    <section className = "flex items-center justify-center w-full h-screen pb-16 ">
      <div className = "relative z-10 h-auto max-w-xl p-6 px-4 shadow-xl rounded-xl bg-background backdrop-blur-md">
        <h1 className = "max-w-sm mb-5 text-3xl font-medium text-onSurface">It only goes up from here.</h1>
        <p className = "max-w-md mb-7 text-onBackground/70">
          You have successfully created an account with Hufi! We hope to be able to 
          provide a wonderful experience for you. Enjoy using your benefits!
        </p>
        <div className = "flex gap-3 w-[70%]">
          <Link href = "/">
            <Button text = 'Start Shopping'/>
          </Link>
          <Link href = "/hufi-rewards-member">
            <Button text = 'View my benefits' CSS = " border border-black"/>
          </Link>
        </div>
      </div>
      <div className = "absolute inset-0 ">
        <Image src = {svg} layout = 'fill' objectFit='cover'/>
      </div>
    </section>
  )
}

export default index

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;

  const expireDate = new Date(query.expires)
  setCookie('userAccess', query.access, { req, res, maxAge: expireDate, httpOnly:true });


  return{
    props:{}
  }
}