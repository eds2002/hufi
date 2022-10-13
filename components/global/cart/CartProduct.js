import { useContext,useState, useEffect } from "react"
import CartContext from "../../../context/cartContext"
import LocaleContext from "../../../context/localeContext"
import { slugify } from "../../../utils/slugify"
import { formatNumber } from "../../../utils/formatNumber"
import { MinusIcon,PlusIcon,TrashIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import {removeProduct} from '../../../utils/removeProduct'
import {updateCart} from '../../../utils/updateCart'
import { useRouter } from "next/router"

export default function CartProduct({data}){
  const {locale} = useContext(LocaleContext)
  const {cartData,setCartData,coupons,setOpenCart} = useContext(CartContext)
  const [cartCoupons,setCartCoupons] = useState([])
  const [currentCoupon,setCurrentCoupon] = useState(data?.node?.merchandise?.product?.coupon?.value ? JSON.parse(data?.node?.merchandise?.product?.coupon?.value) : [])
  const [isCouponApplied,setIsCouponApplied] = useState()
  const router = useRouter()

  useEffect(()=>{
    setCartCoupons(cartData?.discountCodes?.map((discount)=>discount.code))
    setCurrentCoupon(data?.node?.merchandise?.product?.coupon?.value ? JSON.parse(data?.node?.merchandise?.product?.coupon?.value) : null)
  },[cartData,data])


  useEffect(()=>{
    setIsCouponApplied(cartCoupons.includes(currentCoupon?.discountName))
  },[currentCoupon,cartCoupons])


  const handleDelete = async (data)=>{
    const newCart = await removeProduct(data,cartData)
    setCartData(newCart)
  }

  const handleQty = async (amount,product)=>{
    const newCart = await updateCart(cartData,amount,product)
    setCartData(newCart)
  }

  const handleRedirect = (link) =>{
    router.push(link)
    setOpenCart(false)
  }

  return(
    <>
    <div className = {`${(isCouponApplied && currentCoupon) && (' ')} py-4`}>
      <div className = "mb-1 text-xs ">
        {(isCouponApplied && currentCoupon) &&
          <p className = "flex items-center justify-end px-4 ">
            <span className = "px-2 font-medium rounded-full text-onBackground/70 bg-tertiaryVariant">
              {currentCoupon.discountAmount}% off 
            </span>
          </p>
        }
      </div>
      <div className = "flex w-full max-w-xs gap-6 px-4 pb-2">
        {/* IMAGE */}
        <div className = "relative w-20 h-20 rounded-md cursor-pointer flex-0" onClick = {()=>handleRedirect(`/product/${slugify(data?.node?.merchandise?.product.title)}`)}> 
          <Image src = {data.node.merchandise.image.url} alt = {data.node.merchandise.image.altText} layout = 'fill' objectFit='cover' className = "rounded-md"/>
          <span className = "absolute top-[-10px] right-[-10px] flex items-center justify-center w-6 h-6 text-sm font-medium rounded-full bg-secondary text-onSecondary">{data.node.quantity}</span>
        </div>
        <div className = "items-start flex-1 w-full h-full">
          <div className = "grid grid-rows-1 gap-1">
            {/* TITLE & PRICE */}
            <p className = "flex items-center justify-between w-full gap-3 ">
              <span className = "font-medium" onClick = {()=>handleRedirect(`/product/${slugify(data.node.merchandise.product.title)}`)}>
                {data.node.merchandise.product.title}
              </span>
              <span className = "font-medium">
              {isCouponApplied && currentCoupon  ? 
                <p className = "flex items-center ">
                  <span className = "mr-1 text-xs font-light line-through md:text-sm text-onSurface/50">{formatNumber(data.node.merchandise.priceV2.amount,data.node.merchandise.priceV2.currencyCode,locale)}</span>
                  <span className = "text-sm">{formatNumber(data.node.merchandise.priceV2.amount - (data.node.merchandise.priceV2.amount * (currentCoupon.discountAmount)/100),data.node.merchandise.priceV2.currencyCode,locale)}</span>
                </p>
              :
                formatNumber(data.node.merchandise.priceV2.amount,data.node.merchandise.priceV2.currencyCode,locale)
              }
              </span>
            </p>
            {/* SELECTED VARIANTS */}
            <p className = "flex items-center justify-between w-full text-sm text-onBackground/60">{data.node.merchandise.title === "Default Title" ? '' : (data.node.merchandise.title).replace("/","-")}</p>

            {/* INPUTS */}
            <div className = "flex items-center justify-between">
              <div className = "flex items-center justify-center">
                <button className = "hover:text-neutral-400" onClick = {()=>handleQty(data.node.quantity-1,data)}><MinusIcon className = "w-4 h-4"/></button>
                <p className = "flex items-center justify-center w-10">{data.node.quantity}</p>
                <button className = "hover:text-neutral-400" onClick = {()=>handleQty(data.node.quantity+1,data)}><PlusIcon className = "w-4 h-4"/></button>
              </div>
              <TrashIcon className = "w-4 h-4 transition cursor-pointer hover:text-tertiaryVariant"
                onClick = {()=>handleDelete(data)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}