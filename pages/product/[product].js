import { ProductFAQ, ProductImageView, ProductOverview, ProductReviews, ProductUse } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'
import {Signup} from '../../components/sections'
import Head from "next/head";
import { slugify } from "../../utils/slugify";
import { useEffect,useState, useRef,useContext } from "react";
import { ProductStickyCart } from "../../components/features";
import { viewMenu } from "../../graphql/queries/viewMenu";
import { getCustomer } from "../../graphql/queries/getCustomer";
import Layout from "../../components/global/Layout";
import UserContext from "../../context/userContext";
import {db} from "../../firebase/app";
import {collection, query, where, getDocs} from "firebase/firestore";




const Product = ({productData,pageProps,reviewsData})=>{
  useEffect(()=>{
    console.log("pleasee",productData)
  },[])
  const ref = useRef(null)
  const {setCurrentUser} = useContext(UserContext)
  setCurrentUser(pageProps?.userData?.customer)
  const [enableStickyCart, setEnableStickCart] = useState(false);
  const handleScroll = () => {
      const position = window.pageYOffset;
      setEnableStickCart(position > 1000);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <>
      {productData &&
        <>
        <Head>
            <meta charSet='UTF-8'/>
            <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
            <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
            <title>Hufi - {productData.product.title}</title>
            <meta name = "description" content = {productData.product.seo.description}/>
            <meta name = "keywords" content = 'HUFI, TRENDING, PRODUCTS, INNOVATIVE, LIFE, CHANGING'/>

            <meta property="og:title" content="Hufi"/>
            <meta property="og:description" content={productData.product.seo.description}/>
            <meta property="og:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content="https://www.hufistore.com/hufiOG.png"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="Hufi"/>


            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="twitter:title" content="Hufi"/>
            <meta property="twitter:description" content={productData.product.seo.description}/>
            <meta property="twitter:image" content="https://www.hufistore.com/hufiOG.png"/>
        </Head>
        <Layout {...pageProps}>
          <main className = "relative">
            <ProductStickyCart data = {productData} display = {enableStickyCart}/>
            <ProductOverview data = {productData} compRef = {ref} reviews = {reviewsData}/>
            <ProductUse data = {productData?.product?.useCases}/>
            {/* <ProductIncentive data = {productData}/> */}
            {/* <ProductShopPromise/> */}
            {/* <ProductFeatures data = {productData}/> */}
            <ProductImageView data = {productData}/>
            <ProductFAQ data = {productData}/>
            <Signup/>
            <ProductReviews data = {productData} reviews = {reviewsData}/>
          </main>
        </Layout>
        </>
      }
    </>
  )
}
export default Product

export async function getServerSideProps(context) {
  try{
    // For layout
    const cookies = context?.req?.cookies?.userAccess
    let pageProps = {}
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    const {data:userInformation} = await storefront(getCustomer,{token:cookies || "randomletters"})
    pageProps["headerData"] = headerData || null
    pageProps["footerData"] = footerData || null
    pageProps["userData"] = userInformation || null
    pageProps["userAccess"] = cookies || null

    const { req, query:SSRQuery, res, asPath, pathname } = context;
    const {data:product,errors} = await storefront(viewProductByHandle, {handle:SSRQuery.product})

    const q = query(collection(db, "reviews"), where("product", "==",product?.product?.title))
    const querySnapshot = await getDocs(q)
    const reviews = []
    querySnapshot.forEach(doc=>{
      reviews.push(doc.data())
    })


    if(product.product){
      return{
        props:{productData:product || errors, pageProps:pageProps, reviewsData:JSON.stringify(reviews)}
      }
    }else{
      return{
        redirect: {
          permanent: false,
          destination: "/404"
        }
      }
    }
  }catch(e){
    return{
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
}