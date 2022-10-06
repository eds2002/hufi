import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from '../elements'

export default function RefundsModal({refundsModal,setRefundsModal}) {

  return (
    <>
      <Transition appear show={refundsModal} as={Fragment}>
        <Dialog as="div" className="relative z-[9999999999]" onClose={()=>setRefundsModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h3
                    className="text-3xl font-medium text-gray-900"
                  >
                    Refunds and replacements within 30 days.
                  </h3>
                  <div className="mt-4">
                    <p className="text-base text-gray-500">
                    Whether you dislike the purchase you made, or perhaps something went wrong during shipping and handling, we offer you a 30-day protection plan. View the orders page to request refunds or replacements.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      text = 'Back to my order'
                      CSS = 'bg-secondaryVariant hover:bg-secondary py-2 text-onSecondary w-auto px-4'
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>setRefundsModal(false)}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
