import React from 'react'
import { Button } from '../elements'
import Link from 'next/link'

const Signup = () => {
  return (
    <section className = "relative px-4 py-16 mx-auto overflow-hidden max-w-7xl rounded-xl">
      <div className = "w-full px-4 bg-black rounded-xl ">
        <div className = "flex flex-col items-start justify-center w-full h-full px-4 py-6 md:py-12">
          <h1 className = "mt-2 text-2xl font-semibold sm:text-3xl md:text-4xl text-onSecondary">Hufi Rewards Member</h1>
          <p className = "max-w-sm mt-2 text-sm sm:text-base lg:text-lg text-onSecondary/80">Sign up today for exclusive monthly rewards. Exclusive members also don&apos;t pay for shipping.</p>
          <div className = "max-w-lg ">
            <Link href = "/signup">
              <Button text = 'Sign up today' CSS = 'px-4 mt-4 bg-background py-2 hover:bg-surface text-onBackground' tag = 'sign-up-button'/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup