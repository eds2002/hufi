import { Button } from "../elements";
import { slugify } from "../../utils/slugify";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import Image from "next/image";
export default function Collections({data}) {
  return (
    <section className = "h-[100vh] sm:h-[60vh] bg-background">
      <div className="grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        {data.map((collection)=>(
          <>
            <div className="relative flex">
              <Image
                src={collection.nodes[0]?.image?.originalSrc}
                alt={collection.nodes[0]?.image?.alt}
                className="absolute inset-0 object-cover object-center w-full h-full"
                layout="fill"
                priority
              />
              <div className="relative flex flex-col items-start justify-end w-full p-8 bg-black bg-opacity-60 sm:p-12">
                <div className = {`w-full max-w-xs
                prose-h6:text-sm prose-h6:font-medium prose-h6:text-primary prose-h6:text-opacity-90
                prose-h3:mt-1 prose-h3:text-2xl prose-h3:font-medium prose-h3:text-white
                `}>
                  {collection.nodes[0]?.descriptionHtml ? 
                    <div
                      dangerouslySetInnerHTML={{__html: collection.nodes[0]?.descriptionHtml}}
                    />
                    :
                    <span>
                      <Skeleton animation = "wave" sx={{bgcolor:'grey.500', width:100}}/>
                      <Skeleton animation = "wave" sx={{bgcolor:'grey.500'}}/>
                    </span>
                  }
                  <Link href = {`/collections/${slugify(collection.nodes[0].title)}`}>
                    <a>
                      <Button text = "Shop now" CSS = 'w-30% mt-3'/>
                    </a>
                  </Link>
                </div>          
              </div>
            </div>
          </>
        ))}
      </div>
    </section>
  )
}
