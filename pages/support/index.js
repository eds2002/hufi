export { default as getServerSideProps } from '../../utils/getServerSideProps'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Head from 'next/head'
import Layout from '../../components/global/Layout'
import Link from 'next/link'
import { EnvelopeIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'

const quickLinks = [
  {
    heading:"Shipping & Delivery",
    links:[
      {
        title:"Is there quicker shipping?",
        link:"/support?shipping-options"
      },
      {
        title:"How do I get free shipping?",
        link:"/support?free-shipping"
      }
    ]
  },
  {
    heading:"Orders",
    links:[
      {
        title:"Where can I see my orders?",
        link:"/support?orders"
      },
      {
        title:"How can I cancel my order?",
        link:"/support?cancel-order",
      },
    ]
  },
  {
    heading:"Returns",
    links:[
      {
        title:"What is your return policy?",
        link:"/support?return-policy",
      },
      {
        title:"How can I request a refund?",
        link:"/support?request-refund",
      }
    ]
  },
  {
    heading:"Membership",
    links:[
      {
        title:"What is the Hufi Membership?",
        link:"/support?hufi-membership",
      },
      {
        title:"How do I reset my password?",
        link:"/support?reset-password"
      }
    ]
  },
  {
    heading:"Company",
    links:[
      {
        title:"What is your warranty?",
        link:"/support?warranty"
      },
    ]
  },
  {
    heading:"Discounts",
    links:[
      {
        title:"Do you offer discounts?",
        link:"/support?discounts"
      },
      {
        title:"What are coupons?",
        link:"/support?coupons"
      }

    ]
  }
]

export default function Index({pageProps}){
  const router = useRouter()
  const [searchQuery,setSearchQuery] = useState(null)
  
  useEffect(()=>{
    setSearchQuery(router.asPath.slice(9))
  },[router.asPath])

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
        <section className = "w-full pt-16">
          <div className = "flex flex-col items-center justify-center w-full h-full px-4 pb-24 mx-auto max-w-7xl">
            <h1 className = "text-3xl font-medium text-center">Hufi support.</h1>
            <p className = "max-w-xs mt-2 text-center text-onBackground/70">We&apos;re here to answer any questions you may have.</p>
          </div>
        </section>
        {!searchQuery ?
        <>
          <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
            <h1 className = "text-2xl font-medium">Quick links</h1>
            <p className = "text-base lg:text-lg text-onBackground/70">Here are our most asked questions, one click away.</p>
            <div className = "grid content-center grid-cols-2 mt-10 md:grid-cols-3 g gap-y-12 gap-x-12">
              {quickLinks.map((quickLink)=>(
                <div className = "w-full" key = {quickLink.heading}>
                  <h3 className = "font-medium">{quickLink.heading}</h3>
                  <div className = "flex flex-col items-start">
                    {quickLink.links.map((link)=>(
                      <Link href = {link.link} key = {link.title}>
                        <a className = "my-2 text-sm font-light text-onBackground/70 md:text-base">{link.title}</a>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
        :
        <>
          {searchQuery == "shipping-options" && (<ShippingOptions/>)}
          {searchQuery == "free-shipping" && (<FreeShipping/>)}
          {searchQuery == "orders" && (<Orders/>)}
          {searchQuery == "cancel-order" && (<CancelOrder/>)}
          {searchQuery == "return-policy" && (<ReturnPolicy/>)}
          {searchQuery == "request-refund" && (<RequestRefund/>)}
          {searchQuery == "hufi-membership" && (<Membership/>)}
          {searchQuery == "reset-password" && (<ResetPassword/>)}
          {searchQuery == "warranty" && (<Warranty/>)}
          {searchQuery == "discounts" && (<Discounts/>)}
          {searchQuery == "coupons" && (<Coupons/>)}
        </>
        }
          <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
            <h1 className = "text-2xl font-medium">Contact Us</h1>
            <p className = "text-base lg:text-lg text-onBackground/70">Need extra answers? We&apos;re one email awway.</p>
            <div className = "mt-10">
              <div className = "flex flex-col items-center justify-center w-min">
                <EnvelopeIcon className = "w-16 h-16"/>
                <a href = "mailto:support@hufistore.com">support@hufistore.com</a>
              </div>
            </div>
          </section>
      </Layout>
    </>
  )
}


function Coupons(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Coupons</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about coupons.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">Coupons are an extra percentage off a product. These coupons may range from around <b>5%-25%</b> off a product.</p>
        <h5 className = "pt-5 font-medium text-onBackground">How do I get a coupon?</h5>
        <p className = "py-2">Coupons are available to everyone, sometimes a product will give you the option to use a coupon IF:</p>
        <div className = "my-3">
          <li className = "pl-2">You haven&apos;t used the coupon yet.</li>
        </div>
        <h5 className = "pt-5 font-medium text-onBackground">How do I use a coupon?</h5>
        <p className = "py-2">If you happen to find a product that is offering a coupon, a ribbon will appear next to an unchecked box. Click on the checked box to apply your coupon and if you add that product to your cart, you will see your new price in your cart.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function Discounts(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Discounts</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about discounts.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">Sometimes we will have discounts depending on the time. </p>
        <p className='py-2'>For example, we usually have discounts around the holidys, such as Halloween, Thanksgiving, Christmas, and etc. We give these out through email so be sure to be subscribed to our newsletter.</p>
        <h5 className = "pt-5 font-medium text-onBackground">How can I get more discounts.</h5>
        <p className = "py-2">Becoming a Hufi Rewards Member allows you to receive far more discounts than if you were not a member. Rewards members usually get up to 2 discounts a month ranging from 20-30% off their order.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}


function Warranty(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Warranty</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about our warranty.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">All products have a 30 day warranty. You may ask for a refund or request for a replacement.</p>
        <p className='py-2'>If you are requesting for a replacement please provide proof of a faulty product.</p>
        <p className='py-2'>If you are a requesting a refund, please give us a reasoning to why you&apos;re refunding and we will refund you 100%.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function ResetPassword(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Reset my password</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about being resetting your password.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">Under construction. Please email us at support@hufistore.com</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function Membership(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Hufi Member</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about being a rewards member.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">A Hufi Rewards Member is part of the family. They are able to receive many benefits that enrich their experience shopping with us.</p>
        <h5 className = "pt-5 font-medium text-onBackground">What are the benefits for members?</h5>
        <p className = "py-2">Members receive many benefits such as:</p>
        <div className = "my-3">
          <li className = "pl-2">Free shipping on any order.</li>
          <li className = "pl-2">Latest news on upcoming products / projects.</li>
          <li className = "pl-2">Occasional discounts.</li>
          <li className = "pl-2">How to guides on products.</li>
        </div>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function RequestRefund(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Requesting a refund.</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about requesting a refund.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">You can request a refund by emailing us at <b>support@hufistore.com</b>.</p>
        <h5 className = "pt-5 font-medium text-onBackground">Are there any questions asked?</h5>
        <p className = "py-2">We will side with you 100%, we understand things don&apos;t always go our way. All we ask for in the email is a reasoning as to why you&apos;re requesting a refund.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function ReturnPolicy(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Our return policy</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about our return policy.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">You have a <b>30 day warranty</b> upon delivery. We understand things may not go our ways sometimes.</p>
        <h5 className = "pt-5 font-medium text-onBackground">Where do I return the product?</h5>
        <p className = "py-2">You don&apos;t have to return the product, you may recycle it or do as you wish. </p>
        <h5 className = "pt-5 font-medium text-onBackground">How do I request a return / refund.</h5>
        <p className = "py-2">We will side with you fully on any return or refund you may ask for. Upon requesting a refund, <b>(Email us at support@hufistore.com)</b>, please give us a reason of why you&apos;re requesting a refund and we will start processing your refund. </p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function CancelOrder(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Cancel my order</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn how to cancel your orders.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">Whether you have made an accidental purchase, or simply changed your mind on the order the only way you can cancel your order is by emailing us at support@hufistore.com.</p>
        <p className = "py-2">If your order has not shipped yet you are eligible for a full refund, refunds may take 3-7 business days to show in your bank.</p>
        <h5 className = "pt-5 font-medium text-onBackground">How do I check if my order has shipped yet?</h5>
        <p className = "py-2">To check your order, you must be logged in and direct yourself to the orders page. You will see your most recent order and it&apos;s shipping status.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function Orders(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">View my order</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn how to view your order and more.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2"><b>Logged in</b> users can view their orders by going into their profile.</p>
        <p className = "py-2">For desktop users, head over to the top of the page, hover on your name until a pop up of your profile settings shows up. Click on the orders tab.</p>
        <p className = "py-2">For mobile users, select the hamburger menu on the left, if you are logged in, an option to see your orders will show up at the bottom.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function FreeShipping(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Free Shipping</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about how to receive free shipping.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">Hufi members and customers who&apos;s order is above $75 are eligible for free shipping..</p>
        <p className = "py-2">Hufi members always receive free shipping on any order amount. Becoming a Hufi Member is also extremely easy.</p>
        <div className = "my-3">
          <li className = "pl-2">Simply signup</li>
          <li className = "pl-2">Viola, you are now a Hufi member</li>
        </div>
        <p className = "py-2">If being a member is not your thing, that&apos;s totally okay with us. You can also qualify for free shipping simply buy having a cart over $75.</p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function ShippingOptions(){
  return(
    <section className = 'w-full px-4 pb-24 mx-auto max-w-7xl'>
      <h1 className = "text-2xl font-medium">Shipping options</h1>
      <p className = "text-base lg:text-lg text-onBackground/70">Learn more about our shipping options.</p>
      <div className = "w-full h-[1px] bg-black/20 rounded-full max-w-7xl px-4"/>
      <div className = "py-4 text-onBackground/70">
        <p className = "py-2">As of now our shipping options are currently limited.</p>
        <p className = "py-2">As a company we strongly value and prioritize fast shipping times, you do not have to pay extra for this. Any order you make through us will automatically be qualified for fast shipping.</p>
        <p className = "py-2">Shipping times may be from around <b>7-14 business days.</b></p>
      </div>
      <ImproveComponent/>
    </section>
  )
}

function ImproveComponent(){
  const [feedback,setFeedback] = useState(false)
  return(
    <div className = "mt-12">
      {!feedback ? 
      <>
        <h3 className = "text-lg font-medium">Help Us Improve</h3>
        <p className = "text-onBackground/60">What this page helpful</p>
      </>
      :
      <p className = 'text-lg font-medium'>Thank you for your feedback.</p>
      }
      {!feedback && (
        <div className = "flex gap-6 mt-4">
          <div className = "flex flex-col items-center justify-center">
            <div className = "h-full p-4 rounded-full cursor-pointer bg-surface w-max" onClick = {()=>setFeedback(true)}>
              <HandThumbUpIcon className = "w-5 h-5"/>
            </div>
            Yes
          </div>
          <div className = "flex flex-col items-center justify-center">
            <div className = "h-full p-4 rounded-full cursor-pointer bg-surface w-max"  onClick = {()=>setFeedback(true)}>
              <HandThumbDownIcon className = "w-5 h-5"/>
            </div>
            No
          </div>
        </div>
      )}
    </div>
  )
}

