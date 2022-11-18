import { ProductFAQ, ProductImageView, ProductOverview, ProductReviews,ProductBenefits,ProductBanner } from "../../components/sections/product";
import {storefront} from '../../utils/storefront'
import {viewProductByHandle} from '../../graphql/queries/viewProductByHandle'
import {HorizontalProducts} from '../../components/sections'
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
import { viewCollectionProducts } from "../../graphql/queries/viewCollectionProducts";
import { productMetaTags } from "../../graphql/queries/productMetaTags";
import { GetServerSideProps, NextPage } from "next";


// interface ProductProps{
//   productData:;
//   pageProps:;
//   productRecommendations:;
// }

type ReviewsArr = {
  country?: string;
  createdAt: string;
  edited: boolean;
  id: string;
  images: Array<string>;
  product: string;
  rating: number;
  review: string;
  reviewTitle:string;
  reviewer:string;
  reviwerId:string;
  state?:string;
}

type QuestionsArr = {
  answer?: string;
  dateAnswered: Date;
  dateAsked: Date;
  id: string;
  name: string;
  product: string;
  question: string;
}

interface iProductProps{
  productData:any;
  pageProps:any;
  productRecommendations:any;
}

interface iProduct{
  bannerImage?:any;
  collections:{
    nodes:Array<any>
  }
  compareAtPriceRange:{
    maxVariantPrice:{
      amount:string;
      currencyCode:string;
    }
    minVariantPrice:{
      amount:string;
      currencyCode:string;
    }
  }
  coupon?:{
    type:string;
    value:string;
  }
  crossSell?:{
    type:string;
    value:string;
  }
  deliveryBusinessDays?:{
    type:string;
    value:string;
  }
  descriptionHtml:string;
  details?:{
    type:string;
    value:string;
  }
  faqs?:{
    type:string;
    value:string;
  }
  handle:string;
  id:string;
  learnmore?:{
    type:string;
    value:string;
  }
  media:{
    nodes:Array<any>
  }
  mediaOne?:{
    reference?:{
      image:{
        altText:string;
        url:string;
      }
    }
    type:string;
    value:string;
  }
  mediaOneText?:{
    type:string;
    value:string;
  }
  mediaThree?:{
    reference?:{
      image:{
        altText:string;
        url:string;
      }
    }
    type:string;
    value:string;
  }
  mediaThreeText?:{
    type:string;
    value:string;
  }
  mediaTwo?:{
    reference?:{
      image:{
        altText:string;
        url:string;
      }
    }
    type:string;
    value:string;
  }
  mediaTwoText?:{
    type:string;
    value:string;
  }
  orderWithin?:{
    type:string;
    value:string;
  }
  priceRange:{
    maxVariantPrice:{
      amount:string;
      currencyCode:string;
    }
    minVariantPrice:{
      amount:string;
      currencyCode:string;
    }
  }
  seo:{
    description:string;
    title:string;
  }
  seoTags:{
    value:string;
    type:string;
  }
  shortDesc:{
    value:string;
    type:string;
  }
  sizeGuide:{
    value:string;
    type:string;
  }
  tags:Array<string>;
  title:string;
  totalInventory:number;
  useCases:{
    value:string;
    type:string;
  }
}





const Product:NextPage<iProductProps> = ({productData,pageProps,productRecommendations}:iProductProps)=>{
  const {setCurrentUser} = useContext(UserContext)
  setCurrentUser(pageProps?.userData?.customer)
  const [enableStickyCart, setEnableStickCart] = useState(false);
  const [recommended,setRecommended] = useState({products:{nodes:productRecommendations?.collectionByHandle?.products?.nodes?.filter((product:iProduct) => product.title != productData.product.title)}})
  const [crossSell, setCrossSell] = useState(null)
  const [reviewsData, setReviewsData] = useState<ReviewsArr[]>([])
  const [questionsData, setQuestionsData] = useState<QuestionsArr[]>([])

  const ref = useRef(null)
  const handleScroll = () => {
      const position = window.pageYOffset;
      setEnableStickCart(position > 1000);
  };

  useEffect(()=>{
    setRecommended({products:{nodes:productRecommendations?.collectionByHandle?.products?.nodes?.filter((product:iProduct) => product.title != productData.product.title)}})
  },[productData])

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, [productData.product]);

  // If meta tag cross sell contains values, query data for those values.
  useEffect(()=>{
    const crossSellJSON = productData?.product?.crossSell?.value ? JSON.parse(productData.product.crossSell.value) : null
    if(crossSellJSON){
      (async ()=>{
        let productsQueryArr = []
        for(let product of crossSellJSON.products){
          const {data,errors} = await storefront(viewProductByHandle, {handle:product})
          productsQueryArr.push(data)
        }
        crossSellJSON.products = productsQueryArr
        setCrossSell(crossSellJSON)
      })()
    }else{
      setCrossSell(null)
    }
  },[productData.product.id])


  // Get the questions data
  useEffect(()=>{
    // Getting questions from firebase.
    (async()=>{
      const q = query(collection(db, "questions"), where("product", "==",productData.product.id))
      const querySnapshot = await getDocs(q)
      const questions:QuestionsArr[] = []
      querySnapshot.forEach(doc=>{
        const data = doc.data() as QuestionsArr
        data["id"] = doc.id
        questions.push(data)
      })
      setQuestionsData(questions)
    })()
  },[productData])

  // Get the reviews data and other metaTags
  useEffect(()=>{
    (async()=>{
      // Getting reviews from firebase.
      const q = query(collection(db, "reviews"), where("product", "==",productData?.product?.id))
      const querySnapshot = await getDocs(q)

      type ReviewsArr = {
        country?: string;
        createdAt: string;
        edited: boolean;
        id: string;
        images: Array<string>;
        product: string;
        rating: number;
        review: string;
        reviewTitle:string;
        reviewer:string;
        reviwerId:string;
        state?:string;
      }

      const reviews:ReviewsArr[] = []
      querySnapshot.forEach(doc=>{
        const data = doc.data() as ReviewsArr
        data["id"] = doc.id
        reviews.push(data)
      })

    
      setReviewsData(reviews)
    })()
  },[productData])


  // Get the product metaTags
  useEffect(()=>{
    (async()=>{
      // Getting reviews from firebase.
      const {data:product,errors} = await storefront(productMetaTags, {handle:productData.product.handle})

      productData.product = {...productData.product, ...product.product}
    })()
  },[productData])


  return (
    <>
      {productData &&
        <>
        <Head>
            <meta charSet='UTF-8'/>
            <meta name = 'viewport' content = 'width=device-width, initial-scale=1.0'/>
            <meta httpEquiv='X-UA-Compatible' content='ie=edge'/>
            <title>{productData.product.title} - Hufi</title>
            <meta name = "description" content = {productData.product.seo.description}/>
            <meta name = "keywords" content = {productData.product.seoTags?.value.split(",")}/>

            <meta property="og:title" content={productData.product.title}/>
            <meta property="og:description" content={productData.product.seo.description}/>
            <meta property="og:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:image" content={productData.product.media.nodes[0].image.url}/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="Hufi"/>


            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`https://www.hufistore.com/product/${slugify(productData.product.title)}`}/>
            <meta property="twitter:title" content={productData.product.title}/>
            <meta property="twitter:description" content={productData.product.seo.description}/>
            <meta property="twitter:image" content={productData.product.media.nodes[0].image.url}/>
        </Head>
        <Layout {...pageProps}>
          <main className = "relative scroll-smooth">
            <ProductStickyCart data = {productData} display = {enableStickyCart}/>
            <ProductOverview data = {productData} compRef = {ref} reviews = {reviewsData} crossSell = {crossSell}/>
            <ProductBenefits/>
            <ProductBanner data = {productData?.product?.bannerImage?.value}/>
            <ProductImageView data = {productData}/>
            <ProductFAQ data = {productData}/>
            <ProductReviews data = {productData} reviews = {reviewsData} questions = {questionsData}/>
            {recommended?.products?.nodes?.length != 0 && (<HorizontalProducts data = {recommended} text = {'You might also like'}/>)}
          </main>
        </Layout>
        </>
      }
    </>
  )
}
export default Product

export const getServerSideProps:GetServerSideProps = async (context) => {
  try{
    // For layout
    const cookies = context?.req?.cookies?.userAccess
    let pageProps:Record<string,any> = {}
    const {data:headerData} = await storefront(viewMenu,{menuName:"main-menu"})
    const {data:footerData} = await storefront(viewMenu,{menuName:"footer"})
    const {data:userInformation} = await storefront(getCustomer,{token:cookies || "randomletters"})
    pageProps["headerData"] = headerData || null
    pageProps["footerData"] = footerData || null
    pageProps["userData"] = userInformation || null
    pageProps["userAccess"] = cookies || null


    // Fetching requested product
    const { query:SSRQuery } = context;
    const {data:product,errors} = await storefront(viewProductByHandle, {handle:SSRQuery.product})

    // Getting product recommendations
    const collectionHandle = slugify(product?.product?.collections?.nodes[0]?.title) ?? null
    let {data:productRecommedations, errors:productRecommendationsErrors} = await storefront(viewCollectionProducts, {handle:collectionHandle,amount:10})

    // Data validating
    if(product.product){
      return{
        props:{
          productData:product || errors, 
          pageProps:pageProps, 
          productRecommendations:productRecommedations || null
        }
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
        destination: `/404?${e}`
      }
    }
  }
}