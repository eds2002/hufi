import { AddToCartModal } from "../modals"
import {useEffect, useState} from 'react'
import Link from "next/link"
import { Button } from "../elements"
import Image from "next/image"
import { formatNumber } from "../../utils/formatNumber"
import { useContext } from "react"
import LocaleContext from "../../context/localeContext"
import { useRouter } from "next/router"
import CartContext from "../../context/cartContext"
import { addToShopifyCart } from "../../utils/addToShopifyCart"

export default function ProductCard({product}){
  const router = useRouter()
  const {locale} = useContext(LocaleContext)
  const [openModal,setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOption, setSelectedOption] = useState(product?.options?.map((option)=>{return({name:option.name,value:option.values[0]})}))  

  const handleContainerClick = (e,product) =>{
    if(e.target.id === "container"){
      router.push(`/product/${product}`)
    }
  }

  return(
    <>
      <div className = "relative flex flex-col transition rounded-lg aspect-square group">
        <div className = "relative w-full h-full rounded-md cursor-pointer">
          <div className = "absolute inset-0 ">
            <Image src = {product?.media.nodes[0].previewImage.url} layout = 'fill' objectFit = 'cover'/>
          </div>
          <div className = "absolute inset-0 bg-surface/25"/>
        </div>

        {/* Smaller devices md- */}
        <div className = "overflow-hidden bg-white cursor-pointer md:hidden text-ellipsis" >
          <Link href = {`/product/${product?.handle}`}>
            <div className = "relative z-20 flex flex-col items-center justify-end p-4">
              {/* Display Text */}
                <div className = "grid w-full h-full grid-rows-3 transition-all duration-500 pointer-events-none place-items-start">
                  <p className = "grid-flow-col overflow-hidden font-medium text-left sm:text-base whitespace-nowrap text-ellipsis">{product?.title}</p>
                  <p className = "text-xs font-medium sm:text-base">{formatNumber(product?.priceRange.maxVariantPrice.amount,product?.priceRange.maxVariantPrice.currencyCode,locale)}</p>
                  <p className = "text-xs text-left sm:text-sm text-onBackground/60 whitespace-nowrap text-ellipsis">{product.shortDesc?.value}</p>
                </div>
            </div>
          </Link>
        </div>

        
        {/* Larger devices md+ */}
        <div className = "hidden cursor-pointer md:block" >
          <div className = "absolute inset-0 flex flex-col items-center justify-end p-4" id = "container" onClick = {(e)=>handleContainerClick(e,product.handle)}>
            <ProductTextDisplay product={product}/>
            <ActionsContainer product = {product} setOpenModal = {setOpenModal} setSelectedProduct = {setSelectedProduct}  selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
          </div>
        </div>
      </div>
      <AddToCartModal data = {selectedProduct} setOpenModal = {setOpenModal} openModal = {openModal} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/> 
    </>
  )
}


function ProductTextDisplay({product}){
  const {locale} = useContext(LocaleContext)
  return(
    <>
    <div className = "absolute flex flex-col items-center justify-center transition-all duration-500 pointer-events-none group-hover:-translate-y-10 group-hover:opacity-0 ">
      <div className = "flex flex-row items-center justify-center w-full mt-4 text-center text-onPrimary/70">
        <p className = "text-base font-medium">{product?.title}</p>
        <div className = "w-0.5 rounded-full h-5 mx-3 bg-onPrimary/70"/>
        <p className = "text-base font-medium">{formatNumber(product?.priceRange.maxVariantPrice.amount,product?.priceRange.maxVariantPrice.currencyCode,locale)}</p>
      </div>
      <p className = "text-sm text-onBackground/60">{product.shortDesc?.value}</p>
    </div>
    </>
  )
}

function ActionsContainer({product, setSelectedProduct, setSelectedOption, selectedOption, setOpenModal}){
  // const [selectedOption, setSelectedOption] = useState(product?.options?.map((option)=>{return({name:option.name,value:option.values[0]})}))  
  const {cartData, setCartData, viewedCart, setViewedCart} = useContext(CartContext)

  
  const handleClick = async (product) =>{
    setSelectedProduct(product)

    // TODO, if there is only one available variant, dont open modal and just 
    // add to checkout.
    if(product.variants.nodes.length === 1){
      const newCart = await addToShopifyCart(cartData, product.variants.nodes[0].id)
      setViewedCart(false)
      setCartData(newCart)
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
    <div className = "flex-col items-center justify-center hidden w-full transition duration-500 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:flex">
      {/* Variants */}
      <div className = "flex items-center justify-center w-auto mt-2">

        {/* TODO, if any of the variants does not have an option for Color
            display a text saying the amount of variants available
          */}
        {!product.options.some(opt=>opt.name === "Color") && (
          <>
            {product.options[0].name != "Title" && (
              <p className = "text-sm text-onBackground/60">{product.options.length} variant{product.options.length > 1 && 's'} available.</p>
            )}
          </>
        )}

        {/* TODO, display the color options in a rounded
            display
          */}
        {product?.options.map((option,key)=>(
          <div className = "flex items-end justify-end " key = {key}>
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

      {/* Buttons */}
      <div className = "flex items-center justify-center w-full max-w-xs mt-3 gap-x-3">
        <Link href = {`/product/${product?.handle}`}>
          <Button text = {"Details"} CSS = 'w-auto px-4 text-sm bg-surface py-2'/>
        </Link>
        <Button text = 'Add to cart' CSS = "w-auto px-4 text-sm bg-secondaryVariant hover:bg-secondary py-2" onClick={()=>handleClick(product)}/>
      </div>
    </div>
  )
}
