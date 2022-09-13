import {useEffect, useState, Fragment} from 'react'
import { Button } from '../../elements'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Transition,Dialog } from '@headlessui/react'

const CollectionProducts = ({data}) => {
  const [tags, setTags] = useState([])

  useEffect(()=>{
    let productTags = []
    data?.collectionByHandle?.products?.nodes?.forEach((arr)=>{
      arr.tags?.forEach(tag=>{
        if(productTags.includes(tag)){
          return
        }else{
          productTags.push(tag)
        }
      })
    })
    setTags(productTags)
  },[])


  const addToCartFunc = (id) =>{
    console.log(id)
  }

  console.log(data,tags)


  return (
    <section className = "pb-24 pt-36 bg-surface">
      <div className = "w-full px-4 sm:px-10 mx-auto max-w-[1600px]"> 
      
      {data.collectionByHandle.sortByTags.value == true ?
      <>
        <div className = "grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 xl:grid-cols-4 ">
          {data.collectionByHandle.products.nodes.map((product,key)=>(
            <ProductCard product={product} data = {data} addToCartFunc = {addToCartFunc} key = {key}/>
          ))}
        </div>
      </> 
      :
      <>
      {tags.map((tag,key)=>(
        <div key = {key}>
          <p className = "text-2xl font-medium text-left md:text-3xl">{tag}</p>

          {/* DISPLAY PRODUCTS */}
          <div className = "grid grid-cols-1 gap-10 pt-5 pb-32 sm:grid-cols-2 xl:grid-cols-4 ">
            {data.collectionByHandle.products.nodes.map((product)=>(
              <>
                {product.tags.includes(tag) && (
                  <ProductCard product={product} data = {data} addToCartFunc = {addToCartFunc} />
                )}
              </>
            ))}
          </div>
        </div>
      ))}
      </>
      }
      </div>
    </section>
    
  )
}

function ProductCard({data, product,addToCartFunc}){
  const [openModal,setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOption, setSelectedOption] = useState(data.collectionByHandle.products.nodes[0].options.map((option)=>{return({name:option.name,value:option.values[0]})}))
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
      <div className = "h-[500px] bg-background rounded-lg p-4 flex flex-col gap-6 transition hover:shadow-xl">
        <Link href = {`/product/${product.handle}`}>
          <div className = "relative flex-1 overflow-hidden rounded-md cursor-pointer bg-gray-500/20">
            <Image src = {product.media.nodes[0].previewImage.url} layout = 'fill' objectFit = 'cover'/>
          </div>
        </Link>
        <div>
          <div className = "flex flex-col items-center justify-center w-full text-center">
            <p className = "text-base font-medium">{product.title}</p>
            <span className = "text-sm font-light">{product.priceRange.maxVariantPrice.amount}</span>
          </div>
          {/* VARIANT OPTIONS */}
          <div className = "flex items-center justify-center w-auto mt-2">
            {data.collectionByHandle.products.nodes[0].options.map((option,key)=>(
            <div className = "flex flex-row-reverse items-end justify-end " key = {key}>
              {option.values.map((value,key)=>(
                <p className =
                {`
                  ${option.name === "Color" && (`h-5 w-5 rounded-full mx-2 ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant ring ring-offset-2 ' : 'ring-neutral-400 ring'}`)}
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

          
          <div className = "flex items-center justify-center w-full mt-10 gap-x-3">
            <Link href = {`/product/${product.handle}`}>
              <Button text = {"Details"} CSS = ' w-auto px-4 bg-transparent py-0.5 border-0.5 border-onBackground/40 hover:border-onBackground/80 hover:bg-white'/>
            </Link>
            <Button text = 'Add to cart' CSS = " w-full px-4 py-1 text-sm" onClick={()=>handleClick(product)}/>
          </div>
        </div>
      </div>
      {openModal && (
        <AddToCartModal data = {selectedProduct} addToCartFunc = {addToCartFunc} setOpenModal = {setOpenModal} openModal = {openModal} selectedOption = {selectedOption} setSelectedOption = {setSelectedOption}/>
      )}
    </>
  )
}

function AddToCartModal({data,setOpenModal,addToCartFunc, openModal, selectedOption, setSelectedOption}){
  if(data.variants.length == 0){
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

    addToCartFunc(findId)
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                    <p className = "text-xl font-medium">{data.title}</p>
                    <div className = "w-0.5 h-5 mx-3 bg-onBackground rounded-full"/>
                    <p className = "text-xl font-medium">{data.priceRange.maxVariantPrice.amount}</p>
                  </div>
                  <Link href = {`/product/${data.handle}`}>
                    <a className = "text-sm font-medium underline text-onBackground/60 hover:text-onBackground/80">Learn more</a>
                  </Link>


                  {/* VARIANT OPTIONS */}
                  <form className = "mt-5" >
                    {data.options.map((option,index)=>(
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


export default CollectionProducts