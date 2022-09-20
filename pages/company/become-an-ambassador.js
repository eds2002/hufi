import React from 'react'
import Image from 'next/image'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

const Ambassador = () => {
  return (
    <main>
      <section className = "relative flex w-full h-screen">
        <div className = "grid w-full h-full grid-cols-12 grid-rows-2 gap-6 min-w-[1200px]">
          {/* ROW 1 */}
          <div className = "relative col-span-4 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?cs=srgb&dl=pexels-lumn-406014.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>
          <div className = "relative col-span-6 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/13315272/pexels-photo-13315272.jpeg?cs=srgb&dl=pexels-b%C3%BC%C5%9Franur-ayd%C4%B1n-13315272.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>
          <div className = "relative col-span-2 row-span-2 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?cs=srgb&dl=pexels-lumn-322207.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>

          {/* ROW 2 */}
          <div className = "relative col-span-2 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?cs=srgb&dl=pexels-konstantin-mishchenko-1926769.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>
          <div className = "relative col-span-3 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?cs=srgb&dl=pexels-victoria-akvarel-1620760.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>
          <div className = "relative col-span-5 overflow-hidden rounded-xl">
            <Image src = {"https://images.pexels.com/photos/6157229/pexels-photo-6157229.jpeg?cs=srgb&dl=pexels-cottonbro-6157229.jpg&fm=jpg"} layout = 'fill' objectFit = 'cover'/>
          </div>

        </div>
        <div className = "absolute inset-0 flex items-center justify-center px-4 mx-auto max-w-7xl">
          <div className = "max-w-md px-6 py-10 text-onSurface bg-surface/50 backdrop-blur-xl rounded-xl">
            <h1 className = "text-3xl font-medium">Become a Hufi ambassador!</h1>
            <p className = "mt-3 lg:text-lg">Now offering ambassador positions, in return, we&apos;ll gift you discounts and free items every month.</p>
            <p className = "mt-10 lg:text-lg"> Enter your email and we&apos;ll message you as soon as we can!</p>
            <form onSubmit={(e)=>e.preventDefault()} className = "flex items-center justify-center w-full h-full mt-4">
              <input className = "w-full px-4 py-2 bg-transparent border-t-2 border-b-2 border-l-2 border-onSurface rounded-tl-md rounded-bl-md focus:outline-none focus:border-white/50" placeholder="Email"/>
              <div className = "h-full">
                <button className = "flex items-center justify-center h-full px-4 py-2 transition rounded-tr-md rounded-br-md bg-secondaryVariant hover:bg-secondary hover:shadow-md">
                  <PaperAirplaneIcon className = "w-7 h-7"/>
                </button>
              </div>
            </form>
            <a className = "mt-1 text-sm underline cursor-pointer text-onSurface/60">What&apos;s an ambassador?</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Ambassador