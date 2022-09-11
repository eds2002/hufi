import Image from "next/image"

export default function ProductFeatures({data}) {
  console.log(data.product.imageOneText)
  return (
    <section className="bg-primary3">

      {data?.product?.imageOne?.reference?.image?.url ? 
        <div aria-labelledby="features-heading" className="relative h-[40vh] md:h-[60vh] w-full`">
          <div className="absolute inset-0 w-full">
            <Image
              src={data.product.imageOne.reference.image.url}
              alt={data.product.imageOne.reference.image.altText}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
              layout ='fill'
              priority
            />
            <div className = "absolute inset-0 bg-black/50"/>
            <div className = "absolute inset-0 flex items-center justify-start px-4 mx-auto max-w-7xl">
              <div
                className="max-w-sm prose-h1:text-primaryVariant prose-h1:text-2xl prose-p:text-primary/80 prose-p:mt-2 prose-p:lg:text-lg prose-p:sm:text-base prose-p:text-sm"
                dangerouslySetInnerHTML={{ __html: data.product.imageOneText.value }}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }
      {data?.product?.imageTwo?.reference?.image?.url ? 
        <div aria-labelledby="features-heading" className="relative h-[40vh] md:h-[60vh] w-full`">
          <div className="absolute inset-0 w-full">
            <Image
              src={data.product.imageTwo.reference.image.url}
              alt={data.product.imageTwo.reference.image.altText}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
              layout ='fill'
              priority
            />
            <div className = "absolute inset-0 bg-black/50"/>
            <div className = "absolute inset-0 flex items-center justify-end px-4 mx-auto text-end max-w-7xl">
              <div
                className="max-w-sm prose-h1:text-primaryVariant prose-h1:text-2xl prose-p:text-primary/80 prose-p:mt-2 prose-p:lg:text-lg prose-p:sm:text-base prose-p:text-sm"
                dangerouslySetInnerHTML={{ __html: data.product.imageTwoText.value }}
              />
            </div>
          </div>
        </div>
        :
        <></>
      }

      {data?.product?.imageThree?.reference?.image?.url ? 
        <div aria-labelledby="features-heading" className="relative h-[40vh] md:h-[60vh] w-full`">
          <div className="absolute inset-0 w-full">
            <Image
              src={data.product.imageThree.reference.image.url}
              alt={data.product.imageThree.reference.image.altText}
              className="object-cover object-center w-full h-full lg:h-full lg:w-full"
              layout ='fill'
              priority
            />
            <div className = "absolute inset-0 bg-black/40"/>
            <div className = "absolute inset-0 flex items-center justify-start px-4 mx-auto max-w-7xl">
              <div
                className="max-w-sm prose-h1:text-primaryVariant prose-h1:font-medium prose-h1:text-2xl prose-p:text-primary prose-p:mt-2 prose-p:lg:text-lg prose-p:sm:text-base prose-p:text-sm"
                dangerouslySetInnerHTML={{ __html: data.product.imageThreeText.value }}
              />
            </div>
          </div>
        </div>
      :
        <></>
      }
    </section>
  )
}
