import { useContext, useRef, useState } from 'react'
import { ChevronDownIcon, StarIcon, TruckIcon, CheckBadgeIcon } from '@heroicons/react/20/solid'
import { Button } from '../../elements'
import Image from 'next/image'
import LocaleContext from '../../../context/localeContext'
import { formatNumber } from '../../../utils/formatNumber'

const product = {
  rating: 3.9,
  reviewCount: 512,
  href: '#',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview({data}) {
  const {locale} = useContext(LocaleContext)
  const [selectedOption, setSelectedOption] = useState(data.product.options.map((option)=>{return({name:option.name,value:option.values[0]})}))


  // TODO, change old array to new array with a value the user has selected
  const handleVariantChange = (option,selectedValue) =>{
    // const newArr = selectedOption
    // newArr[newArr.findIndex((ref)=>ref.name === option)].value = selectedValue
    // setSelectedOption(prevArr => (prevArr[prevArr.findIndex((ref)=>ref.name === option)].value = selectedValue))
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
    data.product.variants.nodes.map((newArr, arrayIndex) =>{
      if(query.every(object=>newArr.selectedOptions.some(obj=> obj.value === object))){
        findId = arrayIndex
      }
    })

    console.log(data.product.variants.nodes[findId].id)
  }

  return (
    <>
      {data.product ?  
        <div className="relative bg-background">
          <div className="pt-6 pb-24">
            <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="flex flex-col w-full h-full gap-10 lg:grid lg:grid-cols-12">

                {/* Image gallery */}
                <div className="col-span-8">
                  <h2 className="sr-only">Images</h2>

                  <div className={`
                  grid grid-flow-col auto-cols-[100%] overflow-scroll 
                  lg:grid-flow-row  lg:grid-cols-4 lg:gap-8 `}>
                    {data.product?.media?.nodes?.map((media,index)=>(
                      <div className = {`
                      ${index === 0 ? ('lg:col-span-4 w-full') :('lg:col-span-2')}
                      rounded-xl relative w-full  overflow-hidden 
                      `}
                      key = {index}
                      >
                        <img src = {media.previewImage.url} className = "object-cover w-full h-full"/>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className = "col-span-4">
                  <div className = "sticky top-10">

                    {/* Product Title & Pricing */}
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-2xl font-medium text-onBackground">{data?.product?.title}</h1>
                      <p className="text-xl ">
                      {data.product?.priceRange?.maxVariantPrice?.amount < data.product.compareAtPriceRange.maxVariantPrice.amount ? 
                        <span className = "flex gap-x-1">
                          <span className = "text-base font-medium text-onBackground">{formatNumber(data.product.priceRange.maxVariantPrice.amount,data.product.priceRange.maxVariantPrice.currencyCode,locale)}</span>
                          {/* <span className = "text-sm font-normal line-through text-tertiaryVariant">{formatNumber(data.product.compareAtPriceRange.maxVariantPrice.amount,data.product.compareAtPriceRange.maxVariantPrice.currencyCode, locale)}</span> */}
                        </span>
                        :
                        <span>{data.product.priceRange.maxVariantPrice.amount}</span>
                      }
                      </p>
                    </div>

                    {/* Reviews */}
                    <div className="mt-4">
                      <h2 className="sr-only">Reviews</h2>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-700">
                          {product.rating}
                          <span className="sr-only"> out of 5 stars</span>
                        </p>
                        <div className="flex items-center ml-1">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                product.rating > rating ? 'text-yellow-500' : 'text-gray-400',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <div className="flex ml-4">
                          <p href="#" className="text-sm transition text-neutral-400">
                            {product.reviewCount} reviews
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Product Information */}
                    <div className="mt-8 lg:col-span-5">
                      <form name = "productInformation" >
                        {data.product.options.map((option,index)=>(
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
                                  (`px-2 rounded-md ring-2 ${selectedOption.filter(opt =>opt.value === value).length > 0 ? 'ring-primaryVariant bg-primary text-onPrimary' : 'ring-neutral-400'}`)
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
                    </div>
                    {/* Product Description */}
                    <div className="p-4 mt-10 rounded-md bg-surface">
                      <div
                        className="prose-h1:font-medium prose-p:mt-2 prose-h1:text-onBackground prose-p:text-onBackground/60 prose-p:sm:text-base prose-p:font-light prose-h6:hidden prose-p:text-base"
                        dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
                      />
                    </div>

                    <DetailsComponent data = {data.product.details}/>
                    <LearnMoreComponent data = {data.product.learnmore}/>
                  
                    {/* Perks */}
                    <div className = "mt-4">
                        <div className = "flex items-center text-xs gap-x-3">
                          <TruckIcon className = "w-5 h-5 text-primaryVariant" />
                          <p>Free shipping on orders over $25.</p>
                        </div>
                        <div className = "flex items-center mt-2 text-xs gap-x-3">
                          <CheckBadgeIcon className = "w-5 h-5 text-primaryVariant" />
                          <p>Quality ensured.</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      :
        <div>
        
        </div>
      }
    </>
  )
}

function LearnMoreComponent({data}){
  const [open, setOpen] = useState(false)
  return(
    <>
      {data === null ?
        <>
        </>
      :
        <div className = "mt-4">
          <div className = "prose-h3">
            <div className = "w-full h-full rounded-md bg-surface">
              <div className = {`flex items-center justify-between w-full p-4 transition rounded-md cursor-pointer hover:bg-secondaryVariant/50 ${open ? 'bg-secondary' : 'bg-surface'}`}
              onClick = {()=>setOpen(!open)}
              >
                <div
                  className="prose-h1:block prose-li:hidden prose-h1:text-onSurface prose-h1:font-medium"
                  dangerouslySetInnerHTML={{ __html: data.value }}
                />
                <ChevronDownIcon className = {`w-5 h-5 ${open ? 'rotate-180' : 'rotate-0'}`}/>
              </div>
              {open && (
                <div className = "w-full h-full p-4">
                  <div
                    className="prose-li:font-light prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: data.value }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

function DetailsComponent({data}){
  const [open, setOpen] = useState(false)
  return(
    <>
      {data === null ?
        <>
        </>
      :
        <div className = "mt-10">
          <div className = "prose-h3">
            <div className = "w-full h-full rounded-md bg-surface">
              <div className = {`flex items-center justify-between w-full p-4 transition rounded-md cursor-pointer hover:bg-secondaryVariant/50 ${open ? 'bg-secondary' : 'bg-surface'}`}
              onClick = {()=>setOpen(!open)}
              >
                <div
                  className="prose-h1:block prose-li:hidden prose-h1:text-onSurface prose-h1:font-medium"
                  dangerouslySetInnerHTML={{ __html: data.value }}
                />
                <ChevronDownIcon className = {`w-5 h-5 ${open ? 'rotate-180' : 'rotate-0'}`}/>
              </div>
              {open && (
                <div className = "w-full h-full p-4">
                  <div
                    className="prose-li:font-light prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
                    dangerouslySetInnerHTML={{ __html: data.value }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}
