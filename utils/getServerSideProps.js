import {storefront} from './storefront'
import {viewMenu} from '../graphql/queries/viewMenu'
import {getCustomer} from '../graphql/queries/getCustomer'
 const getServerSideProps= async (context)=>{
  const cookies = context?.req?.cookies?.userAccess
  let pageProps = {}
  const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
  const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
  const {data:userInformation,errors} = await storefront(getCustomer,{token:cookies || "randomletters"})
  pageProps["headerData"] = headerData || null
  pageProps["footerData"] = footerData || null
  pageProps["userData"] = userInformation || null
  pageProps["userAccess"] = cookies || null
  return {props:{pageProps:pageProps}}
}

export default getServerSideProps