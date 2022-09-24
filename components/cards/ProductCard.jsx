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
      <div className = "relative flex flex-col w-full h-full p-4 transition rounded-lg shadow-sm aspect-[16/9] group bg-background">
        <Link href = {`/product/${product?.handle}`}>
          <>
            <p className ="flex items-center justify-between text-sm font-medium cursor-pointer hover:text-onBackground/70 md:hidden">
              <span>{product?.title}</span>
            </p>
            <p className ="flex items-center justify-between text-sm font-medium cursor-pointer hover:text-onBackground/70 md:hidden">
              <span>{formatNumber(product?.priceRange.maxVariantPrice.amount,product?.priceRange.maxVariantPrice.currencyCode,locale)}</span>
            </p>
            <p className = "block pb-4 mt-2 text-sm text-left sm:text-sm md:hidden text-onBackground/60">{product.shortDesc?.value}</p>
          </>
        </Link>
        <div className = "relative w-full h-full rounded-md cursor-pointer bg-background">
          <Link href = {`/product/${product?.handle}`}>
            <div className = "absolute inset-0 ">
              <Image src = {product?.media.nodes[0].previewImage.url} layout = 'fill' objectFit = 'cover'/>
            </div>
          </Link>
          <div className = "absolute inset-0 pointer-events-none bg-white/20"/>
        </div>
        <div>
          <div className = "block cursor-pointer md:hidden bg-background" >
            <div className = "flex flex-col items-center justify-end w-full" id = "container" onClick = {(e)=>handleContainerClick(e,product.handle)}>
              <ActionsContainer product = {product} setOpenModal = {setOpenModal} setSelectedProduct = {setSelectedProduct}  selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} enable = {true}/>
            </div>
          </div>
        </div>

        {/* Larger devices md+ */}
        <div className = "hidden cursor-pointer md:block" >
          <div className = "flex flex-col items-center justify-end p-4 " id = "container" onClick = {(e)=>handleContainerClick(e,product.handle)}>
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

function ActionsContainer({product, setSelectedProduct, setSelectedOption, selectedOption, setOpenModal,enable}){
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
    <div className = {`flex-col items-center justify-center  w-full transition duration-500 md:opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:flex`}>
      {/* Variants */}
      <div className = "flex items-center justify-center w-full mt-2 ">

        {/* TODO, if any of the variants does not have an option for Color
            display a text saying the amount of variants available
          */}
        {product.options[0].name != "Title" && (
          <p className = "text-sm text-onBackground/60">{product.options.length} variant{product.options.length > 1 && 's'} available.</p>
        )}



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

      {/* Buttons */}
      <div className = "flex flex-col-reverse items-center justify-center w-full gap-3 mt-3 md:flex-row">
        <Button text = 'Add to cart' CSS = "md:w-auto w-full px-4 text-sm bg-secondaryVariant hover:bg-secondary py-2" onClick={()=>handleClick(product)}/>
        <Link href = {`/product/${product?.handle}`}>
          <Button text = {"Details"} CSS = 'md:w-auto px-4 text-sm bg-surface py-2'/>
        </Link>
      </div>
    </div>
  )
}
