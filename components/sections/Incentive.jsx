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
    <div className="bg-primary3">
      <div className="py-24 mx-auto max-w-7xl sm:px-2 sm:py-32 lg:px-4">
        <div className="max-w-2xl px-4 mx-auto lg:max-w-none">
          <div className="grid items-center grid-cols-1 gap-y-10 gap-x-16 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-primary1">
                Shop with confidence.
              </h2>
              <p className="mt-4 text-primary1/90">
                Our team of experts, supported by the world&apos;s largest selection of products, is here to help you find the perfect fit for your needs and budget. We believe that every customer deserves a personalized, professional experience with each visit to our store. And we&apos;re dedicated to providing it!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-16 gap-y-10 gap-x-8 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block ">
                <div className="sm:flex-shrink-0">
                  <img className="w-16 h-16" src={incentive.imageSrc} alt="" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-primary1">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-primary1/90 ">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
