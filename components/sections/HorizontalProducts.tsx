import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useContext } from 'react'
import LocaleContext from '../../context/localeContext'
import Link from 'next/link'
import { useRef } from 'react'
import Image from 'next/image'
import { formatNumber } from '../../utils/formatNumber'


interface iProduct{
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
  handle:string;
  id:string;
  media:{
    nodes:ProductImage[];
  }
  options:Array<{name:string; values:Array<string>}>
  orderWithin:{
    type:string;
    value:string;
  }
  priceRange:{
    maxVariantPrice:{
      amount:string;
      currencyCode:string;
    }
  }
  shortDesc:{
    type:string;
    value:string;
  }
  title:string;
  variants:{
    nodes:Array<{
      id:string; 
      quantityAvailable:number;
      selectedOptions:Array<{
        name:string;
        value:string;
      }>
    }>
  }
}

interface ProductImage{
  previewImage:{
    originalSrc:string;
    url:string;
  }
}


const HorizontalProducts:React.FC<any> = ({data:{products},text}) => {
  const overflowRef = useRef<HTMLDivElement>(null)

  const handleLeft = () =>{
    if(overflowRef.current != null){
      if(overflowRef?.current?.scrollLeft === 0) return
      overflowRef.current.scrollLeft = overflowRef.current.scrollLeft - overflowRef.current.clientWidth
    }
  }


  const handleRight = () =>{
    if(overflowRef.current != null){
      overflowRef.current.scrollLeft = overflowRef.current.scrollLeft + overflowRef.current.clientWidth
    }
  }

  return (
    <div className="px-4 py-10">
      <div className = "flex items-center justify-between px-4 mx-auto mb-6 max-w-7xl">
        <h1 className = "text-2xl font-medium">{text}</h1>
        <div className = "flex items-center justify-center gap-x-3">
          <div 
            className = "p-1 rounded-full cursor-pointer bg-secondary/10 text-onPrimary hover:bg-secondary/20 active:bg-secondary/40"
            onClick = {()=>handleLeft()}
          >
            <ChevronLeftIcon className = "w-6 h-6"/>
          </div>
          <div 
            className = "p-1 rounded-full cursor-pointer bg-secondary/10 text-onPrimary hover:bg-secondary/20 active:bg-secondary/40"
            onClick = {()=>handleRight()}
          >
            <ChevronRightIcon className = "w-6 h-6"/>
          </div>

        </div>
      </div>
      <div className="flex w-full mx-auto overflow-scroll max-w-7xl scrollBar flex-nowrap snap-x snap-mandatory " ref = {overflowRef}>
        {products?.nodes?.map((product:iProduct,key:number)=>(
          <div className = "px-4 snap-start" key = {key}>
          {key < 10 && (
            <CollectionProduct data={product} key = {key}/>
          )}
          </div>
        ))}
      </div>
    </div>
  )
}


interface iData{
  data:{
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
    handle:string;
    id:string;
    media:{
      nodes:ProductImage[];
    }
    options:Array<{name:string; values:Array<string>}>
    orderWithin:{
      type:string;
      value:string;
    }
    priceRange:{
      maxVariantPrice:{
        amount:string;
        currencyCode:string;
      }
    }
    shortDesc:{
      type:string;
      value:string;
    }
    title:string;
    variants:{
      nodes:Array<{
        id:string; 
        quantityAvailable:number;
        selectedOptions:Array<{
          name:string;
          value:string;
        }>
      }>
    }
    coupon?:{
      type:string;
      value:string;
    }
  }
}

function CollectionProduct({data}:iData){
  const {locale} = useContext(LocaleContext)
  const coupon = data?.coupon ? JSON.parse(data.coupon.value) : null
  return(
    <div className = {`flex flex-col  gap-3`} >
      <div className = "flex-1 w-full h-full">
        <div className = "relative overflow-hidden rounded-md cursor-pointer bg-neutral-100 w-52 h-52">
          <Link href = {`/product/${data.handle}`}>
            <Image src = {data.media.nodes[0].previewImage.url} layout = 'fill' objectFit='cover'/>
          </Link>
          {coupon && (
            <div className = "absolute inset-0 flex items-end justify-start pointer-events-none">
              <p className = "text-xs font-medium bg-primaryVariant2 text-white w-max px-2 py-0.5 rounded-sm">%{coupon.discountAmount} coupon</p>
            </div>
          )}
        </div>
      </div>
      <div className = "flex flex-col items-start justify-center ">
        <p className = "text-sm text-center truncate ">{data.title}</p>
        <p className="text-sm mt-0.5">
        {parseInt(data?.priceRange?.maxVariantPrice?.amount) < parseInt(data?.compareAtPriceRange?.maxVariantPrice?.amount) ? 
          <span className = "flex flex-col ">
            <span className = " text-onBackground/80">
              {/* After discount */}
              <span>{formatNumber(data.priceRange.maxVariantPrice.amount,data.priceRange.maxVariantPrice.currencyCode,locale)}</span>
              {' '}
              {/* Before discount */}
              <span className = 'text-xs line-through text-onBackground/50'>{formatNumber(data?.compareAtPriceRange?.maxVariantPrice?.amount)}</span>
            </span>
          </span>
        :
          <>
            {/* Normal pricing */}
            <span>{formatNumber(data.priceRange.maxVariantPrice.amount,data.priceRange.maxVariantPrice.currencyCode,locale)}</span>
          </>
        }
      </p>
      </div>
    </div>
  )
}

export default HorizontalProducts
