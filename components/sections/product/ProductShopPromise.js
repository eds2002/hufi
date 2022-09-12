import { CheckBadgeIcon, HeartIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/20/solid'
import React from 'react'

const ProductShopPromise = () => {
  return (
    <section className = "w-full py-24 bg-surface">
      <div className = 'flex flex-col items-center justify-center px-4 mx-auto max-w-7xl'>
        <div className = "flex flex-col items-center justify-center">
          <h1 className = "flex items-center justify-center max-w-md text-3xl font-bold text-center sm:text-4xl ">
            <span>Trusted by many</span>{''}
            <span><HeartIcon className = "w-10 h-10 text-tertiaryVariant"/></span>
          </h1>
          <p className = "max-w-md mt-4 text-sm font-light text-center sm:text-base">Dont worry, we know how hard it can be buying online. Let&apos;s ease some of your worries, this is what we&apos;re known for.</p>
          <div className = "flex flex-col items-center h-full max-w-4xl p-6 mt-10 rounded-md shadow-2xl md:flex-row md:items-start">
            <div className="flex flex-col items-center justify-center w-[300px] text-center p-6">
              <ShoppingBagIcon className = "mb-4 w-14 h-14 text-primaryVariant"/>
              <p className = "text-sm font-light">Broken upon arrival? Broken within 30 days? We&apos;ll refund you 100%, no questions asked.</p>
            </div>
            <div className="flex flex-col items-center w-[300px] text-center p-6">
              <CheckBadgeIcon className = "mb-4 w-14 h-14 text-primaryVariant"/>
              <p className = "text-sm font-light">We have some high standards. All of our products are quality ensured.</p>
            </div>
            <div className="flex flex-col items-center  w-[300px] text-center p-6">
              <TruckIcon className = "mb-4 w-14 h-14 text-primaryVariant"/>
              <p className = "text-sm font-light">Pleased to tell you we ship worldwide. And quick too.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShopPromise