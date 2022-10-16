import { useRouter } from "next/router"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { formatNumber } from "../../utils/formatNumber"
import { Button } from "../elements"
import LocaleContext from "../../context/localeContext"
import { PlusIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/20/solid"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
import CartContext from "../../context/cartContext"
export default function CrossSellComponent({data,crossSell,selectedOption}){
  const router = useRouter()
  const [expand,setExpand] = useState(false)
  const {cartData,setOpenCart, setCartData} = useContext(CartContext)
  const [currencyCode] = useState(data?.product?.priceRange?.maxVariantPrice?.currencyCode)
  const {locale} = useContext(LocaleContext)
  const [total,setTotal] = useState(parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) || 0)
  const [selectedProducts,setSelectedProducts] = useState()
  useEffect(()=>{
    let total = parseInt(data?.product?.priceRange?.maxVariantPrice?.amount)
    if(selectedProducts){
      selectedProducts?.forEach((data)=>{
        total = parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) + total
      })
      setTotal(total)
    }
  },[selectedProducts])

  useEffect(()=>{
    setSelectedProducts(crossSell?.products)
  },[crossSell])


  const handleRedirect = (link) =>{
    router.push(link)
  }

  const handleAddToCart = async () =>{
    const productsQuery = []
    let findId;

    const query = []

    // TODO, for each selected option the user has requested, store variable into query array
    selectedOption.forEach((option)=>{
      query.push(option.value)
    })

    // TODO, find the id 
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })

    productsQuery.push(data?.product?.variants?.nodes[findId].id)
  
    for(let data of selectedProducts){
      productsQuery.push(data?.product?.variants?.nodes[0].id)
    }

    for(let id of productsQuery){
      const responseCartData = await addToShopifyCart(cartData,id)
      setCartData(responseCartData)
    }
    setOpenCart(true)
  }
  

  return(
    <>
      {/* If every product in products array returns undefined, do not display */}
      {crossSell && !crossSell?.products.every(product=> product === undefined) && (
        <>
          <h3 className = "mt-10 text-xl font-medium">{crossSell?.heading}</h3>
          <div className = "relative p-4 mt-2 border rounded-md">
            {expand ? 
            <>
              <div className = "flex gap-3 p-4 rounded-md h-min bg-surface">
                {/* Current product */}
                <div 
                  className = "relative w-20 bg-gray-200 cursor-pointer select-none aspect-square"
                  onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
                >
                  <Image src = {data?.product?.media?.nodes[0].image.url} layout = 'fill'/>
                </div>
                <div className = "flex flex-col justify-between ">
                  <p className = "text-sm "><span className = "font-semibold">This item:</span> {data?.product?.title}</p>
                  <p className = "text-sm text-secondaryVariant/60">{data?.product?.shortDesc?.value}</p>
                  {parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
                    <span className = "flex flex-col ">
                      <span className = " text-onBackground">
                        <span>{formatNumber(data.product.priceRange.maxVariantPrice.amount,currencyCode,locale)}</span>
                        {' '}
                        <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data.product?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
                      </span>
                    </span>
                  :
                    <>
                      <span className = "text-sm font-medium">{formatNumber(data.product.priceRange.maxVariantPrice.amount,currencyCode,locale)}</span>
                    </>
                  }
                </div>
              </div>
              <div className = "flex mt-3 gap-x-3">
                {crossSell?.products?.map((data)=>(
                  <CrossSellCards data = {data} currencyCode = {currencyCode} locale = {locale} selectedProducts = {selectedProducts} setSelectedProducts = {setSelectedProducts} key = {data?.product?.id}/>
                ))}
              </div>
              <div className = "mt-7">
                <Button 
                  text = {selectedProducts.length == 2 ? `Add all three items | ${formatNumber(total,currencyCode,locale)}` : selectedProducts.length == 1 ? `Add both items | ${formatNumber(total,currencyCode,locale)}` : `Just add this item | ${formatNumber(total,currencyCode,locale)}`}
                  onClick = {()=>handleAddToCart()}  
                />
              </div>
            </>
            :
            <>  
              <div className = "flex items-center justify-between">
                <div className = "relative w-24 bg-gray-200 rounded-sm cursor-pointer select-none aspect-square"
                  onClick = {()=>handleRedirect(`/product/${data.product.handle}`)}
                >
                  <Image src = {data?.product?.media?.nodes[0].image.url} layout = 'fill'/>
                </div>
                {crossSell.products.map((data)=>
                <>
                <PlusIcon className = "w-5 h-5"/>
                  <div 
                    className = "relative w-24 bg-gray-200 rounded-sm cursor-pointer aspect-square"
                    onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
                  >
                    <Image src = {data?.product?.media?.nodes[0].image.url} layout = 'fill'/>
                  </div>
                </>
                )}
              </div>
              <div className = "w-full mt-7">
                <Button 
                  text = {`View all three | ${formatNumber(total,currencyCode,locale)}`}
                  onClick = {()=>setExpand(true)}
                />
              </div>
            </>
            }
          </div>
        </>
      )}
    </>
  )
}

function CrossSellCards({data,currencyCode,locale,selectedProducts, setSelectedProducts}){
  const handleRedirect = (link) =>{
    router.push(link)
  }

  const handleChecked = (id) =>{
    if(selectedProducts.filter(data => data.product.id === id).length > 0){ //If id is in array, delete that array
      setSelectedProducts(selectedProducts.filter((data)=> data.product.id != id))
    }else{ //Else, add product data into array.
      setSelectedProducts([...selectedProducts, data])
    }
  }


  return(
    <>
    <div className = "relative flex-1 w-full p-4 overflow-hidden rounded-md bg-surface">
      <div 
        className = "relative w-full bg-gray-200 cursor-pointer select-none aspect-square"
        onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
      >
        <Image src = {data?.product?.media?.nodes[0].image.url} layout = 'fill'/>
      </div>
      <div className = "mt-4">
        <p className = "overflow-hidden truncate text-ellipsis whitespace-nowrap">{data?.product?.title}</p>
        <p className = "overflow-hidden truncate whitespace-nowrap overflow-ellipsis text-onSurface/60">{data?.product?.shortDesc?.value}</p>
        {parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
          <span className = "flex flex-col ">
            <span className = " text-onBackground">
              <span>{formatNumber(data.product.priceRange.maxVariantPrice.amount,currencyCode,locale)}</span>
              {' '}
              <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data.product?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
            </span>
          </span>
        :
          <>
            <span className = "text-sm font-medium">{formatNumber(data.product.priceRange.maxVariantPrice.amount,currencyCode,locale)}</span>
          </>
        }
      </div>
      <div className = {`absolute inset-0 z-10 p-2 ${selectedProducts.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-transparent' : 'bg-white/50'} pointer-events-none`}>
        {/* Checkbox */}
        <div 
          className = {`w-5 h-5 ml-auto border pointer-events-auto cursor-pointer rounded-sm border-secondaryVariant ${selectedProducts.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-secondary' : 'bg-neutral-200'} flex items-center justify-center`}
          onClick = {()=>handleChecked(data.product.id)}
        >
          {selectedProducts.filter(prod => prod.product.id === data.product.id).length > 0 && <CheckIcon className = "w-3 h-3 text-white"/>}
        </div>
      </div>
    </div>
    </>
  )
}

