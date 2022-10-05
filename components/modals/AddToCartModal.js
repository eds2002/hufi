import { Transition, Dialog } from "@headlessui/react"
import { Fragment, useContext,useEffect,useState,useMemo } from "react"
import Link from "next/link"
import { Button } from "../elements"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
import LocaleContext from "../../context/localeContext"
import { formatNumber } from "../../utils/formatNumber"
import CartContext from "../../context/cartContext"
import UserContext from "../../context/userContext"
import { CheckIcon } from "@heroicons/react/20/solid"
import { storefront } from "../../utils/storefront"
import { addCartDiscountCode } from "../../graphql/mutations/addCartDiscountCode"
import { deliveredDate } from "../../utils/deliveredDate"
export default function AddToCartModal({data,setOpenModal, openModal, selectedOption, setSelectedOption}){
  const {locale} = useContext(LocaleContext)
  const {cartData, setCartData,setViewedCart,setOpenCart} = useContext(CartContext)
  const [soldOutItems,setSoldOutItems] = useState([])
  const handleVariantChange = (option,selectedValue) =>{
    if(!soldOutItems?.includes(selectedValue)){
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

  const findProductId = async (e) =>{
    e.preventDefault()
    let findId;

    const query = []

    // TODO, for each selected option the user has requested, store variable into query array
    selectedOption.forEach((option)=>{
      query.push(option.value)
    })


    // TODO, find the id of the selected variant
    data.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })

    const newCart = await addToShopifyCart(cartData,data.variants.nodes[findId].id)
    if(newCart){
      setCartData(newCart)
      setViewedCart(false)
      setOpenModal(false)
    }
  }


  useEffect(()=>{
    const soldOutVariants = data?.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    setSoldOutItems(soldOutVariants?.map((variant)=>variant.selectedOptions[0].value))
  },[data])



  return(
    <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={()=>setOpenModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className = "flex items-center justify-start">
                    <Link href = {`/product/${data?.handle}`}>
                      <p className = "text-xl font-medium cursor-pointer hover:text-onBackground/70">{data?.title}</p>
                    </Link>
                    <div className = "w-0.5 h-5 mx-3 bg-onBackground rounded-full"/>
                    <p className = "text-xl font-medium">{formatNumber(data?.priceRange.maxVariantPrice.amount,data?.priceRange.maxVariantPrice.currenyCode, locale)}</p>
                  </div> 
                  <Link href = {`/product/${data?.handle}`}>
                    <a className = "text-sm font-medium underline text-onBackground/60 hover:text-onBackground/80">Learn more</a>
                  </Link>


                  {/* VARIANT OPTIONS */}
                  <form className = "mt-5" >
                      <ProductImage data = {data} selectedOption = {selectedOption}/>
                      <CouponComponent data = {data} selectedOption = {selectedOption}/>
                      <ProductOptions data = {data} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption} soldOutItems = {soldOutItems} handleVariantChange = {handleVariantChange}/>
                      <Button text = "Add to cart" onClick = {(e)=>findProductId(e)} tag = "modal-add-to-cart"/>
                      <GetItByComponent data = {data}/>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

function ProductImage({data}){
  return(
    <>
      
    </>
  )
}

function GetItByComponent({data}){
  const [day,setDay] = useState(0)
  const [hour,setHour] = useState(0)
  const [minute,setMinute] = useState(0)
  const [second,setSecond] = useState(0)
  const dates = data?.deliveryBusinessDays?.value ? JSON.parse(data?.deliveryBusinessDays.value) : null
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      const today = new Date().getTime()
      const orderWithinDate = data?.orderWithin?.value ? new Date(JSON.parse(data?.orderWithin.value)).getTime() : null 
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

  
  // TODO, get dates for products without a valid timeWithin metadata
  const {minMonth,minDays,minYear,maxDays,maxMonth,maxYear} = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.default?.min : 7, dates ? dates[0]?.default?.max : 14)
  },[]) 

  // TODO, for timeWithin metadata if it returns a valid date.
  const orderWithinDates = useMemo(()=>{
    return deliveredDate(dates ? dates[0]?.orderWithin.min : 7, dates ? dates[0]?.orderWithin.max : 14)
  },[])
  return(
  <>
      {day <= 0 && hour <= 0 && minute <= 0 && second <= 0 ? 
        <p className = "mt-2 text-xs text-onBackground/70">Get it by
          <span className = "font-medium text-onBackground/70">{` ${minMonth} ${minDays} - ${maxDays}, ${maxYear}`}</span>
        </p>
      :
      <>
        <p className = "mt-2 text-sm text-onBackground/70">Fast delivery by
          <span className = "font-medium">{` ${orderWithinDates.minMonth} ${orderWithinDates.minDays} - ${orderWithinDates.maxDays}`}</span>
          <br/>
          Order within:
          <span className = "font-medium text-tertiaryVariant">{`
            ${day != 0 ? (`${day} day${day > 1 ? 's' : ''}`) : ('')} 
            ${hour != 0 ? (`${hour} hr${hour > 1 ? 's' : ''}`) : ('')} 
            ${minute != 0 ? (`${minute} min${minute > 1 ? 's' : ''}`) : ('')} 
            ${hour == 0 ? (`${second} sec${second > 1 ? 's' : ''}`) : ('')}
            `}
          </span>
        </p>
      </>
      }
  </>
  )
}

function ProductOptions({data, selectedOption, soldOutItems, handleVariantChange}){
  return(
    <>
      {data?.options?.map((option,index)=>(
        <div key = {index} className = "">
          {/* Options title */}
          {/* TODO, avoid rendering products with no options / variants */}
          {option?.name != "Title" && (
            <h3 className = "text-base font-medium" id = {option.name}>
              <span>{option.name}: </span>
              <span className = "font-normal text-neutral-800">{selectedOption[selectedOption.findIndex(opt =>opt.name === option.name)].value}</span>
            </h3>
          )}
  
          {/* Options Values */}
          <div className = "flex flex-wrap items-center gap-3 ">
            {/* TODO, avoid rendering products with no options / variants */}
            {option.name != "Title" && (
              <div className = "flex flex-wrap items-center gap-3 mt-2 mb-4">
                {option.values.map((value,key)=>(
                  <>
                    <p className = 
                    {`
                      ${option.name === "Color" ? 
                      (`${soldOutItems?.includes(value) ? 'h-7 w-7 rounded-full border cursor-default ' : `cursor-pointer h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`}`)
                      :
                      (`${soldOutItems?.includes(value) ? 'bg-gray-300 ring-black/60 cursor-default' : `${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant bg-primary text-onPrimary' : 'ring-neutral-400'}`} px-3 py-1 ring-2 cursor-pointer rounded-full`)
                      }
                      text-sm
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
    </>
  )
}

function CouponComponent({data,selectedOption}){
  const {cartData,setCartData, setCoupons} = useContext(CartContext)
  const couponCode = data?.coupon?.value ? JSON.parse(data?.coupon?.value) : ''

  // TODO, if coupon is already in cartData, set checked automaticlly on.
  const [checked,setChecked] = useState(cartData?.discountCodes.some((discount)=> discount.code == couponCode?.discountName))
  
  const {currentUser} = useContext(UserContext)

  // Handle addToCartDiscount if user checked box for promotional coupon
  useEffect(()=>{
    if(!checked) return
    const handleChecked = async () =>{
      if(!checked) return
      setCoupons(oldArr => [...oldArr, couponCode])
      const {data,errors} = await storefront(addCartDiscountCode,{cartId:cartData.id,discountCodes:[couponCode.discountName, currentUser ? 'Members Rewards' : '']})
      if(data && data?.cartDiscountCodesUpdate.userErrors.length == 0){
        setCartData(data.cartDiscountCodesUpdate.cart)
      }else{
        alert("Error in adding coupon.")
      }
    }
    handleChecked()
  },[checked])
  return(
    <>
    {(couponCode && selectedOption[0].value == couponCode?.availableTo?.variant || couponCode?.availableTo?.variant == "") && (  
      <div className = "flex items-center w-full mb-1 gap-x-3">
        <div className = {`w-4 h-4 border rounded-sm border-secondaryVariant ${checked ? 'bg-secondary' : 'bg-transparent cursor-pointer'} transition flex items-center justify-center`}
        onClick = {()=>setChecked(true)}
        >
        {checked && (
          <CheckIcon className = "w-5 h-5 text-onSecondary"/>
        )}
        </div>
        <p className = "text-sm text-onBackground/70">
          <span className = {`font-medium text-onBackground`}>{couponCode.discountAmount}%</span>{' '}
          {checked ? 
            <span>applied at checkout</span>
          :
            'Promotional coupon'
          }
        </p>
      </div>
    )}
    </>
  )

}