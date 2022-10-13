import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import React from 'react'
import { ExpandImage, StarsComponent, WriteReview } from '../../features'
import { Button } from '../../elements'
import { useState } from 'react'
import profilePic from '../../../assets/hufiProfilePic.png'
import {StarIcon} from '@heroicons/react/20/solid'
import { useEffect,useContext } from 'react'
import UserContext from '../../../context/userContext'
import Link from 'next/link'
import { slugify } from '../../../utils/slugify'

const ProductReviews = ({data,reviews}) => {
  const [openWriteReview,setOpenWriteReview] = useState(false)
  const [displayReviews,setDisplayReviews] = useState(reviews ? JSON.parse(reviews) : null)
  const [currentPagination,setCurrentPagination] = useState(1)
  const [startFrom,setStartFrom] = useState(1)
  const [displayLimit,setDisplayLimit] = useState(10)
  const [paginationArray,setPaginationArray] = useState(Array.from(Array(Math.ceil(displayReviews.length / displayLimit)).keys()))
  const [average,setAverage] = useState(0)
  const [expandImage,setExpandImage] = useState(false)
  const [selectedReview,setSelectedReview] = useState(null)
  const {currentUser} = useContext(UserContext)

  
  
  useEffect(()=>{
    if(displayReviews){
      const filter = displayReviews.flatMap(review => review.rating)
      const sumsOfRating = filter.reduce((a,b)=> a+b, 0)
      const avg = (sumsOfRating / filter.length )
      setAverage(avg)
      setPaginationArray(Array.from(Array(Math.ceil(displayReviews.length / displayLimit)).keys()))
    }
  },[displayReviews])

  useEffect(()=>{
    setDisplayReviews(reviews ? JSON.parse(reviews) : null)
  },[reviews])
  
  const handleImageClick = (index) =>{
    setSelectedReview(displayReviews[index])
    setExpandImage(true)
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
    <section className = "py-24 bg-background" id = "reviews">
      <div className = "px-4 mx-auto max-w-7xl">
        <h3 className = "text-3xl font-medium">Reviews ({displayReviews.length})</h3>
        {displayReviews.length > 0 && (
          <>
            <div>
              <div className = "flex mt-4 gap-x-2">
                <p className = "text-3xl font-medium">{average.toFixed(1)}</p>
                <div className = "flex">
                  {[0,1,2,3,4].map((index)=>(
                    <StarIcon 
                      className = {`w-6 h-6  ${index < average.toFixed(0) ? 'text-secondary' : 'text-secondaryVariant/25'}`}
                      key = {index}  
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className = "mt-2 text-lg font-medium text-onBackground/70">{startFrom + currentPagination * displayLimit - displayLimit}-{(currentPagination * displayLimit) > displayReviews.length ? displayReviews.length : currentPagination * displayLimit } of {displayReviews.length} Reviews</p>
          </>
        )}
        <div className = "flex items-center justify-between mt-7">
          <div className = ""> 
            <p className = "cursor-pointer relative py-1 after:absolute after:left-0 after:right-0 after:bg-onBackground after:h-0.5 after:rounded-full after:bottom-0">Reviews</p>
          </div>
          <div className = "">
            {/* Display write review button only if reviews exist, removes excessive write reviews buttons */}
            {displayReviews.length > 0 && (
            <>
              {currentUser ? 
                <Button 
                  onClick = {()=>setOpenWriteReview(true)}
                  text = 'Write a review' 
                  CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                />
              :
              <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
                <Button 
                    onClick
                    text = 'Write a review' 
                    CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                  />
              </Link>
              }
            </>
            )}
          </div>
        </div>
        {displayReviews.length > 0 ? 
        <>
          <div className = "divide-y">
            {displayReviews.map((review,index)=>(
              <>
                {(index + 1 >= (startFrom + currentPagination * displayLimit - displayLimit) && (index+1 <= currentPagination * displayLimit))  && (
                <div className = "py-6">
                  <div className = "flex justify-between">
                    <div className = "relative flex gap-x-4">
                      <div className = "relative rounded-full w-11 h-11 bg-neutral-600">
                        <Image src = {profilePic} layout = 'fill' className = "rounded-full"/>
                        <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
                          <CheckIcon className = "w-3 h-3 text-background"/>
                        </div>
                      </div>
                      <p className = "flex flex-col items-start flex-1 w-full h-full gap-x-3">
                        <span>{review.reviewer}</span>
                        <StarsComponent starRating = {review.rating}/>
                      </p>
                    </div>
                    <p className = "text-sm text-onBackground/25">{formatDate(review.createdAt).month} {formatDate(review.createdAt).day}, {formatDate(review.createdAt).year}</p>
                  </div>
                  <div className = "mt-4">
                    <h3 className = "font-medium text-onSurface">{review.reviewTitle}</h3>
                    <p className = "max-w-2xl mt-3 overflow-hidden text-onSurface/70 text-ellipsis">
                      {review.review}
                    </p>
                    <div className = "mt-4">
                      {review.images.length > 0 && (
                        <div className = "flex gap-x-3 ">
                          {review.images.map((url)=>(
                            <>
                            <div 
                              className = "relative cursor-pointer w-14 h-14" 
                              onClick={()=>handleImageClick(index)}
                            >
                              <Image src = {url} layout = 'fill'/>
                            </div>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                    {(review?.country || review?.state) && (
                      <p className = "mt-6 text-sm text-onSurface/70">Location: {review.state ? review.state+',' : '' } {review.country}</p>
                    )}
                  </div>
                </div>
                )}
              </>
            ))}
          </div>
          {displayReviews.length > displayLimit && (
            <div className = "flex items-center justify-center mt-12 gap-x-6">
              <p onClick = {()=>setCurrentPagination(currentPagination == 1 ? currentPagination : currentPagination - 1)}>
                <ChevronLeftIcon className = "w-5 h-5 cursor-pointer"/>
              </p>
              <div className = "flex gap-x-1.5">
                {paginationArray.map((val)=>(
                  <>
                    <div className = "w-max">
                      <p 
                        className = {`${currentPagination === (val + 1) && ('bg-onBackground text-background ')} transition w-6 h-6 flex items-center justify-center rounded-full cursor-pointer select-none`}
                        onClick = {()=>setCurrentPagination(val+1)}
                      >{val + 1}</p>
                    </div>
                  </>
                ))}
              </div>
              <p onClick = {()=>setCurrentPagination(currentPagination == paginationArray.length ? currentPagination : currentPagination + 1)}>
                <ChevronRightIcon className = "w-5 h-5 cursor-pointer"/>
              </p>
            </div>
          )}
        </>
        :
        <div className = "flex items-center justify-center py-40"> 
          <div className = "">
            <p className = "max-w-sm text-3xl text-center mb-7">Be the first to share your opinions or thoughts.</p>
            <div className = "flex items-center justify-center mx-auto w-max">          
            {currentUser ? 
              <Button 
                onClick = {()=>setOpenWriteReview(true)}
                text = 'Write a review' 
                CSS = 'bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
              />
            :
            <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
              <Button 
                  onClick
                  text = 'Write a review' 
                  CSS = ' bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                />
            </Link>
            }
            </div>
          </div>
        </div>
        }
      </div>
      <ExpandImage expandImage = {expandImage} setExpandImage = {setExpandImage} selectedReview = {selectedReview}/>
      <WriteReview productTitle = {data?.product?.title} openWriteReview = {openWriteReview} setOpenWriteReview = {setOpenWriteReview}/>
    </section>
  )
}

export default ProductReviews