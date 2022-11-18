import React, { useContext} from 'react'
import ProductContext from '../../context/productContext'
import {Button} from '../elements'
import { addToShopifyCart } from '../../utils/addToShopifyCart'
import CartContext from '../../context/cartContext'
import LocaleContext from '../../context/localeContext'

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

const ProductStickyCart:React.FC<iProductStickyCartProps> = ({data,display}) => {
  const {selectedProduct} = useContext(ProductContext)
  const {setViewedCart,setOpenCart,setCartData,cartData} = useContext(CartContext)

  
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
      console.log(option)
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
    <div className = {`fixed z-20 right-0 left-0 py-2 top-16 bg-surface/80 backdrop-blur-2xl shadow-xl
    ${display ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    transition-opacity duration-300
    `}>
      <div className = "flex items-center justify-between gap-6 px-4 mx-auto max-w-7xl">
        <div className = "flex flex-col flex-1">
          {data.product.options[0].values[0] === 'Default Title' ?
            <p key = {data.product.title} className = "relative flex-1 w-full min-w-min"><span className = "font-medium">{data.product.title}</span></p>
          :
          <>
            {selectedProduct?.map((selected:{name:string, value:string})=>(
              <>
                {console.log(selected)}
                <p key = {selected.name} className = "relative flex-1 w-full min-w-min"><span className = "font-medium">{selected.name}</span>: {selected.value}</p>
              </>
            ))}
          </>
          }
        </div>
        <div className = "">
          <Button text = {`Add to cart`} CSS = 'bg-secondaryVariant text-onSecondary px-4 text-sm py-2' tag = 'sticky-cart-add-to-cart' onClick = {(e:Event)=>addToCart(e)}/>
        </div>
      </div>
    </div>
  )
}




export default ProductStickyCart