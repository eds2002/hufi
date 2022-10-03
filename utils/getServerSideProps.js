import {storefront} from './storefront'
import {viewMenu} from '../graphql/queries/viewMenu'
import {getCustomer} from '../graphql/queries/getCustomer'
 const getServerSideProps= async (context)=>{
  const cookies = context?.req?.cookies?.userAccess
  let pageProps = {}
  const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
  const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
  const {data:userInformation,errors} = await storefront(getCustomer,{token:cookies || "randomletters"})
  console.log(errors)
  console.log(userInformation)
  pageProps["headerData"] = headerData
  pageProps["footerData"] = footerData
  pageProps["userData"] = userInformation
  pageProps["userAccess"] = cookies
  return {props:{pageProps:pageProps}}
}

export default getServerSideProps