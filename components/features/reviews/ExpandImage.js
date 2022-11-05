import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {StarsComponent} from '../'
import profilePic from '../../../assets/hufiProfilePic.png'
import { useRef } from 'react'
import {CloseButton} from '../'
import { useEffect } from 'react'


export default function ExpandImage({expandImage,setExpandImage,selectedReview}) {
  const imageRef = useRef()
  const containerRef = useRef()
  const [expand,setExpand] = useState(false)
  useEffect(()=>{
    setExpand(false)
  },[expandImage])

  const handleClick = (direction)=>{
    const width = imageRef?.current?.width
    containerRef.current.scrollLeft = direction === 'left' ? containerRef.current.scrollLeft + width * -1 : containerRef.current.scrollLeft + width
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
                <Dialog.Panel className="relative flex flex-col w-full h-[80vh] md:h-[50vh]  max-w-3xl overflow-hidden transition-all transform shadow-xl bg-background rounded-2xl md:flex-row">
                  {/* LEFT SIDE / TOP */}
                  <div className = {`relative md:flex-1 ${expand ? 'h-full' : 'h-[50%]'} md:h-full w-full`}>
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
                    <div 
                      className = "grid grid-flow-col auto-cols-[100%] snap-x snap-mandatory  scrollBar overflow-scroll h-full cursor-pointer w-full" 
                      onClick = {()=>setExpand(!expand)}
                      ref = {containerRef}
                    >
                      {selectedReview?.images?.map((url)=>(
                        <div className = "relative w-full h-full overflow-hidden select-none snap-center" key = {url}>
                          <Image 
                            src = {url} 
                            className = {`${expand ? 'object-contain' : 'object-cover'} w-full h-full`} 
                            ref = {imageRef} 
                            key = {url}  
                            layout ='fill'
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE / BOTTOM */}
                  <div className = {`${expand ? 'hidden' : 'flex'} flex-col justify-center p-6 md:flex-1`}>
                    <div className = "flex justify-between">
                      <div className = "relative flex gap-x-4">
                        <div className = "relative bg-black rounded-full select-none w-11 h-11">
                          {/* Profile pic based off reviewers first letter of first name */}
                          <div className = "inset-0 flex items-center justify-center h-full">
                            <p className = "ml-1 text-2xl font-bold text-white">{selectedReview?.reviewer.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
                          </div>
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
                      {/* {(selectedReview?.country || selectedReview?.state) && (
                        <p className = "mt-6 text-sm text-onSurface/70">Location: {selectedReview?.state ? selectedReview?.state+',' : '' } {selectedReview?.country}</p>
                      )} */}
                    </div>
                  </div>
                  <CloseButton onClick = {()=>setExpandImage(false)}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
    </Transition>
  )
}
