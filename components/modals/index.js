import dynamic from 'next/dynamic'

export const AddToCartModal = dynamic(
  ()=> import(
    /*webpackChunkName: "AddToCartModal"*/
    './AddToCartModal'
  ),{
    loading:()=><h1>Loading...</h1>,
  }
)
export const FirstTimeModal = dynamic(
  ()=> import(
    /*webpackChunkName: "FirstTimeModal" */
    './FirstTimeBuyer'
  ),{
    loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)

export const SecureTransactions = dynamic(
  ()=> import(
    /*webpackChunkName: "FirstTimeModal" */
    './SecureTransactions'
  ),{
    loading: () => <h1>Loading...</h1>,
    ssr:false,
  }
)



export {default as RefundsModal} from './RefundsModal'