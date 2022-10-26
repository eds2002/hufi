import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FAQ({data}) {
  const reviews = data?.product?.faqs?.value ? JSON.parse(data?.product?.faqs?.value) : undefined
  return (
    <>
    {reviews && (
      <div className="py-24 bg-surface">
        <div className="px-4 mx-auto max-w-7xl sm:py-16 ">
          <div className="mx-auto mt-10 divide-y-2 divide-onBackground/10 ">
            <h2 className="text-3xl font-medium tracking-tight text-left text-onBackground sm:text-4xl">
              Frequently asked questions ({reviews.length})
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {reviews.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
