/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <section>
      <div className="relative">
        <div className="relative overflow-hidden bg-primary3 py-24 px-8 shadow-2xl ">
          <div className="absolute inset-0 opacity-10 mix-blend-multiply saturate-0 filter">
            <img
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative  max-w-7xl px-4 mx-auto flex items-center justify-center flex-col">
            <blockquote className="mt-6 text-primary1 max-w-xl">
              <p className="text-xl font-medium sm:text-2xl text-center">
                This app has completely transformed how we interact with customers. We've seen record bookings, higher
                customer satisfaction, and reduced churn.
              </p>
              <footer className="mt-6 text-center">
                <p className="flex flex-col font-medium text-secondary1">
                  <span>~ Hufi </span>
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
