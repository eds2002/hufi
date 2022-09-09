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
    <section className = "bg-primary1 py-24">
      <div className = "max-w-7xl mx-auto px-4">
        <h1 className = "text-3xl font-bold text-primary2">Love shown worldwide</h1>
        <p className = "text-primary3 mb-10 max-w-md mt-4">Being a company that ships worldwide has allowed us to make
        many friends across the world. Take a look at what they have to say about us!
        </p>
      </div>
      <div className = "w-full  hidden md:grid max-w-7xl px-4 grid-cols-2 md:grid-cols-3 mx-auto  gap-10 place-items-center">
        {testimonials.map((testimonial)=>(
          <div className = {`max-h-[300px] w-full  h-full min-w-[100px] min-h-[200px] p-4 rounded-lg 
          ${testimonial.colorId === 1 && 'bg-primary3 border-2 border-primary2'}
          ${testimonial.colorId === 2 && 'bg-primary2 text-primary1'}
          `}>
            <p>{testimonial.testimonial}</p>
            <span>{testimonial.name}</span>
          </div>
        ))}
      </div>
      <div className = "w-full  grid md:hidden max-w-7xl px-4 grid-cols-2 md:grid-cols-3 mx-auto  gap-10 place-items-center">
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