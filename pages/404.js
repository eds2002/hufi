import Image from "next/image"
import Link from "next/link"
import ErrorImg from '../assets/404.svg'
import { Button } from "../components/elements"
import Head from "next/head"
import Layout from "../components/global/Layout"
import { useEffect,useState } from "react"
import { storefront } from "../utils/storefront"
import { viewMenu } from "../graphql/queries/viewMenu"

const Error = () => {
  const [pageProps,setPageProps] = useState()
  useEffect(()=>{
    const fetchInfo = async () =>{
      let data = {}
      const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
      const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
      data["headerData"] = headerData
      data["footerData"] = footerData
      setPageProps(data)
    }
    fetchInfo()
  },[])
  return (
    <>
    <Head>
        <meta charSet='UTF-8'/>
        <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
        <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
        <title>Hufi - 404</title>
        <meta name = "description" content = "More products available at www.hufistore.com"/>
        <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>
    </Head>
    <Layout {...pageProps}>
      <section className = "w-full h-screen">
        <div className = "flex flex-col items-center w-full h-full px-4 pt-24">
          <div className = "relative w-full h-[300px] pointer-events-none select-none">
            <Image src = {ErrorImg} layout='fill' objectFit="contain"/>
          </div>
          <h1 className = "max-w-sm text-3xl font-medium text-center">Hmmm, it seems like this page doesn&lsquo;t exist.</h1>
          <Link href = "/">
            <Button text = 'Back to home' CSS = 'w-auto px-4 bg-secondaryVariant py-2 mt-6 hover:bg-secondary transition text-onSecondary'/>
          </Link>
        </div>
      </section>
    </Layout>
    </>
  )
}





export default Error