import { AddToCartModal } from "../modals"
import {useEffect, useState,useMemo} from 'react'
import Link from "next/link"
import { Button } from "../elements"
import Image from "next/image"
import { formatNumber } from "../../utils/formatNumber"
import { useContext } from "react"
import LocaleContext from "../../context/localeContext"
import { useRouter } from "next/router"
import CartContext from "../../context/cartContext"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
import { deliveredDate } from "../../utils/deliveredDate"

export default function ProductCard({product}){
  const router = useRouter()
  const {locale} = useContext(LocaleContext)
  const [openModal,setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOption, setSelectedOption] = useState(product?.options?.map((option)=>{return({name:option.name,value:option.values[0]})}))  
  const [getItByData,setGetItByData] = useState({data:{product}})

  const handleContainerClick = (e,product) =>{
    if(e.target.id === "container"){
      router.push(`/product/${product}`)
    }
  }


  return(
    <>
      <div className = "overflow-hidden rounded-lg w-52 bg-background">
        <ProductImage product = {product}/>
        <div className = "px-2 pt-1 pb-4 " id = "container" onClick = {(e)=>handleContainerClick(e,product.handle)}>
          <ProductTextDisplay product={product}/>
          <ActionsContainer product = {product} setOpenModal = {setOpenModal} setSelectedProduct = {setSelectedProduct}  selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} enable = {true}/>
        </div>
      </div>
      <AddToCartModal data = {selectedProduct} setOpenModal = {setOpenModal} openModal = {openModal} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/> 
    </>
  )
}

function ProductImage({product}){
  return(
    <div className = "relative overflow-hidden rounded-md cursor-pointer w-52 h-44 bg-neutral-200">
      <Link href = {`/product/${product?.handle}`}>
        <div className = "absolute inset-0 overflow-hidden ">
          <Image src = {product?.media.nodes[0].previewImage.url} layout = 'fill' objectFit = 'cover'/>
        </div>
      </Link>
      <div className = "absolute inset-0 pointer-events-none bg-white/20"/>
    </div>
  )
}

function ProductTextDisplay({product}){
  const {locale} = useContext(LocaleContext)
  const calculatePercentage = (minNum, maxNum) =>{
    return ((minNum-maxNum) / maxNum * 100).toFixed(0)
  }
  return(
    <>
    {parseInt(product?.priceRange?.maxVariantPrice?.amount) < parseInt(product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
      <span className = 'text-xs bg-tertiaryVariant py-0.5 px-1 rounded-sm '>{calculatePercentage(product?.priceRange?.maxVariantPrice?.amount, product.compareAtPriceRange.maxVariantPrice.amount)}% off</span>
      :
      <span className = "py-0.5 px-1">&nbsp;</span>
    }
    <div className = "overflow-hidden">
      <span className = "text-base font-medium truncate text-ellipsis whitespace-nowrap">{product?.title}</span>
      <p className="text-sm ">
        {parseInt(product?.priceRange?.maxVariantPrice?.amount) < parseInt(product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
          <span className = "flex flex-col ">
            <span className = " text-onBackground">
              <span>{formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
              {' '}
              <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(product?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
            </span>
          </span>
        :
          <>
            <span>{formatNumber(product.priceRange.maxVariantPrice.amount,product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
          </>
        }
      </p>
      <p className = "text-xs text-onBackground/60">{product.shortDesc?.value ?? <span>&nbsp;</span>}</p>
    </div>
    </>
  )
}

function ActionsContainer({product, setSelectedProduct, setSelectedOption, selectedOption, setOpenModal,enable}){
  // const [selectedOption, setSelectedOption] = useState(product?.options?.map((option)=>{return({name:option.name,value:option.values[0]})}))  
  const {cartData, setCartData, viewedCart, setViewedCart,setOpenCart} = useContext(CartContext)

  
  const handleClick = async (product) =>{
    setSelectedProduct(product)

    // TODO, if there is only one available variant, dont open modal and just 
    // add to checkout.
    if(product.variants.nodes.length === 1){
      const newCart = await addToShopifyCart(cartData, product.variants.nodes[0].id)
      setViewedCart(false)
      setCartData(newCart)
      setOpenCart(true)
      return
    }
    setOpenModal(true)
  }

  const handleVariantChange = (option,selectedValue) =>{
    setSelectedOption(prevArr => {
      const newArr = prevArr.map(obj =>{
        if(obj.name === option){
          return {...obj, value:selectedValue}
        }

        return obj
      })
      return newArr
    })
  }


  return(
    <>
      {/* Variants */}

      {/* Buttons */}
      <div className = "flex flex-row items-center justify-start gap-3 mt-4">
        <Button text = 'Add to cart' tag = 'product-card-add-to-cart' CSS = "md:w-auto sm:px-4 w-full text-sm bg-secondaryVariant hover:bg-secondary py-2 text-background" onClick={()=>handleClick(product)}/>
      </div>
      <GetItByComponent data = {{data:product}}/>
      <div className = "items-center justify-start hidden w-full mt-1">

        {/* TODO, if any of the variants does not have an option for Color
            display a text saying the amount of variants available
          */}
        {product.options[0].name != "Title" ? 
          <p className = "text-sm text-onBackground/60">{product.options.length} variant{product.options.length > 1 && 's'} available.</p>
          :
          <p>&nbsp;</p>
        }



        {/* TODO, display the color options in a rounded
            display
          */}
        {product?.options.map((option,key)=>(
          <div className = "items-end justify-end hidden " key = {key}>
            {option.values.map((value)=>(
              <p className =
              {`
                ${option.name === "Color" && (`h-5 w-5 rounded-full mx-2 ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring ring-primaryVariant ring-offset-1 ring-offset-transparent' : 'ring-neutral-400 ring'}`)}
                text-sm
                cursor-pointer
              `}
              style={{backgroundColor:value}}
              onClick = {(e)=>handleVariantChange(option.name,value)}
              key = {value}
              id = {option.value}
              />
            ))}
          </div>  
        ))}
      </div>
    </>
  )
}

function GetItByComponent({data}){
  const [day,setDay] = useState(0)
  const [hour,setHour] = useState(0)
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)
  const dates = data?.product?.deliveryBusinessDays?.value ? JSON.parse(data?.product?.deliveryBusinessDays?.value) : null

  
  // Time variables
  const today = new Date().getTime()
  const orderWithinDate = data?.orderWithin?.value ? new Date(JSON.parse(data.orderWithin.value)).getTime() : null 
  const gap = orderWithinDate ? orderWithinDate - today : 0 
  useEffect(()=>{
    const interval = setInterval(()=>{
      const today = new Date().getTime()
      const orderWithinDate = data?.orderWithin?.value ? new Date(JSON.parse(data.orderWithin.value)).getTime() : null 
      const gap = orderWithinDate - today
      
      const second = 1000;
      const minutes = second * 60
      const hours = minutes * 60
      const day = hours * 24
      
      if(gap <= 0) return 
      setDay(Math.floor(gap/day))
      setHour(Math.floor((gap % day) / hours))
      setMinute(Math.floor((gap % hours) / minutes))
      setSecond(Math.floor((gap % minutes) / second))
    },1000)

    
    return() => {
      clearInterval(interval)
    }
  },[day,hour,minute,second])

  
  const {minMonth,minDays,minYear,maxDays,maxMonth,maxYear} = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.default?.min : 7, dates ? dates[0]?.default?.max : 14)
  },[]) 


  const orderWithinDates = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.orderWithin.min : 5, dates ? dates[0]?.orderWithin.max : 10)
  },[])
  return(
  <>
      {day <= 0 && hour <= 0 && minute <= 0 && second <= 0 ? 
        <p className = "mt-2 text-xs text-onBackground/70">Get it
          <span className = "font-medium text-onBackground/70">{` ${minMonth.slice(0,3)} ${minDays} - ${maxMonth.slice(0,3)} ${maxDays}`}</span>
        </p>
      :
        <>
          <p className = "mt-2 text-xs text-onBackground/70">Get it 
            <span className = "font-medium">{` ${orderWithinDates.minMonth.slice(0,3)} ${orderWithinDates.minDays} - ${orderWithinDates.maxMonth.slice(0,3)} ${orderWithinDates.maxDays}`}</span>
          </p>
        </>
      }
  </>
  )
}
