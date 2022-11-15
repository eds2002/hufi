import {PlayIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { CloseButton } from '../../features'


export default function ExpandImage({expandImage,setExpandImage,data,expandPos,setExpandPos,containerRef}) {
  const handleOutsideModalClick = (e) =>{
    if(e.target.id === "outside") {
       setExpandImage(false)
    }
  }

  useEffect(()=>{
    if(expandImage){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = ""
    }
  },[expandImage])
  return (
    <>
      <div className = {`${expandImage ? 'pointer-events-auto opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative z-[99999]" onClick = {(e)=>handleOutsideModalClick(e)}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center" id = "outside">
                <div
                  className="relative flex flex-col w-full max-w-lg overflow-hidden transition-all transform shadow-xl lg:max-w-3xl bg-background rounded-2xl "
                >
                  <div className = "relative flex self-start px-4 pt-4 gap-x-3 ">
                   <h3 className = "text-2xl font-medium">Media ({data.product.media.nodes.filter((media)=>{
                        if(media?.image){
                          if(media.image.altText) return media
                        }
                        if(media?.previewImage){
                          if(media?.previewImage?.altText) return media
                        }
                      }).length})</h3>
                  </div>

                  
                  <div className = "flex flex-col lg:flex-row-reverse">  
                    {/* Media Carousel */}
                    <div className = "w-full p-4 mt-4">
                      <div className = " grid grid-flow-col auto-cols-[100%]  overflow-scroll snap-x snap-mandatory scrollBar rounded-md  w-full " ref = {containerRef}>
                      {data.product.media.nodes.filter((media)=>{
                        if(media?.image){
                          if(media.image.altText) return media
                        }
                        if(media?.previewImage){
                          if(media.previewImage.altText) return media
                        }
                      }).map((media)=>(
                          <>
                            {media?.image && (
                              <img src = {media?.image?.url} className = "object-cover w-full h-full snap-center" security=''/>
                            )}
                            {media?.sources && (
                              <div className = "flex justify-center w-full h-full bg-black aspect-square "> 
                                <video
                                  src = {media.sources[0].url}
                                  controls
                                  poster = {media.previewImage.url}
                                  className = "object-contain h-full snap-center"
                                />
                              </div>
                            )}
                          </>
                        ))
                      }
                      </div>
                    </div>

                    
                    {/* Display all media  */}
                    <div className = "flex gap-3 p-6 overflow-scroll rounded-md flex-nowrap scrollBar lg:flex-col lg:h-[80vh] my-auto">
                    {data.product.media.nodes.filter((media)=>{
                        if(media?.image){
                          if(media.image.altText) return media
                        }
                        if(media?.previewImage){
                          if(media?.previewImage?.altText) return media
                        }
                      }).map((media,index)=>(
                        <>
                          {media?.image && (
                            <div 
                              className = {`${expandPos === index && ('ring-2 ring-offset-2 ring-secondaryVariant')} aspect-square h-16 w-16 bg-gray-200  cursor-pointer `}
                              onClick = {()=>setExpandPos(index)}
                            >
                              <img src = {media?.image?.url} className = "object-contain w-full h-full snap-center" security=''/>
                            </div>
                          )}
                          {media?.sources && (
                            <div 
                              className = {`${expandPos === index && ('ring-2 ring-offset-2 ring-secondaryVariant')} aspect-square h-16 w-16 bg-gray-200  cursor-pointer relative`}
                              onClick = {()=>setExpandPos(index)}
                            >
                              <img
                                className = "object-contain w-full h-full snap-center"
                                src = {media.previewImage.url}
                              />
                              <div className = "absolute inset-0 z-10 flex items-center justify-center bg-secondaryVariant/25">
                                <PlayIcon className = "w-7 h-7 f text-onSecondary"/>
                              </div>
                            </div>
                          )}
                        </>
                      ))
                    }
                    </div>
                  </div>
                  <CloseButton onClick = {()=>setExpandImage(false)}/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
