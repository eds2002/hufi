import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Button } from '../elements'
import { CloseButton } from '../features'

export default function SizeModal({sizeModal,setSizeModal,sizing}) {
  const [sizingData,setSizingData] = useState(sizing != undefined ? JSON.parse(sizing) : undefined)
  const [selectedSize,setSelectedSize] = useState("Inches")
  return (
    <Transition appear show={sizeModal} as={Fragment}>
      <Dialog as="div" className="relative z-[9999999999]" onClose={()=>setSizeModal(false)}>
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
              <Dialog.Panel className="relative p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl w-max rounded-2xl">
                <div className = "flex items-center text-xl gap-x-3">
                  <p 
                    className = {`${selectedSize === "Inches" && ("relative after:content-[''] after:absolute after:h-0.5 after:bg-black after:bottom-0 after:w-full after:left-0")} cursor-pointer`}
                    onClick = {()=>setSelectedSize("Inches")}
                  >Inches</p>
                  <p 
                    className = {`${selectedSize === "Centimeters" && ("relative after:content-[''] after:absolute after:h-0.5 after:bg-black after:bottom-0 after:w-full after:left-0")} cursor-pointer`}
                    onClick = {()=>setSelectedSize("Centimeters")}
                  >Centimeters</p>
                </div>
                <div className="py-4 mt-4">
                  <table className = "border">
                    <tr className = "text-white bg-black divide-x divide-white/60">
                      <th className = "px-3 font-medium text-center">Size</th>
                      <th className = "px-3 font-medium text-center">Waist</th>
                      <th className = "px-3 font-medium text-center">Hip</th>
                      <th className = "px-3 font-medium text-center">Pant Length</th>
                    </tr>
                    {selectedSize === "Inches" && (
                      <>
                        {sizingData.in.map((inchesData)=>(
                          <>
                            <tr>
                              <td className = "text-center">S</td>
                              <td className = "p-2 text-center">{inchesData.s.waist}</td>
                              <td className = "p-2 text-center">{inchesData.s.hip}</td>
                              <td className = "p-2 text-center">{inchesData.s.pantLength}</td>
                            </tr>
                            <tr className = "bg-neutral-200">
                              <td className = "text-center">M</td>
                              <td className = "p-2 text-center">{inchesData.m.waist}</td>
                              <td className = "p-2 text-center">{inchesData.m.hip}</td>
                              <td className = "p-2 text-center">{inchesData.m.pantLength}</td>
                            </tr>
                            <tr>
                              <td className = "text-center">L</td>
                              <td className = "p-2 text-center">{inchesData.l.waist}</td>
                              <td className = "p-2 text-center">{inchesData.l.hip}</td>
                              <td className = "p-2 text-center">{inchesData.l.pantLength}</td>
                            </tr>
                            <tr className = "bg-neutral-200">
                              <td className = "text-center">XL</td>
                              <td className = "p-2 text-center">{inchesData.xl.waist}</td>
                              <td className = "p-2 text-center">{inchesData.xl.hip}</td>
                              <td className = "p-2 text-center">{inchesData.xl.pantLength}</td>
                            </tr>
                            <tr>
                              <td className = "text-center">XXL</td>
                              <td className = "p-2 text-center">{inchesData.xxl.waist}</td>
                              <td className = "p-2 text-center">{inchesData.xxl.hip}</td>
                              <td className = "p-2 text-center">{inchesData.xxl.pantLength}</td>
                            </tr>
                            <tr className = "bg-neutral-200">
                              <td className = "text-center">XXXL</td>
                              <td className = "p-2 text-center">{inchesData.xxxl.waist}</td>
                              <td className = "p-2 text-center">{inchesData.xxxl.hip}</td>
                              <td className = "p-2 text-center">{inchesData.xxxl.pantLength}</td>
                            </tr>
                          </>
                        ))}
                      </>
                    )}
                    {selectedSize === "Centimeters" && (
                      <>
                        {sizingData.cm.map((cmData)=>(
                          <>
                            <tr className = "">
                              <td className = "text-center">S</td>
                              <td className = "p-2 text-center">{cmData.s.waist}</td>
                              <td className = "p-2 text-center">{cmData.s.hip}</td>
                              <td className = "p-2 text-center">{cmData.s.pantLength}</td>
                            </tr>
                            <tr className = " bg-neutral-200">
                              <td className = "text-center">M</td>
                              <td className = "p-2 text-center">{cmData.m.waist}</td>
                              <td className = "p-2 text-center">{cmData.m.hip}</td>
                              <td className = "p-2 text-center">{cmData.m.pantLength}</td>
                            </tr>
                            <tr className = "">
                              <td className = "text-center">L</td>
                              <td className = "p-2 text-center">{cmData.l.waist}</td>
                              <td className = "p-2 text-center">{cmData.l.hip}</td>
                              <td className = "p-2 text-center">{cmData.l.pantLength}</td>
                            </tr>
                            <tr className = " bg-neutral-200">
                              <td className = "text-center">XL</td>
                              <td className = "p-2 text-center">{cmData.xl.waist}</td>
                              <td className = "p-2 text-center">{cmData.xl.hip}</td>
                              <td className = "p-2 text-center">{cmData.xl.pantLength}</td>
                            </tr>
                            <tr className = "">
                              <td className = "text-center">XXL</td>
                              <td className = "p-2 text-center">{cmData.xxl.waist}</td>
                              <td className = "p-2 text-center">{cmData.xxl.hip}</td>
                              <td className = "p-2 text-center">{cmData.xxl.pantLength}</td>
                            </tr>
                            <tr className = " bg-neutral-200">
                              <td className = "text-center">XXXL</td>
                              <td className = "p-2 text-center">{cmData.xxxl.waist}</td>
                              <td className = "p-2 text-center">{cmData.xxxl.hip}</td>
                              <td className = "p-2 text-center">{cmData.xxxl.pantLength}</td>
                            </tr>
                          </>
                        ))}
                      </>
                    )}
                  </table>
                </div>

                <div className="mt-4">
                  <Button
                    text = 'Back to my order'
                    CSS = 'bg-secondaryVariant hover:bg-secondary py-2 text-onSecondary w-auto px-4'
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={()=>setSizeModal(false)}
                  />
                </div>
                <CloseButton onClick = {()=>setSizeModal(false)}/>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

