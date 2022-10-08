import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {StarsComponent} from '../'

import profilePic from '../../../assets/hufiProfilePic.png'
import { useRef } from 'react'
import { useEffect } from 'react'

export default function MyModal({expandImage,setExpandImage,selectedReview}) {
  const imageRef = useRef()
  const containerRef = useRef()

  const handleClick = (direction)=>{
    const width = imageRef?.current?.width
    containerRef.current.scrollLeft = direction === 'left' ? width * -1 : width
  }


  const formatDate = (userDate,monthAdd) =>{
    const num = monthAdd ?? 0
  
    const removeTime = new Date (new Date(userDate).toDateString())
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = new Date(removeTime).getMonth()
    const day = new Date(removeTime).getDate()
    const year = new Date(removeTime).getFullYear()
    return {
      month:months[month + num],
      day:day,
      year:year,
    }
  }

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
                <Dialog.Panel className="flex flex-col w-full max-w-3xl overflow-hidden transition-all transform shadow-xl bg-background rounded-2xl md:flex-row">
                  <div className = "relative md:flex-1">
                    {selectedReview?.images?.length > 1 && (
                      <div className = "absolute inset-0 z-10 flex items-center justify-between p-3 pointer-events-none">
                        <ChevronLeftIcon 
                          className = "w-5 h-5 rounded-full pointer-events-auto bg-background/100"
                          onClick = {()=>handleClick('left')}
                        />
                        <ChevronRightIcon 
                          onClick = {()=>handleClick('right')}
                          className = "w-5 h-5 rounded-full pointer-events-auto bg-background/100"
                        />
                      </div>
                    )}
                    <div className = "grid grid-flow-col auto-cols-[100%] overflow-scroll snap-x snap-mandatory aspect-video md:aspect-square scrollBar" ref = {containerRef}>
                      {selectedReview?.images?.map((url)=>(
                        <div className = "relative w-full h-full overflow-scroll snap-center" key = {url}>
                          <img src = {url} className = "object-cover w-full h-full" ref = {imageRef} key = {url}/>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className = "p-6 md:flex-1">
                    <div className = "flex justify-between">
                      <div className = "relative flex gap-x-4">
                        <div className = "relative rounded-full select-none w-11 h-11 bg-neutral-600">
                          <Image src = {profilePic} layout = 'fill' className = "rounded-full"/>
                          <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
                            <CheckIcon className = "w-3 h-3 text-background"/>
                          </div>
                        </div>
                        <p className = "flex flex-col items-start flex-1 w-full h-full gap-x-3">
                          <span>{selectedReview?.reviewer}</span>
                          <StarsComponent starRating = {selectedReview?.rating}/>
                        </p>
                      </div>
                      <p className = "text-sm text-onBackground/25">{formatDate(selectedReview?.createdAt).month} {formatDate(selectedReview?.createdAt).day}, {formatDate(selectedReview?.createdAt).year}</p>
                    </div>
                    <div className = "mt-4 text-left">
                      <h3 className = "font-medium text-onSurface">{selectedReview?.reviewTitle}</h3>
                      <p className = "max-w-2xl mt-3 overflow-hidden text-onSurface/70 text-ellipsis">
                        {selectedReview?.review}
                      </p>
                      {(selectedReview?.country || selectedReview?.state) && (
                        <p className = "mt-6 text-sm text-onSurface/70">Location: {selectedReview?.state ? selectedReview?.state+',' : '' } {selectedReview?.country}</p>
                      )}
                    </div>
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
