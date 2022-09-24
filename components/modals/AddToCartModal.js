import { Transition, Dialog } from "@headlessui/react"
import { Fragment, useContext,useEffect,useState } from "react"
import Link from "next/link"
import { Button } from "../elements"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
import LocaleContext from "../../context/localeContext"
import { formatNumber } from "../../utils/formatNumber"
import CartContext from "../../context/cartContext"
export default function AddToCartModal({data,setOpenModal, openModal, selectedOption, setSelectedOption}){
  const {locale} = useContext(LocaleContext)
  const {cartData, setCartData,setViewedCart} = useContext(CartContext)
  const [soldOutItems,setSoldOutItems] = useState([])
  // if(data?.variants.length == 0){
  //   setOpenModal(false)
  // }
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


    // TODO, find the id 
    data.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })

    const newCart = await addToShopifyCart(cartData,data.variants.nodes[findId].id)
    if(newCart){
      setViewedCart(false)
      setCartData(newCart)
      setOpenModal(false)
    }
  }


  useEffect(()=>{
    const soldOutVariants = data?.variants.nodes.filter((currentArr)=>{
      if(currentArr.quantityAvailable === 0){
        return currentArr.selectedOptions[0]
      }
    })
    console.log(data)
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
                    <p className = "text-xl font-medium">{data?.title}</p>
                    <div className = "w-0.5 h-5 mx-3 bg-onBackground rounded-full"/>
                    <p className = "text-xl font-medium">{formatNumber(data?.priceRange.maxVariantPrice.amount,data?.priceRange.maxVariantPrice.currenyCode, locale)}</p>
                  </div>
                  <Link href = {`/product/${data?.handle}`}>
                    <a className = "text-sm font-medium underline text-onBackground/60 hover:text-onBackground/80">Learn more</a>
                  </Link>


                  {/* VARIANT OPTIONS */}
                  <form className = "mt-5" >
                    {data?.options.map((option,index)=>(
                      <div key = {index} >
                        {/* Options title */}
                        <h3 className = "text-base font-medium" id = {option.name}>
                          <span>{option.name}: </span>
                          <span className = "font-normal text-neutral-800">{selectedOption[selectedOption.findIndex(opt =>opt.name === option.name)].value}</span>
                        </h3>

                        {/* Options Values */}
                        <div className = "flex flex-wrap items-center gap-3 mt-2 mb-5">
                          {option.values.map((value,key)=>(
                            <>
                              <p className = 
                              {`
                                ${option.name === "Color" ? 
                                (`${soldOutItems?.includes(value) ? 'h-7 w-7 rounded-full border cursor-default ' : `cursor-pointer h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`}`)
                                :
                                (`${soldOutItems?.includes(value) ? 'bg-gray-300 ring-black/60 cursor-default' : `${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant bg-primary text-onPrimary' : 'ring-neutral-400'}`} px-2 py-1 ring-2 cursor-pointer`)
                                }
                                text-sm
                              `}
                              style={{backgroundColor:soldOutItems?.includes(value) ? "lightgray" : value}}
                              onClick = {(e)=>handleVariantChange(option.name,value)}
                              key = {key}
                              id = {option.value}
                              >
                                {option.name === "Color" ? '' : value}
                              </p>
                            </>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button text = "Add to cart" onClick = {(e)=>findProductId(e)}/>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}