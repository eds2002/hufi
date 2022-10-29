import Image from "next/image"
const benefits = [
  {
    icon:"https://cdn-icons-png.flaticon.com/512/411/411763.png",
    title:'Fast, free shipping on orders over $75+',
    paragraph: 'Fast shipping is a always a standard when shopping with us.'
  },
  {
    icon:"https://cdn-icons-png.flaticon.com/512/679/679720.png",
    title:'100% recyacble packaging',
    paragraph: 'We support our earth 100%. We only use recyclable materials.'
  },
  {
    icon:"https://cdn-icons-png.flaticon.com/512/3856/3856515.png",
    title:'30 day money back guarantee',
    paragraph: 'Not satisfied with us? Return it for free.'
  },
]

const ProductBenefits = () => {
  return (
    <section className = "py-16 bg-surface/50">
      <div className = "px-4 mx-auto max-w-7xl">
        <h6 className = "text-3xl font-medium text-center">Good to know</h6>
        <div className = "flex flex-col gap-12 mt-10 lg:items-center lg:justify-center lg:flex-row">
          {benefits.map((benefit)=>(
            <div 
              className = "flex flex-col items-center justify-center w-full h-full max-w-xs mx-auto text-center"
              key = {benefit.title}
            >
              <div className = "relative w-16 h-16 pointer-events-none select-none">
                <Image src = {benefit.icon} layout = 'fill'/>
              </div>
              <p className = "mt-3 font-medium lg:text-lg">{benefit.title}</p>
              <p className = "text-sm lg:text-base">{benefit.paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductBenefits