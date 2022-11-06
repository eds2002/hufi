import Image from 'next/image'
import Link from 'next/link'
import {useRef,useEffect,useState} from 'react'
import { Button } from '../../elements'

const CollectionBanner = ({data}) => {
  const textRef = useRef()
  const [handle,setHandle] = useState(null)
  useEffect(()=>{
    const tagHandle = textRef?.current?.getElementsByTagName("a")[0]?.innerText
    setHandle(tagHandle)
  },[])
  return (
    <section className = "w-full h-[65vh] md:h-[65vh] relative">
      {data?.collectionByHandle?.banner?.reference?.image?.url ? 
      <Image 
        src = {data?.collectionByHandle?.banner?.reference?.image?.url} 
        layout = 'fill' 
        className = "object-cover w-full h-full pointer-events-none select-none" 
        priority 
        alt = {data?.collectionByHandle?.banner?.reference?.image?.altText}  
      />
      :
      <Image 
        src = {data?.collectionByHandle?.image?.url} 
        layout = 'fill' 
        className = "object-cover w-full h-full pointer-events-none select-none" 
        priority 
        alt = {data?.collectionByHandle?.image?.altText}
      />
      }
      <div className = "absolute inset-0 bg-black/50"/>
      <div className = "absolute inset-0 z-10 px-4 pb-16 mx-auto max-w-7xl">
        <div className = "flex flex-col items-start justify-end w-full h-full max-w-sm">
          <div
            className="block prose-h1:font-medium prose-h1:text-4xl prose-h1:text-md prose-p:mt-2 prose-h1:text-white prose-p:text-white prose-p:md:text-lg prose-p:text-base prose-p:font-light prose-h6:text-2xl prose-h6:font-medium prose-h3:text-white prose-h6:text-white prose-h3:font-light prose-h3:text-lg prose-a:hidden"
            dangerouslySetInnerHTML={{ __html: data?.collectionByHandle?.collectionText?.value || data?.collectionByHandle?.descriptionHtml }}
            ref = {textRef}
          />
          {handle && (
            <Link href = {handle ?? '/product/all-products'}>
              <Button text = 'Shop now' CSS = 'bg-background w-max px-4 mt-4 py-2'/>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default CollectionBanner