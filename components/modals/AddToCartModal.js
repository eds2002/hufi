import { Transition, Dialog } from "@headlessui/react"
import { Fragment } from "react"
import Link from "next/link"
import { Button } from "../elements"
import { addToShopifyCart } from "../../utils/addToShopifyCart"
export default function AddToCartModal({data,setOpenModal, openModal, selectedOption, setSelectedOption}){
  if(data?.variants.length == 0){
    setOpenModal(false)
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

  const addToCart = (e) =>{
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

    addToShopifyCart(findId)
  }



  return(
    <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setOpenModal(false)}>
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
                    <p className = "text-xl font-medium">{data?.priceRange.maxVariantPrice.amount}</p>
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
                        <div className = "flex items-center mt-2 mb-5 gap-x-3">
                          {option.values.map((value,key)=>(
                            <p className = 
                            {`
                              ${option.name === "Color" ? 
                              (`h-7 w-7 rounded-full border ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring-offset-2 ring' : 'ring-neutral-400'}`)
                              :
                              (`px-2 py-2 rounded-sm ring-1 ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant bg-primary text-onPrimary' : 'ring-neutral-200'}`)
                              }
                                text-sm
                                cursor-pointer
                            `}
                            style={{backgroundColor:value}}
                            onClick = {(e)=>handleVariantChange(option.name,value)}
                            key = {key}
                            id = {option.value}
                            >
                              {option.name === "Color" ? '' : value}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button text = "Add to cart" onClick = {(e)=>addToCart(e)}/>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}