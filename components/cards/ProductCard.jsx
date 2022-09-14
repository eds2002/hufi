import { AddToCartModal } from "../modals"
import {useEffect, useState} from 'react'
import Link from "next/link"
import { Button } from "../elements"
import Image from "next/image"
import { formatNumber } from "../../utils/formatNumber"
import { useContext } from "react"
import LocaleContext from "../../context/localeContext"

export default function ProductCard({product}){
  const {locale} = useContext(LocaleContext)
  const [openModal,setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOption, setSelectedOption] = useState(product?.options?.map((option)=>{return({name:option.name,value:option.values[0]})}))  
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
  const handleClick = (product) =>{
    setSelectedProduct(product)
    setOpenModal(true)
  }
  return(
    <>
      <div className = "min-h-[350px] min-w-[350px] rounded-lg  flex flex-col transition relative overflow-hidden group">
        <div className = "relative w-full h-full overflow-hidden rounded-md cursor-pointer">
          <div className = "absolute inset-0 ">
            <Image src = {product?.media.nodes[0].previewImage.url} layout = 'fill' objectFit = 'cover'/>
          </div>
        </div>

        {/* Smaller devices md- */}
        <div className = "block cursor-pointer md:hidden" >
          <Link href = {`/product/${product?.handle}`}>
            <div className = "absolute inset-0 flex flex-col items-center justify-end p-4">
              {/* Display Text */}
              <div className = "absolute flex flex-col items-center justify-center transition-all duration-500 pointer-events-none group-hover:sm:-translate-y-10 group-hover:sm:opacity-0 ">
                <div className = "flex flex-row items-center justify-center w-full mt-4 text-center text-onPrimary/70">
                  <p className = "text-base font-medium">{product?.title}</p>
                  <div className = "w-0.5 rounded-full h-5 mx-3 bg-onPrimary/70"/>
                  <p className = "text-base font-medium">{formatNumber(product?.priceRange.maxVariantPrice.amount,product?.priceRange.maxVariantPrice.currencyCode,locale)}</p>
                </div>
                <p className = "text-sm text-onBackground/60">{product.metafield?.value}</p>
              </div>
            </div>
          </Link>
        </div>

        
        {/* Larger devices md+ */}
        <div className = "hidden cursor-pointer md:block" >
          <div className = "absolute inset-0 flex flex-col items-center justify-end p-4">
            {/* Display Text */}
            <div className = "absolute flex flex-col items-center justify-center transition-all duration-500 pointer-events-none group-hover:-translate-y-10 group-hover:opacity-0 ">
              <div className = "flex flex-row items-center justify-center w-full mt-4 text-center text-onPrimary/70">
                <p className = "text-base font-medium">{product?.title}</p>
                <div className = "w-0.5 rounded-full h-5 mx-3 bg-onPrimary/70"/>
                <p className = "text-base font-medium">{formatNumber(product?.priceRange.maxVariantPrice.amount,product?.priceRange.maxVariantPrice.currencyCode,locale)}</p>
              </div>
              <p className = "text-sm text-onBackground/60">{product.metafield?.value}</p>
            </div>

            {/* Actions */}
            <div className = "hidden w-full transition duration-500 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto sm:block">
              {/* Variants */}
              <div className = "flex items-center justify-center w-auto mt-2">
                {product?.options.map((option,key)=>(
                <div className = "flex items-end justify-end " key = {key}>
                  {option.values.map((value,key)=>(
                    <p className =
                    {`
                      ${option.name === "Color" && (`h-5 w-5 rounded-full mx-2 ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring ring-primaryVariant ring-offset-1 ring-offset-transparent' : 'ring-neutral-400 ring'}`)}
                      text-sm
                      cursor-pointer
                    `}
                    style={{backgroundColor:value}}
                    onClick = {(e)=>handleVariantChange(option.name,value)}
                    key = {key}
                    id = {option.value}
                    />
                  ))}
                </div>  
                ))}
              </div>

              {/* Buttons */}
              <div className = "flex items-center justify-center w-full max-w-xs mt-6 gap-x-3">
                <Link href = {`/product/${product?.handle}`}>
                  <Button text = {"Details"} CSS = ' w-auto h-full px-4 bg-white py-1 border-0.5 border-onBackground/40 hover:border-onBackground/80 hover:bg-white h-full'/>
                </Link>
                <Button text = 'Add to cart' CSS = "w-auto px-4 py-2 text-sm" onClick={()=>handleClick(product)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal data = {selectedProduct} setOpenModal = {setOpenModal} openModal = {openModal} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/> 
    </>
  )
}
