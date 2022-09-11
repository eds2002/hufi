/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <section>
      <div className="relative">
        <div className="relative px-8 py-24 overflow-hidden shadow-2xl bg-primaryVariant ">
          <div className="absolute inset-0 opacity-10 mix-blend-multiply saturate-0 filter">
            <img
              src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center px-4 mx-auto max-w-7xl">
            <blockquote className="max-w-xl mt-6 text-onPrimary">
              <p className="text-xl font-medium text-center sm:text-2xl">
                This app has completely transformed how we interact with customers. We&apos;ve seen record bookings, higher
                customer satisfaction, and reduced churn.
              </p>
              <footer className="mt-6 text-center">
                 <p className="flex flex-col font-medium text-onPrimary/50">
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
