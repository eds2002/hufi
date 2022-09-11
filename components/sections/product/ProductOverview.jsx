import { useState } from 'react'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import { Button } from '../../elements'
import { resolveBreakpointValues } from '@mui/system/breakpoints'
import Image from 'next/image'

const product = {
  rating: 3.9,
  reviewCount: 512,
  href: '#',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductOverview({data}) {
  const [selectedOption, setSelectedOption] = useState(data.product.variants.nodes[0].selectedOptions)


  
  /*
  NOTE, this logic might be wonky for products that have multipel variants?
  I believe this will only work for products with 1 variant option. 
  */
  const handleVariantChange = (value) =>{
    const indexOfValue = data.product.variants.nodes.findIndex(option => option.selectedOptions[0].value === value)
    setSelectedOption(data.product.variants.nodes[indexOfValue].selectedOptions)
  }

  return (
    <div className="relative bg-background">
      <div className="pt-6 pb-24">
        <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col w-full h-full gap-10 lg:grid lg:grid-cols-12">

            {/* Image gallery */}
            <div className="col-span-7">
              <h2 className="sr-only">Images</h2>

              <div className={`
              grid grid-flow-col auto-cols-[100%] overflow-scroll 
              lg:grid-flow-row  lg:grid-cols-4 lg:gap-8 `}>
                {data.product.media.nodes.map((media,index)=>(
                  <div className = {`
                  ${index === 0 && ('lg:col-span-4 w-full')}
                  rounded-xl relative w-full  overflow-hidden  lg:col-span-2 
                  `}
                  onClick = {()=>setPrimaryImage(media.previewImage.id)}
                  key = {index}
                  >
                    <img src = {media.previewImage.url} className = "object-cover w-full h-full"/>
                  </div>
                ))}
              </div>
            </div>

            <div className = "col-span-5">
              <div className = "sticky top-10">
                <div className="flex items-center justify-between w-full ">
                  <h1 className="text-2xl font-medium text-onBackground">{data.product.title}</h1>
                  <p className="text-xl font-medium">
                  {data.product.priceRange.maxVariantPrice.amount < data.product.compareAtPriceRange.maxVariantPrice.amount ? 
                    <span className = "flex gap-x-3">
                      <span className = "text-onBackground">{data.product.priceRange.maxVariantPrice.amount}</span>
                      <span className = "font-normal line-through text-error">{data.product.compareAtPriceRange.maxVariantPrice.amount}</span>
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

                <div className="mt-8 lg:col-span-5">
                  <form>
                    {data.product.options.map((option,index)=>(
                      <div key = {index}>
                        <h3 className = "text-base font-medium">{selectedOption[0].value}</h3>
                        <div className = "flex items-center mt-2 mb-5 gap-x-3">
                          {option.values.map((value,key)=>(
                            <p className = {`
                            ${selectedOption[0].value === value ? ('bg-primaryVariant text-onPrimary') : ('bg-transparent')}
                            ${option.name === "Color" ? `rounded-full w-7 h-7 ring-2 transition-all ${selectedOption[0].value === value ? 'ring-primaryVariant' : 'ring-neutral-300 hover:ring-1 hover:scale-105 transition duration-500'}`:('px-4 mt-2 rounded-md ring-2 ring-primaryVariant text-onSecondarytransition duration-300 cursor-pointer')}
                            cursor-pointer 
                            `}
                            onClick = {()=>handleVariantChange(value)}
                            style={{backgroundColor:value}}
                            key = {key}
                            >
                            {option.name === "Color" ? '' : value}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Button text = "Add to cart"/>
                  </form>

                  {/* Product details */}
                  <div className="mt-10">
                    <div
                      className="prose-h1:font-medium prose-p:mt-2 prose-h1:text-lg prose-h1:text-onBackground prose-p:text-onBackground/60 prose-p:sm:text-base prose-p:text-sm"
                      dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
                    />
                  </div>
                  
                </div>
                <DetailsComponent data = {data.product.details}/>
                <LearnMoreComponent data = {data.product.learnmore}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                    className="prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
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
                    className="prose-h1:hidden prose-li:text-onSurface prose-li:list-item prose-li:mb-4 prose-li:text-sm"
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
