import React from 'react'
import { Button } from '../elements'

const Signup = () => {
  return (
    <section className = "bg-background">
      <div className = "w-full h-[50vh] max-w-7xl mx-auto rounded-md px-4">
        <div className = "flex flex-col items-start justify-center w-full h-full px-6 bg-primary">
          {/* <span className = "px-2 text-sm font-medium rounded-full bg-tertiary/50 text-tertiaryVariant">Exclusives club</span> */}
          <h1 className = "mt-2 text-4xl font-semibold">Hufi Rewards Member</h1>
          <p className = "max-w-sm mt-2 text-base sm:text-base lg:text-lg text-onPrimary/80">Sign up today for exclusive monthly rewards. Exclusive members also don&apos;t pay for shipping.</p>
          <div className = "max-w-lg ">
            <Button text = 'Sign up today' CSS = 'px-4 mt-4' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup