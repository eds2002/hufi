import React from 'react'

const TestimonialsGrid = () => {
  const testimonials = [
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:1,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:2,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:2,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:2,
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
      testimonial:"hufi",
      name:"~ first name",
      colorId:2,
    },
    {
      testimonial:"hufi",
      name:"~ first name",
      colorId:1,
    },
    {
      testimonial:"hufi #hufilove",
      name:"~ first name",
      colorId:2,
    },
  ]
  return (
    <section className = "py-24 bg-primary1">
      <div className = "px-4 mx-auto max-w-7xl">
        <h1 className = "text-3xl font-bold text-primary2">Love shown worldwide</h1>
        <p className = "max-w-md mt-4 mb-10 text-primary3">Being a company that ships worldwide has allowed us to make
        many friends across the world. Take a look at what they have to say about us!
        </p>
      </div>

      {/* DESKTOP GRID */}
      <div className = "hidden w-full grid-cols-2 gap-10 px-4 mx-auto md:grid max-w-7xl md:grid-cols-3 place-items-center">
        {testimonials.map((testimonial,index)=>(
          <div className = {`max-h-[300px] w-full  h-full min-w-[100px] min-h-[200px] p-4 rounded-lg 
          ${testimonial.colorId === 1 && 'bg-primary3'}
          ${testimonial.colorId === 2 && 'bg-primary2 text-primary1'}
          `}
          key = {index}
          >
            <p>{testimonial.testimonial}</p>
            <span>{testimonial.name}</span>
          </div>
        ))}
      </div>

      {/* MOBILE GRID */}
      <div className = "grid w-full grid-cols-2 gap-10 px-4 mx-auto md:hidden max-w-7xl md:grid-cols-3 place-items-center">
        {testimonials.map((testimonial,index)=>(
          <>
            {index < 6 && (
              <div className = {`max-h-[300px] w-full  h-full min-w-[100px] min-h-[200px] p-4 rounded-lg 
              ${testimonial.colorId === 1 && 'bg-primary3'}
              ${testimonial.colorId === 2 && 'bg-primary2 text-primary1'}
              `}>
                <p>{testimonial.testimonial}</p>
                <span>{testimonial.name}</span>
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsGrid