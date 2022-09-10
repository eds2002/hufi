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
const features = [
  {
    name: 'Durable',
    description: 'The leather cover and machined steel disc binding stand up to daily use for years to come.',
  },
  {
    name: 'Refillable',
    description: 'Buy it once and refill as often as you need. Subscribe and save on routine refills.',
  },
  {
    name: 'Thoughtfully designed',
    description:
      'The comfortable disc binding allows you to quickly rearrange pages or combine lined, graph, and blank refills.',
  },
  { name: 'Locally made', description: 'Responsibly and sustainably made real close to wherever you are, somehow.' },
]

export default function ProductFeatures() {
  return (
    <div className="bg-primary3">
      <section aria-labelledby="features-heading" className="relative">
        <div className="overflow-hidden aspect-w-3 aspect-h-2 sm:aspect-w-5 lg:aspect-none lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16">
          <img
            src="https://tailwindui.com/img/ecommerce-images/confirmation-page-01-hero.jpg"
            alt="Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen."
            className="object-cover object-center w-full h-full lg:h-full lg:w-full"
          />
        </div>

        <div className="max-w-2xl px-4 pt-16 pb-24 mx-auto sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32">
          <div className="lg:col-start-2">
            <p className="mt-4 text-4xl font-bold tracking-tight text-primary1">All in the Details</p>
            <p className="mt-4 text-primary1/80">
              We&apos;ve obsessed over every detail of this handcrafted journal to bring you the best materials for daily
              use.
            </p>

            <dl className="grid grid-cols-1 mt-10 text-sm gap-y-10 gap-x-8 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="font-medium text-secondary1">{feature.name}</dt>
                  <dd className="mt-2 text-primary1">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}
