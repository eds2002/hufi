import React, { useCallback, useContext} from 'react'
import ProductContext from '../../context/productContext'
import {Button} from '../elements'
import { addToShopifyCart } from '../../utils/addToShopifyCart'
import CartContext from '../../context/cartContext'
import LocaleContext from '../../context/localeContext'
import {formatNumber} from '../../utils/formatNumber'
import Image from 'next/image'

interface iProduct{
  product:{
    options:Array<any>
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
    variants:{
      nodes:Array<any>
    }
  }
}

interface iProductStickyCartProps{
  data:iProduct;
  display:boolean;
}

interface iVariant{
  id:string;
  image:{
    altText:string;
    url:string;
  }
  priceV2:{
    amount:string;
    currencyCode:string;
  }
  quantityAvailable:number;
  selectedOptions:Array<{
    name:string;
    value:string;
  }>
}

const benefits = [
  {
    icon:"https://cdn-icons-png.flaticon.com/512/411/411763.png",
    title:'Free shipping on orders over $75+',
    paragraph: 'Fast shipping is a always a standard when shopping with us.'
  },
  {
    icon:"https://cdn-icons-png.flaticon.com/512/679/679720.png",
    title:'100% recyacble packaging',
    paragraph: 'We support our earth 100%. We only use recyclable materials.'
  },
  {
    icon:"https://cdn-icons-png.flaticon.com/512/3856/3856515.png",
    title:'30 day money back',
    paragraph: 'Not satisfied with us? Return it for free.'
  },
]





const ProductStickyCart:React.FC<iProductStickyCartProps> = ({data,display}) => {
  const {locale} = useContext(LocaleContext)
  const {selectedProduct} = useContext(ProductContext)
  const {setViewedCart,setOpenCart,setCartData,cartData} = useContext(CartContext)


  const findPrice = useCallback(()=>{
    let findId = 0;

    const query:Array<string> = []

    // TODO, for each selected option the user has requested, store variable into query array
    type tOption = {
      name:string;
      value:string;
    }
    
    selectedProduct?.forEach((option:tOption)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    interface iNewArr{
      id:string;
      image:{
        altText:string;
        url:string;
      }
      priceV2:{
        amount:string;
        currencyCode:string;
      }
      quantityAvailable:number;
      selectedOptions:tOption[];
    }

    data.product.variants.nodes.map((newArr:iNewArr, arrayIndex:number) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })
    
    return formatNumber(
      data.product.variants.nodes[findId].priceV2.amount, 
      data.product.variants.nodes[findId].priceV2.currencyCode, 
      locale
    )
  },[selectedProduct])

  
  const addToCart = async (e:Event) =>{
    e.preventDefault()
    let findId = 0;

    const query:Array<string> = []

    // TODO, for each selected option the user has requested, store variable into query array
    type tOption = {
      name:string;
      value:string;
    }
    
    selectedProduct.forEach((option:tOption)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    interface iNewArr{
      id:string;
      image:{
        altText:string;
        url:string;
      }
      priceV2:{
        amount:string;
        currencyCode:string;
      }
      quantityAvailable:number;
      selectedOptions:tOption[];
    }

    data.product.variants.nodes.map((newArr:iNewArr, arrayIndex:number) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })
    const responseCartData = await addToShopifyCart(cartData,data.product.variants.nodes[findId].id)
    setViewedCart(false)
    setOpenCart(true)
    setCartData(responseCartData)
  }

  return (
    <div className = {`fixed z-[99]  right-0 left-0  top-0 bg-background backdrop-blur-2xl shadow-xl
    ${display ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    transition-opacity duration-300
    `}>
      <div className = "flex flex-col items-center justify-between gap-1 mx-auto divide-y">
        <div className = "flex items-start justify-between flex-1 w-full px-4 py-3 mx-auto max-w-7xl">
          <p className = "text-xl font-medium">{data.product.title}</p>
          <p><span className = "text-sm text-onSurface/80">Buy for</span> <span className = "text-xl font-medium text-onBackground">{findPrice()}</span></p>
        </div>
        <div className = "flex items-center justify-between w-full gap-6 px-4 py-3 text-sm xl:text-base max-w-7xl">
          <div className = "flex items-center flex-1 gap-3 overflow-scroll rounded-full scrollBar">
            {benefits.map((benefit)=>(
              <div 
                key = {benefit.title}
                className = "px-4 py-0.5 bg-surface rounded-full  w-max gap-x-3 flex items-center pointer-events-none"
              >
                <div className = "flex w-max">
                  <Image
                    src = {benefit.icon}
                    width={16}
                    height={16}
                  />
                </div>  
                <p className = "text-sm whitespace-nowrap">{benefit.title}</p>
              </div>
            ))}
          </div>
          <div>
            <Button 
              text = {`Add to cart`} 
              CSS = 'bg-secondaryVariant text-onSecondary px-4 text-xs py-2' 
              tag = 'sticky-cart-add-to-cart' 
              onClick = {(e:Event)=>addToCart(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}




export default ProductStickyCart