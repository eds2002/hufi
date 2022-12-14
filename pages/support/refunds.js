import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import Layout from '../../components/global/Layout'

const Refunds = ({pageProps}) => {
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
      <section className = "w-full h-[50vh] py-24">
        <div className = "flex flex-col items-center justify-center w-full h-full px-4 pb-24 mx-auto max-w-7xl">
          <h1 className = "text-3xl font-medium text-center">Refunds?</h1>
          <p className = "max-w-xs mt-2 text-center text-onBackground/70">Email us your issue with your product and we&apos;ll refund you 100% of your money spent.</p>
          <form onSubmit={(e)=>e.preventDefault()} className = "flex items-center justify-center w-full mt-10">
            <input className = "w-full max-w-md px-4 py-2 border border-black rounded-tl-md rounded-bl-md focus:outline-none focus:border-black/60"  required name = "textBox"/>
            <div className = "flex items-center justify-center h-full px-4 transition cursor-pointer bg-secondaryVariant rounded-tr-md rounded-br-md hover:bg-secondary hover:shadow-sm">
              <button className = "w-7 h-7 "><PaperAirplaneIcon/></button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
    </>
  )
}

export { default as getServerSideProps } from '../../utils/getServerSideProps'


export default Refunds