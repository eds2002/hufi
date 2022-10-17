import { useRouter } from "next/router"
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
export default function CrossSellComponent({data,crossSell,selectedOption}){
  const router = useRouter()
  const [expand,setExpand] = useState(false)
  const {cartData,setOpenCart, setCartData} = useContext(CartContext)
  const [currencyCode] = useState(data?.product?.priceRange?.maxVariantPrice?.currencyCode)
  const {locale} = useContext(LocaleContext)
  const [total,setTotal] = useState(parseInt(data?.product?.priceRange?.maxVariantPrice?.amount) || 0)
  const [selectedProducts,setSelectedProducts] = useState()
  const {selectedProduct,setSelectedProduct} = useContext(ProductContext)
  const [currentVariant,setCurrentVariant] = useState('/hufiOG.png')


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
  },[selectedProducts, expand])

  useEffect(()=>{
    setSelectedProducts(crossSell?.products)
  },[crossSell])


  const handleRedirect = (link) =>{
    router.push(link)
  }

  const handleAddToCart = async () =>{
    const variantIds = []
    variantIds.push(currentVariant.id)


    crossSell.products.forEach((data)=>{
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
                <div className = "relative w-20 bg-gray-200 select-none aspect-square">
                  <Image src = {currentVariant?.image?.url} layout = 'fill'/>
                </div>
                <div className = "flex flex-col justify-between ">
                  <p className = "text-sm "><span className = "font-semibold">This item:</span> {data?.product?.title}</p>
                  <p className = "text-sm text-secondaryVariant/60">{data?.product?.shortDesc?.value}</p>
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
              <div className = "flex mt-3 gap-x-3">
                {crossSell?.products?.map((data)=>(
                  <CrossSellCards 
                    data = {data} 
                    currencyCode = {currencyCode} 
                    locale = {locale} 
                    selectedProducts = {selectedProducts} 
                    setSelectedProducts = {setSelectedProducts} 
                    key = {data?.product?.id}  
                  />
                ))}
              </div>

              {/* ADD TO CART BUTTON */}
              <div className = "mt-7">
                <Button 
                  text = {selectedProducts?.length == 2 ? `Add all three items | ${formatNumber(total,currencyCode,locale)}` : selectedProducts?.length == 1 ? `Add both items | ${formatNumber(total,currencyCode,locale)}` : `Just add this item | ${formatNumber(total,currencyCode,locale)}`}
                  onClick = {()=>handleAddToCart()}  
                />
              </div>
            </>
            :
            <>  
              <div className = "flex items-center justify-between">

                {/* CURRENT PRODUCT IMAGE */}
                <div className = "relative w-24 bg-gray-200 rounded-sm cursor-pointer select-none aspect-square"
                  onClick = {()=>handleRedirect(`/product/${data.product.handle}`)}
                >
                  <Image src = {currentVariant?.image?.url} layout = 'fill'/>
                </div>

                {/* CROSSSELL PRODUCT IMAGES */}
                {crossSell.products.map((data)=>
                  <>
                    <PlusIcon className = "w-4 h-4"/>
                      <div 
                        className = "relative w-24 bg-gray-200 rounded-sm cursor-pointer aspect-square"
                        onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
                      >
                        <Image src = {data?.product?.media?.nodes[0].image.url} layout = 'fill'/>
                      </div>
                  </>
                )}
              </div>

              {/* VIEW ALL PRODUCTS BUTTON */}
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

function CrossSellCards({data,currencyCode,locale,selectedProducts, setSelectedProducts, total, setTotal}){
  const router = useRouter()
  const [optionsContainer,setOptionsContainer] = useState(false)
  const [selectedOption, setSelectedOption] = useState(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))
  const [soldOutItems,setSoldOutItems] = useState([])
  const [variantImage,setVariantImage] = useState('/hufiOG.png')
  const [variantPrice, setVariantPrice] = useState(data.product.variants.nodes[0].priceV2.amount || 0)

  // TODO, check if items are sold out or not
  useEffect(()=>{
    const soldOutVariants = data.product.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    setSoldOutItems(soldOutVariants.map((variant)=>variant.selectedOptions[0].value))
    return(()=>{})
  },[data?.product])


  // Handle changing the selected variant id

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
    <div className = "relative flex-1 w-full p-4 overflow-hidden rounded-md bg-surface">
      {/* IMAGE CONTAINER */}
      <div 
        className = "relative w-full bg-gray-200 cursor-pointer select-none aspect-square"
      >
        <div 
          className = "absolute z-10 flex items-center justify-center w-5 h-5 rounded-full bg-secondary bottom-2 right-2"
          onClick = {()=>setOptionsContainer(true)}
        >
          <EllipsisHorizontalIcon className = "w-5 h-5 text-onSecondary"/>
        </div>
        <Image 
          src = {variantImage || ""} 
          layout = 'fill'
          onClick = {()=>handleRedirect(`/product/${data?.product?.handle}`)}
        />
      </div>

      {/* PRODUCT INFORMATION */}
      <div className = "mt-4">
        <p className = "overflow-hidden truncate text-ellipsis whitespace-nowrap">{data?.product?.title}</p>
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
        <div className = "absolute inset-0 z-20 flex items-center overflow-scroll bg-surface">
          <CloseButton padding = {2} onClick = {()=>setOptionsContainer(false)}/>
          <div className = "flex flex-col w-full h-full p-4">
            <div className = "relative overflow-hidden bg-gray-200 rounded-md aspect-square">
              <Image 
                src = {variantImage || ""} 
                layout = 'fill' 
                objectFit="cover"  
              />
            </div>
            <div className = "flex-1 h-full overflow-scroll scrollBar">
              <ProductOptions data = {data} selectedOption = {selectedOption} soldOutItems = {soldOutItems} handleVariantChange = {handleVariantChange}/>
            </div>
          </div>
        </div>
      )}

     <CheckBox handleChecked={handleChecked} selectedProducts = {selectedProducts} data = {data}/>
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
            <h3 className = "mt-2 text-base font-medium " id = {option.name}>
              <span>{option.name}</span>
              {/* <span className = "font-normal text-neutral-800">{selectedOption[selectedOption.findIndex(opt =>opt?.name === option.name)]?.value}</span> */}
            </h3>
          )}
  
          {/* Options Values */}
          <div className = "flex flex-wrap items-center gap-3 overflow-x-scroll scrollBar">
            {/* TODO, avoid rendering products with no options / variants */}
            {option.name != "Title" && (
              <div className = "flex items-center gap-3 px-1 mt-1 mb-4 md:flex-wrap">
                {option.values.map((value,key)=>(
                  <>
                    <p className = 
                    {`
                      ${option.name === "Color" ? 
                      (`${soldOutItems?.includes(value) ? 'h-7 w-7 rounded-full border cursor-default ' : `cursor-pointer h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`}`)
                      :
                      (`${soldOutItems?.includes(value) ? 
                          'bg-gray-300 ring-black/60 cursor-default w-max' 
                        : 
                          `${selectedOption.filter(opt =>opt.value === value).length > 0 ? 
                              'ring-primaryVariant bg-primary w-max' 
                            : 
                              'ring-neutral-400'}`} px-3 py-1 ring-2 cursor-pointer rounded-full w-max`)
                      }
                      text-sm mt-1
                    `}
                    style={{backgroundColor:soldOutItems.includes(value) ? "lightgray" : option.name === "Color" && (value)}}
                    onClick = {(e)=>handleVariantChange(option.name,value)}
                    key = {key}
                    id = {option.value}
                    >
                      {option.name === "Color" ? '' : value}
                    </p>
                  </>
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
    <div className = {`absolute inset-0 z-10 p-2 ${selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-transparent' : 'bg-white/50'} pointer-events-none`}>
      <div 
        className = {`w-5 h-5 ml-auto border pointer-events-auto cursor-pointer rounded-sm border-secondaryVariant ${selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 ? 'bg-secondary' : 'bg-neutral-200'} flex items-center justify-center`}
        onClick = {()=>handleChecked(data.product.id)}
      >
        {selectedProducts?.filter(prod => prod.product.id === data.product.id).length > 0 && <CheckIcon className = "w-3 h-3 text-white"/>}
      </div>
    </div>
  )

}



