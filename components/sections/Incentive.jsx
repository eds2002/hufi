/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const incentives = [
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: 'Quality ensured',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: 'Refunds',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
]

export default function Incentive() {
  return (
    <div className="bg-primary">
      <div className="py-24 mx-auto max-w-7xl sm:px-2 sm:py-32 lg:px-4">
        <div className="max-w-2xl px-4 mx-auto lg:max-w-none">
          <div className = "flex flex-col items-center justify-center max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-onPrimary">
              Shop with 
              {' '}
              <span className = "relative z-10 sm:px-4"> 
                <span className = "relative z-10">confidence.</span>
                <span className = "absolute bottom-0 left-0 right-0 top-6 sm:top-10 bg-secondaryVariant"></span>
              </span>
            </h2>
            <p className="mt-4 text-sm text-onPrimary/80 xl:text-lg sm:text-base">
              We believe that every customer deserves a personalized, professional experience with each visit to our store. And we&apos;re dedicated to providing it!
            </p>
          </div>
          <div className="grid grid-cols-1 mt-16 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block ">
                <div className="sm:flex-shrink-0">
                  <img className="w-16 h-16" src={incentive.imageSrc} alt="" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-onPrimary">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-onPrimary/80">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
