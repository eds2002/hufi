import { useRouter } from "next/router"
import React from "react"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { formatNumber } from "../../utils/formatNumber"
import { Button } from "../elements"
import LocaleContext from "../../context/localeContext"
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/20/solid"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
import CartContext from "../../context/cartContext"
import {CloseButton} from '../features'
import ProductContext from "../../context/productContext"
import Link from "next/link"
export default function CrossSellComponent({data,crossSell}){
  const router = useRouter()
  const [expand,setExpand] = useState(false)
  const {cartData,setOpenCart, setCartData} = useContext(CartContext)
  const [currencyCode] = useState(data?.product?.priceRange?.maxVariantPrice?.currencyCode)
  const {locale} = useContext(LocaleContext)
  const [total,setTotal] = useState(parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) || 0)
  const [selectedProducts,setSelectedProducts] = useState()
  const {selectedProduct,setSelectedProduct} = useContext(ProductContext)
  const [currentVariant,setCurrentVariant] = useState('/hufiOG.png')

  // TODO, this use state is used to trigger the get prices useEffect
  // NOTE, This is such a bad way of updating the prices in the button but it seems like 
  // the only way. If there is another way that is less ugly please fix.
  const [variantHasChanged,setVariantHasChanged] = useState(false)


  // TODO, sets current variant of current product. 
  useEffect(()=>{
    let findId
    const query = []
    
    // TODO, for each selected option the user has requested, store variable into query array
    selectedProduct?.forEach((option)=>{
      query.push(option.value)
    })


    //Find variant ID, every query value must match one of the selectedOptions array.
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })

    setCurrentVariant(data.product.variants.nodes[findId])
  },[selectedProduct])
  

  // TODO, get total prices of cross sell products.
  useEffect(()=>{
    let total = parseInt(data?.product?.priceRange?.maxVariantPrice?.amount)
    if(selectedProducts){
      // NOTE, maybe theres a better way of doing this.
      // TODO, if selected products contains a userSelectedId property, total the amount by the variant id number,
      // else, go by the default and total up the mininum variant price.
      if(selectedProducts?.every(data => data.product.userSelectedId)){
        selectedProducts?.forEach((data)=>{
          total += parseInt(data.product.variants.nodes.filter((variant)=> variant.id === data.product.userSelectedId)[0].priceV2.amount)
        })
      }else{
        selectedProducts?.forEach((data)=>{
          total = parseInt(data?.product?.priceRange?.minVariantPrice?.amount) + total
        })
      }
      setTotal(total)
    }
  },[selectedProducts, expand,variantHasChanged])


  // TODO, runs when the crosssell data changes, this prevents displaying the same upsell when redirecting to another page.
  useEffect(()=>{
    setSelectedProducts(crossSell?.products)
    setExpand(false)
  },[crossSell])



  // TODO, handles redirects
  const handleRedirect = (link) =>{
    router.push(link)
  }

  // TODO, handles add to cart once user has decided to purchase products.
  const handleAddToCart = async () =>{
    const variantIds = []
    variantIds.push(currentVariant.id)

    selectedProducts.forEach((data)=>{
      if(data.product.userSelectedId){
        variantIds.push(data.product.userSelectedId)
      }else{
        variantIds.push(data.product.variants.nodes[0].id)
      }
    })

    // Set a variable to add cartData into
    // This way we avoid constantly setting the cart data on each query.
    let newCartData;
    for(let id of variantIds){
      const responseCartData = await addToShopifyCart(cartData,id)
      newCartData = responseCartData
    }
    setCartData(newCartData)
    setOpenCart(true)
  }
  

  return(
    <>
      {/* If every product in products array returns undefined, do not display */}
      {crossSell && !crossSell?.products.every(product=> product === undefined) && (
        <>
          <h3 className = "mt-10 text-xl font-medium">{crossSell?.heading}</h3>
          <div className = "relative mt-2 rounded-md">
            {expand ? 
            <>
              {/* TOP PRODUCT || CURRENT PRODUCT */}
              <div className = "flex gap-3 p-4 rounded-md h-min bg-surface">
                {/* Current product */}
                <div className = "relative w-20 overflow-hidden bg-gray-200 rounded-md select-none aspect-square">
                  <Image 
                    src = {currentVariant?.image?.url} 
                    layout = 'fill'
                    className = "rounded-md"
                  />
                </div>
                <div className = "flex flex-col justify-between ">
                  <p className = "text-sm "><span className = "font-semibold">This item:</span> {data?.product?.title}</p>
                  <p className = "text-sm text-secondaryVariant/60">{data?.product?.title}</p>
                  {parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
                    <span className = "flex flex-col ">
                      <span className = " text-onBackground">
                        <span>{formatNumber(currentVariant.priceV2.amount,currencyCode,locale)}</span>
                        {' '}
                        <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data.product?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
                      </span>
                    </span>
                  :
                    <>
                      <span className = "text-sm font-medium">{formatNumber(currentVariant.priceV2.amount,currencyCode,locale)}</span>
                    </>
                  }
                </div>
              </div>

              {/* CROSSSELL PRODUCTS */}
              <div className = "relative flex mt-3 gap-x-3">
                {crossSell?.products?.map((data)=>(
                  <CrossSellCards 
                    data = {data} 
                    currencyCode = {currencyCode} 
                    locale = {locale} 
                    selectedProducts = {selectedProducts} 
                    setSelectedProducts = {setSelectedProducts} 
                    variantHasChanged = {variantHasChanged}
                    setVariantHasChanged = {setVariantHasChanged}
                    key = {data?.product?.id}  
                  />
                ))}
              </div>

              {/* ADD TO CART BUTTON */}
              <div className = "mt-7">
                <Button 
                  text = {selectedProducts?.length == 2 ? `Add all three items | ${formatNumber(total,currencyCode,locale)}` : selectedProducts?.length == 1 ? `Add both items | ${formatNumber(total,currencyCode,locale)}` : `Just add this item | ${formatNumber(total,currencyCode,locale)}`}
                  CSS = 'py-3 text-onSecondary bg-secondaryVariant hover:bg-secondary'
                  onClick = {()=>handleAddToCart()}  
                />
              </div>
            </>
            :
            <>  
              <div className = "flex items-center justify-evenly">

                {/* CURRENT PRODUCT IMAGE */}
                <div className = "relative w-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer select-none aspect-square"
                  onClick = {()=>handleRedirect(`/product/${data.product.handle}`)}
                >
                  <Image 
                    src = {currentVariant?.image?.url} 
                    layout = 'fill'
                    className = "rounded-md"
                  />
                </div>

                {/* CROSSSELL PRODUCT IMAGES */}
                {crossSell.products.map((data)=>
                  <>
                    <PlusIcon className = "w-4 h-4"/>
                      <div 
                        className = "relative w-24 overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-square"
                        onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
                      >
                        <Image 
                          src = {data?.product?.media?.nodes[0].image.url} 
                          layout = 'fill'
                          className = "rounded-md"
                        />
                      </div>
                  </>
                )}
              </div>

              {/* VIEW ALL PRODUCTS BUTTON */}
              <div className = "w-full mt-7">
                <Button 
                  text = {`${crossSell?.products?.length === 2 ? 'View all three' : crossSell?.products?.length === 1 ? 'View both' : 'View Items'} | ${formatNumber(total,currencyCode,locale)}`}
                  CSS = 'py-4 text-onSecondary bg-secondaryVariant hover:bg-secondary'
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

const CrossSellCards =({data,currencyCode,locale,selectedProducts, setSelectedProducts, setVariantHasChanged, variantHasChanged}) => {
  const router = useRouter()
  const [optionsContainer,setOptionsContainer] = useState(false)
  const [selectedOption, setSelectedOption] = useState(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))
  const [soldOutItems,setSoldOutItems] = useState([])
  const [variantImage,setVariantImage] = useState('/hufiOG.png')
  const [variantPrice, setVariantPrice] = useState(data.product.variants.nodes[0].priceV2.amount || 0)

  // TODO, checks if items are sold out or not
  useEffect(()=>{
    const soldOutVariants = data.product.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    setSoldOutItems(soldOutVariants.map((variant)=>variant.selectedOptions[0].value))
    return(()=>{})
  },[data?.product])


  // TODO, Handle changing the selected variant id
  useEffect(()=>{
    let findId
    const query = []
    
    // TODO, for each selected option the user has requested, store variable into query array
    selectedOption.forEach((option)=>{
      query.push(option.value)
    })


    //Find variant ID, every query value must match one of the selectedOptions array.
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })


    // Insert data to cross sell data, this makes it easier to add to cart later on @ top component.
    data.product["userSelectedId"] = data.product.variants.nodes[findId].id
    // Set the variant image to display
    setVariantImage(data.product.variants.nodes[findId].image.url)
    // Set the adjusted price
    setVariantPrice(data.product.variants.nodes[findId].priceV2.amount)

    // Rerenders the get pricing useEffect at top component.
    setVariantHasChanged(!variantHasChanged)
    return(()=>{})
  },[selectedOption])




  // TODO, Handles variant changes
  const handleVariantChange = async (option,selectedValue) =>{
    if(!soldOutItems.includes(selectedValue)){
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
  }

  // Handles redirect on image click
  const handleRedirect = (link) =>{
    router.push(link)
  }

  // Handles checking and unchecking product cards
  const handleChecked = (id) =>{
    if(selectedProducts?.filter(data => data.product.id === id).length > 0){ //If id is in array, delete that array
      setSelectedProducts(selectedProducts?.filter((data)=> data.product.id != id))
    }else{ //Else, add product data into array.
      setSelectedProducts([...selectedProducts, data])
    }
  }


  return(
    <>
    <div className = "flex-1 w-full p-4 overflow-hidden rounded-md bg-surface">
      {/* IMAGE CONTAINER */}
      <div 
        className = "relative w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer select-none aspect-square"
      >
        <div 
          className = "absolute bottom-0 right-0 z-10 flex items-center justify-center rounded-full shadow-2xl"
        >
          <div className = "p-2">
            <div 
              className = "w-5 h-5 rounded-full bg-primaryVariant2" 
              onClick = {()=>setOptionsContainer(true)}
            >
              <EllipsisHorizontalIcon className = "w-5 h-5 text-onSecondary"/>
            </div>
          </div>
        </div>
        <Image 
          src = {variantImage || ""} 
          layout = 'fill'
          onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
          className = "rounded-md"
        />
        <CheckBox handleChecked={handleChecked} selectedProducts = {selectedProducts} data = {data}/>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className = "mt-4">
        <Link href = {data.product.handle}>
          <p className = "overflow-hidden truncate cursor-pointer text-ellipsis whitespace-nowrap">{data?.product?.title}</p>
        </Link>
        <p className = "overflow-hidden truncate whitespace-nowrap overflow-ellipsis text-onSurface/60">{data?.product?.shortDesc?.value}</p>

        {/* PRODUCT PRICING */}
        <p>
          {parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.product?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
            <span className = "flex flex-col ">
              <span className = " text-onBackground">
                <span>{formatNumber(variantPrice,currencyCode,locale)}</span>
                {' '}
                <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data.product?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
              </span>
            </span>
          :
            <>
              <span className = "text-sm font-medium">{formatNumber(variantPrice,currencyCode,locale)}</span>
            </>
          }
        </p>
      </div>

      
      {/* Displays the products options */}
      {optionsContainer && (
        <div className = "absolute inset-0 z-20 flex items-center overflow-scroll rounded-md bg-surface">
          <CloseButton padding = {2} onClick = {()=>setOptionsContainer(false)}/>
          <div className = "flex items-center w-full h-full gap-2">
            <div className = "relative flex-1 w-32 h-full overflow-hidden rounded-md bg-surface ">
              <Image 
                src = {variantImage || ""} 
                layout = 'fill' 
                objectFit="contain"  
                className="rounded-md"
              />
            </div>
            <div className = "flex-1 h-full overflow-scroll scrollBar">
              <ProductOptions data = {data} selectedOption = {selectedOption} soldOutItems = {soldOutItems} handleVariantChange = {handleVariantChange}/>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

function ProductOptions({data, selectedOption, soldOutItems, handleVariantChange}){
  return(
    <div className = "h-full divide-y">
      {data.product.options.map((option,index)=>(
        <div key = {index} className = "">
          {/* Options title */}
          {/* TODO, avoid rendering products with no options / variants */}
          {option.name != "Title" && (
            <h3 className = "px-2 mt-2 text-sm font-medium " id = {option.name}>
              <span>{option.name}: </span>
              <span className = "font-normal text-onSurface/50">{selectedOption[selectedOption.findIndex(opt =>opt?.name === option.name)]?.value}</span>
            </h3>
          )}
  
          {/* Options Values */}
          <div className = "flex items-center gap-3 overflow-x-scroll scrollBar">
            {/* TODO, avoid rendering products with no options / variants */}
            {option.name != "Title" && (
              <div className = "flex flex-wrap items-center gap-3 px-2 mt-1 mb-4">
                {option.values.map((value,key)=>(
                  <p className = 
                    {`
                      ${option.name === "Color" 
                      ? (`${soldOutItems?.includes(value) ? 'rounded-full cursor-default h-6 w-6 ' : `cursor-pointer h-6 w-6 rounded-full ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-onBackground ring-offset-[3px] ring-1' : 'ring-transparent'}`}`)
                      : (`${soldOutItems?.includes(value) 
                        ? 'bg-gray-300 ring-onBackground/60 cursor-default w-max' 
                        : `${selectedOption.filter(opt =>opt.value === value).length > 0 
                          ? 'ring-1 w-max ring-onBackground' 
                          : 'ring-onBackground ring-opacity-20 ring-1'}`} px-3 py-1 cursor-pointer rounded-[4px] w-max`)}
                      text-sm mt-1 relative flex items-center justify-center
                    `}
                    style={{backgroundColor:soldOutItems.includes(value) ? "lightgray" : option.name === "Color" && (value)}}
                    onClick = {(e)=>handleVariantChange(option.name,value)}
                    key = {key}
                    id = {option.value}
                    >
                      {option.name === "Color" ? '' : value}
                      {soldOutItems?.includes(value) && (
                        <span className = "absolute inset-0 flex items-center justify-center overflow-hidden text-4xl font-light rounded-full rotate-[25deg] opacity-40">
                          /
                        </span>
                      )}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function CheckBox({handleChecked, selectedProducts, data}){
  return(
    <div className = {`absolute -inset-0 z-10  ${selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-transparent pointer-events-none' : 'bg-black/40 inset-0 pointer-events-auto'}`}>
      <div className = "p-2 ml-auto pointer-events-auto w-max">
        <div 
          className = {` w-5 h-5  ml-auto border pointer-events-auto cursor-pointer rounded-sm border-primaryVariant2 ${selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-primaryVariant2' : ''} flex items-center justify-center shadow-2xl`}
          onClick = {()=>handleChecked(data.product.id)}
        >
          {selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 && 
            <CheckIcon className = "w-4 h-4 text-white"/>
          }
        </div>
      </div>
    </div>
  )

}



