import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
interface iData{
  product:{
    options:Array<any>
    bannerImage?:any;
    collections:{
      nodes:Array<any>
    }
    compareAtPriceRange:{
      maxVariantPrice:{
        amount:string;
        currencyCode:string;
      }
      minVariantPrice:{
        amount:string;
        currencyCode:string;
      }
    }
    coupon?:{
      type:string;
      value:string;
    }
    crossSell?:{
      type:string;
      value:string;
    }
    deliveryBusinessDays?:{
      type:string;
      value:string;
    }
    descriptionHtml:string;
    details?:{
      type:string;
      value:string;
    }
    faqs?:{
      type:string;
      value:string;
    }
    handle:string;
    id:string;
    learnmore?:{
      type:string;
      value:string;
    }
    media:{
      nodes:Array<any>
    }
    mediaOne?:{
      reference?:{
        image:{
          altText:string;
          url:string;
        }
      }
      type:string;
      value:string;
    }
    mediaOneText?:{
      type:string;
      value:string;
    }
    mediaThree?:{
      reference?:{
        image:{
          altText:string;
          url:string;
        }
      }
      type:string;
      value:string;
    }
    mediaThreeText?:{
      type:string;
      value:string;
    }
    mediaTwo?:{
      reference?:{
        image:{
          altText:string;
          url:string;
        }
      }
      type:string;
      value:string;
    }
    mediaTwoText?:{
      type:string;
      value:string;
    }
    orderWithin?:{
      type:string;
      value:string;
    }
    priceRange:{
      maxVariantPrice:{
        amount:string;
        currencyCode:string;
      }
      minVariantPrice:{
        amount:string;
        currencyCode:string;
      }
    }
    seo:{
      description:string;
      title:string;
    }
    seoTags:{
      value:string;
      type:string;
    }
    shortDesc:{
      value:string;
      type:string;
    }
    sizeGuide:{
      value:string;
      type:string;
    }
    tags:Array<string>;
    title:string;
    totalInventory:number;
    useCases:{
      value:string;
      type:string;
    }
    variants:{
      nodes:Array<any>
    }
  }
}

const FAQ:React.FC<{data:iData}> = ({data}) => {
  const reviews = data?.product?.faqs?.value ? JSON.parse(data?.product?.faqs?.value) : undefined
  return (
    <>
    {reviews && (
      <div className="py-16 bg-surface/50">
        <div className="px-4 mx-auto max-w-7xl sm:py-16 ">
          <div className="mx-auto divide-y-2 divide-onBackground/10 ">
            <h2 className="text-3xl font-medium tracking-tight text-left text-onBackground sm:text-4xl">
              Frequently asked questions ({reviews.length})
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {reviews.map((faq:{question:string; answer:string;}) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default FAQ
