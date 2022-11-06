import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment, useState,useCallback } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import {StarsComponent} from '../'
import { useRef } from 'react'
import {CloseButton} from '../'
import { useEffect } from 'react'


export default function ExpandImage({expandImage,setExpandImage,selectedReview,selectedMediaIndex}) {
  const containerRef = useRef()
  const [expand,setExpand] = useState(false)
  const [imagePos,setImagePos] = useState(0)

  useEffect(()=>{
    setExpand(false)
  },[expandImage])

  useEffect(()=>{
    if(expandImage){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = ""
    }
  },[expandImage])

  const handleScroll = useCallback(()=>{
    if(Number.isInteger(parseInt(containerRef.current.scrollLeft) / parseInt(containerRef.current.clientWidth))){
      setImagePos(containerRef.current.scrollLeft / containerRef.current.clientWidth)
    }
  },[containerRef.current])

  useEffect(()=>{
    const div = containerRef.current
    div?.addEventListener("scroll",handleScroll)
  },[handleScroll])



  useEffect(()=>{
    containerRef.current.scrollLeft = containerRef.current.clientWidth * selectedMediaIndex || 0
  },[expandImage])

  const handleModalBgClick = (e) =>{
    if(e.target.id === "bg"){
      setExpandImage(false)
    }
  }


  return (
    <div 
      id = "background"
      className = {`fixed inset-0 bg-black/40 z-[99999999999] pointer-events-none ${expandImage ? "opacity-100" : 'opacity-0'}`}
      onClick = {(e)=>handleModalBgClick(e)}
    >
      <div 
        className={`relative z-[99999] ${expandImage ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex items-center justify-center w-full h-full `} 
        onClose={()=>setExpandImage(false)}
        id = "bg"
      >
          <div className="flex items-center justify-center p-4 text-center h-[70vh] overflow-hidden w-max">
              <div className="relative flex flex-col h-full max-w-3xl overflow-hidden transition-all transform shadow-xl bg-background rounded-2xl md:flex-row">
                <Media 
                  expand={expand} 
                  setExpand={setExpand} 
                  containerRef={containerRef} 
                  imagePos={imagePos} 
                  selectedReview ={selectedReview}
                  expandImage = {expandImage}
                />
                <Review 
                  expand={expand} 
                  selectedReview={selectedReview}
                />
                <CloseButton onClick = {()=>setExpandImage(false)}/>
              </div>
          </div>
      </div>
    </div>
  )
}

function Review({expand,selectedReview}){
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
  return(
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
      </div>
    </div>
  )
}

function Media({expand,setExpand,containerRef,imagePos,selectedReview,expandImage}){
  const videoRef = useRef()

  useEffect(()=>{
    if(!expandImage) {
      videoRef.current?.pause()
    }
  },[expandImage])

  return(
    <div className = {`relative w-full  ${expand ? 'h-full w-screen' : 'h-[50%] md:h-full w-screen'} md:flex-1`}>
      <div className = "absolute z-10 flex items-center justify-between p-3 pointer-events-none ">
        <div className = "px-4 bg-background py-0.5 rounded-full backdrop-blur-md text-sm font-medium">
        {imagePos+1}/{selectedReview?.images?.length}
        </div>
      </div>
      <div 
        className = "grid grid-flow-col auto-cols-[100%] snap-x snap-mandatory  scrollBar overflow-scroll h-full cursor-pointer w-full" 
        onClick = {()=>setExpand(!expand)}
        ref = {containerRef}
      >
        {selectedReview?.images?.map((url)=>(
          <div className = "relative w-full h-full mx-auto overflow-hidden select-none snap-center" key = {url}>
            {url.includes('mp4') ? 
            <div className = "flex items-center justify-center w-full h-full bg-black">
              <video controls className = "w-full h-full" ref = {videoRef}>
                <source src = {url} type = "video/mp4"/>
              </video>
            </div>
            :
            <div className = "w-full h-full bg-neutral-200 ">
              <Image 
                src = {url} 
                className = {`${expand ? 'object-contain' : 'object-cover'} w-full h-full`} 
                key = {url}  
                layout ='fill'
              />
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}


