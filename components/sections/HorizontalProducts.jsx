import { Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import {slugify} from '../../utils/slugify'
export default function HorizontalProducts({data:{products}}) {
  return (
    <div className="py-24 bg-primary1">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32">
          <p className = "text-3xl font-semibold text-left text-2 text-primary2">Trending products.</p>
          <p className = "text-primary3">View our most popular items!</p>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {products.edges.map((product) => (
              <div key={product.node.title} className="relative group">
                <div className="relative w-full overflow-hidden rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  {product.node?.media.nodes[0].previewImage.url ?
                    <Image
                      src={product.node?.media.nodes[0].previewImage.url}
                      alt={product.node?.media.nodes[0].previewImage.alt}
                      layout="fill"
                      className="object-cover object-center w-full h-full"
                    />
                    :
                    <Skeleton height={300} animation="wave"/>
                  }
                </div>
                <h3 className="mt-6 text-sm text-secondary1">
                  <Link href = {`/product/${slugify(product.node?.title)}`}>
                    <a>
                      <span className="absolute inset-0" />
                      {product.node?.title || 
                      <span>
                        <Skeleton variant = "text" sx={{fontSize:"1rem", width:50}} animation="wave"/>
                      </span>  
                      }
                    </a>
                  </Link>
                </h3>
                <p className="text-base font-semibold text-primary2">
                  {product.node.metafield?.value || 
                  <span>
                    <Skeleton variant = "text" sx={{fontSize:"1rem"}} animation="wave"/>
                    <Skeleton variant = "text" sx={{fontSize:"1rem", width:150}} animation="wave"/>
                  </span>
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
