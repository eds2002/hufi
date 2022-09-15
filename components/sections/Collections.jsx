import { Button } from "../elements";
import { slugify } from "../../utils/slugify";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import Image from "next/image";
export default function Collections({data, style}) {
  return (
    <>
        {data && (
          <section className = "py-24 bg-background">
            <div className = "px-4 mx-auto max-w-7xl">
              <h1 className = "mb-6 text-2xl font-medium">{data.heading.title ?? 'Collection Heading'}</h1>
            </div>
            <div className={`grid gap-6 px-4 mx-auto ${style == "row" ? 'lg:grid-cols-3' : 'lg:grid-cols-2' } max-w-7xl ${style == "row" || data.collectionTitles.length === 2 ? "min-h-[50vh]" : "min-h-[100vh]"} ${style === "row" && ('grid-flow-col auto-cols-[90%] ')} overflow-scroll`}>        
              {data.collectionTitles.map((collection,index)=>(
                <div key = {index} className={`relative flex ${index === 0 && data.collectionTitles.length === 3 && style != "row" && 'md:row-span-2'} h-[60vh] md:h-full rounded-md overflow-hidden `}>
                  <Image
                    src={collection.collections.nodes[0]?.image.originalSrc}
                    alt={collection.collections.nodes[0]?.image.altText}
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    layout="fill"
                    priority
                  />
                  <div className="relative flex flex-col items-start justify-end w-full p-8 bg-black bg-opacity-60 sm:p-12">
                    <div className = {`w-full max-w-xs
                    prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90
                    prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white
                    `}>
                      {collection.collections.nodes[0]?.descriptionHtml ? 
                        <div
                          dangerouslySetInnerHTML={{__html: collection.collections.nodes[0]?.descriptionHtml}}
                        />
                        :
                        <span>
                          <Skeleton animation = "wave" sx={{bgcolor:'grey.500', width:100}}/>
                          <Skeleton animation = "wave" sx={{bgcolor:'grey.500'}}/>
                        </span>
                      }
                      <Link href = {`/collections/${slugify(collection.collections.nodes[0].title)}`}>
                        <a>
                          <Button text = "Shop" CSS = ' mt-3 w-24 py-1'/>
                        </a>
                      </Link>
                    </div>          
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
    </>
  )
}
