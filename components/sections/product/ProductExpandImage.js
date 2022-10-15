import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/20/solid'
import {StarsComponent} from '../'
import profilePic from '../../../assets/hufiProfilePic.png'
import { useRef } from 'react'
import { CloseButton } from '../../features'
import { useEffect } from 'react'
import { data } from 'autoprefixer'
import { useCallback } from 'react'


export default function ExpandImage({expandImage,setExpandImage,data,expandPos,setExpandPos,containerRef}) {
  return (
    <>
      <Transition appear show={expandImage} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={()=>setExpandImage(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                <Dialog.Panel 
                  className="relative flex flex-col w-full max-w-3xl overflow-hidden transition-all transform shadow-xl md:h-full bg-background rounded-2xl "
                >
                  <div className = "relative flex self-start px-4 pt-4 gap-x-3">
                   <h3 className = "text-2xl font-medium">Media ({data.product.media.nodes.length})</h3>
                  </div>
                  <div className = "flex flex-col h-full lg:flex-row-reverse">  
                    <div className = "w-full h-full p-4 mt-4">
                      <div className = " grid grid-flow-col auto-cols-[100%] h-full overflow-scroll snap-x snap-mandatory scrollBar rounded-md " ref = {containerRef}>
                        {data.product.media.nodes.map((media)=>(
                          <>
                            {media?.image && (
                              <img src = {media?.image?.url} className = "object-cover w-full h-full snap-center" security=''/>
                            )}
                            {media?.sources && (
                              <video
                                src = {media.sources[0].url}
                                controls
                                poster = {media.previewImage.url}
                                className = "object-cover w-full h-full snap-center"
                              />
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                    <div className = "flex gap-3 p-6 overflow-x-scroll overflow-y-hidden rounded-md flex-nowrap scrollBar lg:flex-col">
                      {data.product.media.nodes.map((media,index)=>(
                          <>
                            {media?.image && (
                              <div 
                                className = {`${expandPos === index && ('ring-2 ring-offset-2 ring-secondaryVariant')} w-16 h-16 bg-gray-200 aspect-square cursor-pointer`}
                                onClick = {()=>setExpandPos(index)}
                              >
                                <img src = {media?.image?.url} className = "object-contain snap-center" security=''/>
                              </div>
                            )}
                            {media?.sources && (
                              <div 
                                className = {`${expandPos === index && ('ring-2 ring-offset-2 ring-secondaryVariant')} w-16 h-16 bg-gray-200 aspect-square cursor-pointer relative`}
                                onClick = {()=>setExpandPos(index)}
                              >
                                <img
                                  src = {media.previewImage.url}
                                />
                                <div className = "absolute inset-0 z-10 flex items-center justify-center bg-secondaryVariant/25">
                                  <PlayIcon className = "w-7 h-7 f text-onSecondary"/>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                  <CloseButton onClick = {()=>setExpandImage(false)}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
