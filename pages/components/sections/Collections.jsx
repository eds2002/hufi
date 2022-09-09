import { Button } from "../elements";

/* This example requires Tailwind CSS v2.0+ */
export default function Collections() {
  return (
    <section className = "h-[100vh] sm:h-[60vh]">
      <div className="grid min-h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative flex">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <div className = "max-w-xs w-full ">
              <h2 className="text-sm font-medium text-primary1 text-opacity-90">Self-Improvement</h2>
              <p className="mt-1 text-2xl font-medium text-primary1">Journals and note-taking</p>
              <Button text = "Shop now" CSS = 'w-30% mt-3'/>
            </div>          
          </div>
        </div>
        <div className="relative flex">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
         <div className="relative flex w-full flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <div className = "max-w-xs w-full">
              <h2 className="text-sm font-medium text-primary1 text-opacity-90">All products</h2>
              <p className="mt-1 text-2xl font-medium text-primary1">View all of our products</p>
              <Button text = "Shop now" CSS = 'mt-3'/>
            </div>          
          </div>
        </div>
      </div>
    </section>
  )
}
