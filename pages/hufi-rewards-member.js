import React from 'react'
import { Button } from '../components/elements'
import Link from 'next/link'
import Image from 'next/image'
import img from '../assets/rewardsMember.svg'
import truck from '../assets/truck.svg'
import discount from '../assets/discount.svg'

const RewardsMember = () => {
  return (
    <main>
      <div className = "sticky z-10 w-full py-2 bg-surface/50 backdrop-blur-xl top-16">
        <div className = "flex items-center justify-between px-4 mx-auto max-w-7xl">
          <p className = "text-sm font-medium">Hufi Rewards Member</p>
          <Link href = "/signup">
            <Button text = 'Become a member' CSS={"w-auto px-4 py-1 rounded-full text-sm bg-secondaryVariant"}/>
          </Link>
        </div>
      </div>
      <section className = "relative flex items-center justify-center h-screen py-24"> 
        <div className = "absolute inset-0 opacity-50 pointer-events-none select-none">
          <Image src = {img} alt = "Abstract objects." layout = 'fill' objectFit='cover' />
        </div>
        <div className = "relative z-[1] flex flex-col items-center justify-center pb-16 text-center">
          <h1 className = "max-w-sm text-3xl font-medium md:max-w-xl sm:text-4xl lg:text-5xl">Hufi Rewards Member</h1>
          <p className = "max-w-md mt-2">The rewards are endless, and we&apos;re always adding more benefits for our loyal customers.</p>
          <div className = "mt-4 text-base xl:text-lg ">
            <Link href = "/signup">
              <Button text = 'Become a member' CSS = {'px-4 py-2 bg-secondaryVariant hover:bg-secondary '}/>
            </Link>
          </div>
        </div>
      </section>
      <section className = "w-full py-24">
        <div className = "flex flex-col items-center justify-center px-4 mx-auto text-center max-w-7xl">
          <h1 className = "text-2xl font-medium sm:text-3xl lg:text-4xl">Member Benefits</h1>
          <p className = "max-w-sm mt-2 font-light sm:max-w-md xl:text-lg text-onBackground/70">Our way of saying thanks.</p>
        </div>
        <div className = "h-screen mt-10">
          <div className = "flex-col md:flex-row max-w-7xl h-[50%] flex items-center justify-center mx-auto px-4 md:mb-0 mb-16 ">
            <div className = " h-full w-full md:w-[50%] relative pointer-events-none select-none">
              <Image src = {truck} alt = "image of a truck" layout = 'fill' objectFit='cover'/>
            </div>
            <div className = "md:w-[50%] w-full flex items-start justify-center flex-col">
              <h1 className = "w-full max-w-md mt-4 text-xl font-medium md:ml-6">Free shipping on all orders.</h1>
              <p className = "max-w-md mt-2 text-onBackground/70 md:ml-6">You don&apos;t have to meet the minimum spend of $75 when you&apos;re a rewards member. Make sure to use &quot;Members Rewards&quot; for free shipping on every purchase.</p>
            </div>
          </div>
          <div className = "flex-col md:flex-row-reverse max-w-7xl h-[50%] flex items-center justify-center mx-auto px-4 mb-6">
            <div className = " h-full bg-red-500 w-full md:w-[50%] relative pointer-events-none select-none">
              <Image src = {discount} alt = "image of a truck" layout = 'fill' objectFit='cover'/>
            </div>
            <div className = "md:w-[50%] w-full flex items-end justify-center flex-col">
              <h1 className = "w-full mt-4 text-xl font-medium md:max-w-md ">Occasional Discounts.</h1>
              <p className = "mt-2 md:max-w-md text-onBackground/70">We love discounts, and we&apos;re sure you do too. We give occasional discounts ranging from 10%-30% off.</p>
            </div>
          </div>
        </div>
      </section>
      <section className = "py-24">
        <h1 className = "w-full px-4 mx-auto text-3xl font-medium text-center max-w-7xl">More benefits</h1>
        <div className = "h-screen md:h-[70vh] px-4 mx-auto max-w-7xl mt-10">
          <div className = "flex flex-col w-full h-full gap-6 px-4 md:flex-row">
            <div className = "relative flex-1 h-full">
              <Image src = "https://images.pexels.com/photos/45842/clasped-hands-comfort-hands-people-45842.jpeg?cs=srgb&dl=pexels-pixabay-45842.jpg&fm=jpg" alt = "Helping hand, 2 hands intertwined" objectFit='cover' layout='fill' className = "pointer-events-none select-none"/>
              <div className = "absolute inset-0 bg-black/30"/>
              <div className = "absolute inset-0 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
                <h1 className = "text-3xl font-medium text-background">We&apos;re a team.</h1>
                <p className = "text-background/80">Be the first to know about new product launches. </p>
              </div>
            </div>
            <div className = "relative flex-1 h-full">
              <Image src = "https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?cs=srgb&dl=pexels-thought-catalog-2228580.jpg&fm=jpg" alt = "Person holding a book" objectFit='cover' layout='fill'/>
              <div className = "absolute inset-0 bg-black/30"/>
              <div className = "absolute inset-0 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
                <h1 className = "text-3xl font-medium text-background">Like reading a book.</h1>
                <p className = "text-background/80">Get all insights into new projects for our company.</p>
              </div>
            </div>
          </div>  
        </div>
      </section>
      <section className = 'py-24'>
        <div className = "flex flex-col items-center justify-center px-4 mx-auto text-center max-w-7xl">
          <h1 className = "max-w-md text-xl font-medium">We&apos;re making shopping easier for members.</h1>
          <p className = "max-w-sm mt-2 text-base font-light text-onBackground/80">Stay tuned as we&apos;re always adding new benefits for our members.</p>
          <div className = "mt-6">
            <Link href = "/">
              <Button text = 'Start Shopping' CSS = 'bg-secondaryVariant py-2 hover:bg-secondary px-4'/>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RewardsMember