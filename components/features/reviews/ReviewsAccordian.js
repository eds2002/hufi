import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid"
import { useContext } from "react"
import { useState,useEffect } from "react"
import UserContext from "../../../context/userContext"
import { Button } from "../../elements"
import StarsComponent from "./StarsComponent"
import {slugify} from '../../../utils/slugify'
import Link from "next/link"
import ReviewsModal from "./ReviewsModal"
import {CheckIcon} from "@heroicons/react/20/solid"
import Image from "next/image"
import WriteReview from "./WriteReview"
import profilePic from '../../../assets/hufiProfilePic.png'
import {ExpandImage} from '../'

const ReviewsAccordian = ({currentProduct, setOpenReviewsModal,reviews,data}) => {
  const {currentUser} = useContext(UserContext)
  const [openWriteReview,setOpenWriteReview] = useState(false)
  const [displayReviews,setDisplayReviews] = useState(reviews ? JSON.parse(reviews) : null)
  const [open,setOpen] = useState(false)
  const [average,setAverage] = useState(0)
  const [expandImage,setExpandImage] = useState(false)
  const [selectedReview,setSelectedReview] = useState(null)
  useEffect(()=>{
    if(displayReviews.length != 0){
      const filter = displayReviews.flatMap(review => review.rating)
      const sumsOfRating = filter.reduce((a,b)=> a+b, 0)
      const avg = (sumsOfRating / filter.length )
      setAverage(avg)
    }else{
      setAverage(0)
    }
  },[displayReviews])

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
    <div className = "mt-1">
      <div className = "prose-h3">
        <div className = "w-full h-full rounded-md bg-surface">
          <div className = {`flex items-center justify-between w-full px-4 py-2 transition rounded-md cursor-pointer  ${open ? 'bg-primary' : 'bg-surface'}`}
          onClick = {()=>setOpen(!open)}
          >
            <div className = "flex items-center">  
              <h3 className = "font-medium text-onSurface">Reviews ({displayReviews.length})</h3>
            </div>
            <div className = "flex items-center">
                <StarsComponent starRating = {average ?? 0}/>
                <ChevronDownIcon className = {`w-5 h-5 ${open ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
          </div>
          {open && (
            <div className = "p-4">
              <div className = "divide-y">
                {displayReviews.map((review,index)=>(
                  <>
                    {index < 2 && (
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
                          <p className = "max-w-2xl mt-3 text-onSurface/70">
                            {review.review}
                          </p>
                          <div className = "mt-4">
                            {review.images.length > 0 && (
                              <div className = "flex gap-x-3 ">
                                {review.images.map((url)=>(
                                  <div 
                                    className = "relative cursor-pointer w-14 h-14" 
                                    onClick={()=>handleImageClick(index)}
                                    key = {url}
                                  >
                                    <Image src = {url} layout = 'fill'/>
                                  </div>
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
              {displayReviews.length === 0?
              <>
                <div className = "pt-4 w-max">
                  {currentUser ? 
                    <Button text = 'Write review' CSS = 'px-4 py-2 bg-secondaryVariant hover:bg-secondary text-onSecondary' onClick = {()=>setOpenWriteReview(true)}/>
                  :
                    <Link href = {`/login?redirect=${currentProduct}`}>
                      <Button text = 'Write review' CSS = 'bg-secondaryVariant hover:bg-secondary text-onSecondary py-1'/>
                    </Link>
                  }
                </div>
                <div className = "pt-6 pb-4">
                  <p className = "text-lg font-medium text-left">Be the first to share your opinion. <br/>We welcome all feedback we can get.</p>
                </div>
              </>
              :
              <>
                {displayReviews.length > 2 && (
                  <div className = "mt-1 w-max">
                    <Link href = "#reviews">
                      <Button text = 'Read more' CSS = 'bg-secondaryVariant hover:bg-secondary text-onSecondary px-4 py-2 '/>
                    </Link>
                  </div>
                )}
              </>
              }
            </div>
          )}
        </div>
      </div>
      <WriteReview productTitle = {currentProduct} openWriteReview = {openWriteReview} setOpenWriteReview = {setOpenWriteReview}/>
      <ExpandImage expandImage = {expandImage} setExpandImage = {setExpandImage} selectedReview = {selectedReview}/>
    </div>
  )
}

export default ReviewsAccordian