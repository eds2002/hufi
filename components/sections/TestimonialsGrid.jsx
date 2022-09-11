import React from 'react'

const TestimonialsGrid = () => {
  const testimonials = [
    {
      testimonial:"Hufi has been by goto for essentials I might need. I always never complain when I buy from here!",
      name:"~ Austin M.",
      colorId:1,
    },
    {
      testimonial:"I always recommend new buyers to visit Hufi. Their products are incredible unique, I often find myself shopping about the whole store!",
      name:"~ Anna T.",
      colorId:2,
    },
    {
      testimonial:"Hufi is for the customers. If a product of mine breaks, Hufi is guaranteed to refund me my money with no exchanges. #hufilove",
      name:"~ Jenna T.",
      colorId:1,
    },
    {
      testimonial:"This is probably one of my favorite stores to browse on. I love the unique products they have to offer. I wish the shipping time was just a little bit quicker so I can enjoy my products though!",
      name:"~ Emma B.",
      colorId:1,
    },
    {
      testimonial:"hufi",
      name:"~ Anthony H.",
      colorId:2,
    },
    {
      testimonial:"hufi",
      name:"~ Ashley B.",
      colorId:1,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:1,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:1,
    },
    {
      testimonial:"This is probably one of my favorite stores to browse on. I love the unique products they have to offer. I wish the shipping time was just a little bit quicker so I can enjoy my products though!",
      name:"~ Emma B.",
      colorId:2,
    },
  ]
  return (
    <section className = "py-24 bg-background">
      <div className = "flex flex-col items-center justify-center px-4 mx-auto text-center max-w-7xl">
        <h1 className = "text-4xl font-bold sm:text-5xl xl:text-6xl text-onBackground">Love shown worldwide ❤️</h1>
        <p className = "max-w-lg mt-4 mb-10 text-sm text-onBackground/80 sm:text-base xl:text-lg">Being a company that ships worldwide has allowed us to make
        many friends across the world. Take a look at what they have to say about us!
        </p>
      </div>

      {/* DESKTOP GRID */}
      <div className = "w-full gap-10 px-4 mx-auto columns-2 sm:columns-3 max-w-7xl">
        {testimonials.map((testimonial,index)=>(
          <div className = {`${index > 5 ? ('sm:block hidden') : ('block')} w-full  h-full min-w-[100px]  p-4 rounded-lg mb-10 break-inside-avoid shadow-sm
          ${testimonial.colorId === 1 && 'bg-primaryVariant'}
          ${testimonial.colorId === 2 && 'bg-secondaryVariant'}
          `}
          key = {index}
          >
            <p className = {`
            ${testimonial.colorId === 1 && ('text-onPrimary')} 
            ${testimonial.colorId === 2 && ('text-onSecondary')}
            md:text-lg text-base
            `}>{testimonial.testimonial}</p>
            <p className = {`
              ${testimonial.colorId === 1 && ('text-onPrimary/60 font-medium')} 
              ${testimonial.colorId === 2 && ('text-onSecondary/60 font-medium')}
              mt-6
            `}>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsGrid