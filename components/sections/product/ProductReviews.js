import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import React, { useMemo, useRef } from 'react'
import { ExpandImage, StarsComponent, WriteQuestion, WriteReview } from '../../features'
import { Button } from '../../elements'
import { useState } from 'react'
import profilePic from '../../../assets/hufiProfilePic.png'
import {StarIcon} from '@heroicons/react/20/solid'
import { useEffect,useContext } from 'react'
import UserContext from '../../../context/userContext'
import Link from 'next/link'
import { slugify } from '../../../utils/slugify'
import { useRouter } from 'next/router'
import { db } from '../../../firebase/app'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'


const ProductReviews = ({data,reviews,questions}) => {
  const [openWriteReview,setOpenWriteReview] = useState(false)
  const [openWriteQuestion,setOpenWriteQuestion] = useState(false)
  const [displayReviews,setDisplayReviews] = useState(reviews ?? null)
  const [displayQuestions,setDisplayQuestions] = useState(questions ?? null)
  const [currentPagination,setCurrentPagination] = useState(1)
  const [paginationArray,setPaginationArray] = useState(Array.from(Array(Math.ceil(displayReviews?.length || 1/ displayLimit || 1)).keys()))
  const [average,setAverage] = useState(0)
  const [expandImage,setExpandImage] = useState(false)
  const [selectedReview,setSelectedReview] = useState(null)
  const [currentTab,setCurrentTab] = useState("Reviews")
  const [reviewsFilter, setReviewsFilter] = useState(null)
  const [selectedMediaIndex,setSelectedMediaIndex] = useState(0)
  const displayLimit = 10
  const startFrom = 1

  // Sets the average of ratings & pagination amount for reviews
  useEffect(()=>{
    if(displayReviews){
      const filter = displayReviews?.flatMap(review => review.rating)
      const sumsOfRating = filter.reduce((a,b)=> a+b, 0)
      const avg = (sumsOfRating / filter?.length )
      setAverage(avg)
      setPaginationArray(Array.from(Array(Math.ceil(displayReviews?.length / displayLimit)).keys()))
    }
  },[displayReviews])

  // Reloads on data on review data change
  useEffect(()=>{
    setDisplayReviews(reviews ?? null)
    setDisplayQuestions(questions ?? null)
  },[reviews])

  useEffect(()=>{
    if(reviewsFilter === null) return
    switch(reviewsFilter){
      case 'Newest':
        setDisplayReviews(arr => [...arr.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt) )])
        break;
      case 'Highest Ratings':
        setDisplayReviews(arr => [...arr.sort((a,b)=> b.rating - a.rating)])
        break;
      case 'Lowest Ratings':
        setDisplayReviews(arr => [...arr.sort((a,b)=> a.rating - b.rating)])
        break;
    }
  },[reviewsFilter])
  
  const handleImageClick = (index,mediaIndex) =>{
    setSelectedReview(displayReviews[index])
    setExpandImage(true)  
    setSelectedMediaIndex(mediaIndex)
  }
  
  return (
    <section className = "py-24 bg-background scroll-smooth" id = "reviews">
      <div className = "px-4 mx-auto max-w-7xl">
        {/* Top of reviews. */}
        <h3 className = "text-3xl font-medium">Reviews ({displayReviews?.length})</h3>
        {displayReviews?.length > 0 && (
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
            <p className = "mt-2 text-lg font-medium text-onBackground/70">{startFrom + currentPagination * displayLimit - displayLimit}-{(currentPagination * displayLimit) > displayReviews?.length ? displayReviews?.length : currentPagination * displayLimit } of {displayReviews?.length} Reviews</p>
          </>
        )}

        {/* Reviews with media section*/}
        {displayReviews?.length > 0 && (
          <div className = "mt-7">

            {/* Reviews with videos */}
            {displayReviews.some((review)=> review.images.some((url)=>url.includes('mp4'))) && (
              <>
                <h3 className = "text-2xl font-medium">Reviews with videos</h3>
                <div className = "flex h-full mt-3 overflow-scroll flex-nowrap gap-x-3 scrollBar mb-7">
                  {displayReviews.map((review,index)=>(
                    <React.Fragment key = {index}>
                      {review.images.map((url,mediaIndex)=>(
                        <React.Fragment key = {mediaIndex}>
                          {url.includes('mp4') && (
                            <div className = "overflow-hidden rounded-md cursor-pointer">
                              <div className = "relative flex items-end justify-center overflow-hidden bg-gray-200 rounded-md h-80 aspect-[9/16]">
                                <video 
                                  prelaod = 'metadata' 
                                  className = "absolute object-cover w-full h-full rounded-md" onClick={(e)=>handleImageClick(index,mediaIndex)} 
                                >
                                  <source src = {`${url}#t=0.001`} type = "video/mp4"/>
                                </video>
                                <div className = "flex w-full px-4 py-2 overflow-hidden gap-x-3 bg-secondaryVariant/50 backdrop-blur-md rounded-bl-md rounded-br-md">
                                  <div className = "relative bg-black rounded-full w-11 h-11">
                                    {/* Profile image based on reviewers first letter of their name. */}
                                    <div className = "inset-0 flex items-center justify-center h-full">
                                      <p className = "ml-1 text-2xl font-bold text-white">{review.reviewer.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
                                    </div>
                                    <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
                                      <CheckIcon className = "w-3 h-3 text-background"/>
                                    </div>
                                  </div>
                                  <div className = "flex flex-col items-start justify-center flex-1 w-full h-full my-auto overflow-hidden truncate text-ellipsis">
                                    <p className = "overflow-hidden text-sm truncate text-onSecondary whitespace-nowrap text-ellipsis">{review.reviewTitle}</p>
                                    <p className = "text-xs text-onSecondary/60">{review.reviewer}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}

            {/* Reviews with images */}
            <h3 className = "text-2xl font-medium">Reviews with images</h3>
            <div className = "flex h-full mt-3 overflow-scroll flex-nowrap gap-x-3 scrollBar">
              {displayReviews.map((review,index)=>(
                <React.Fragment key = {index}>
                    <React.Fragment>
                      {(!review.images[0]?.includes('mp4') && review.images.length > 0) &&(
                        <div 
                          onClick = {()=>handleImageClick(index,0)} 
                          className = "cursor-pointer">
                          <div className = "relative flex items-end justify-center overflow-hidden bg-gray-200 rounded-md w-72 h-44 aspect-video">
                            <Image src = {review.images[0]} layout = 'fill' objectFit='cover'/>
                            <div className = "flex w-full px-4 py-2 gap-x-3 bg-secondaryVariant/50 backdrop-blur-md rounded-bl-md rounded-br-md">
                              <div className = "relative bg-black rounded-full w-11 h-11">
                                {/* Profile image based on reviewers first letter of their name. */}
                                <div className = "inset-0 flex items-center justify-center h-full">
                                  <p className = "ml-1 text-2xl font-bold text-white">{review.reviewer.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
                                </div>
                                <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
                                  <CheckIcon className = "w-3 h-3 text-background"/>
                                </div>
                              </div>
                              <div className = "flex flex-col items-start justify-center flex-1 w-full h-full my-auto overflow-hidden truncate text-ellipsis">
                                <p className = "overflow-hidden text-sm truncate text-onSecondary whitespace-nowrap text-ellipsis">{review.reviewTitle}</p>
                                <p className = "text-xs text-onSecondary/60">{review.reviewer}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  </React.Fragment>
              ))}
            </div>
          </div>
          
        )}


        {/* Reviews & QuestionsTab */}
        <div className = "flex items-center justify-between mt-7">
          <div className = "flex gap-x-6"> 
            <p 
              className = {`
                cursor-pointer relative py-1 
                ${currentTab === "Reviews" && ("after:absolute after:left-0 after:right-0 after:bg-onBackground after:h-0.5 after:rounded-full after:bottom-0")}
                `}
              onClick = {()=>setCurrentTab("Reviews")}
              >
              Reviews ({displayReviews?.length})
            </p>
            <p 
              className = {`
                cursor-pointer relative py-1 
                ${currentTab === "Questions" && ("after:absolute after:left-0 after:right-0 after:bg-onBackground after:h-0.5 after:rounded-full after:bottom-0")}
                `}
              onClick = {()=>setCurrentTab("Questions")}
              >
              Questions ({displayQuestions?.length})
            </p>
          </div>
        </div>


        {/* Reviews */}
        {currentTab === "Reviews" && (
          <ReviewsTab
            displayReviews = {displayReviews}
            data = {data}
            setReviewsFilter = {setReviewsFilter}
            currentPagination = {currentPagination}
            paginationArray = {paginationArray}
            setCurrentPagination = {setCurrentPagination}
            setOpenWriteReview={setOpenWriteReview}
          />
        )}


        {/* Questions */}
        {currentTab === "Questions" && (
          <QuestionsTab
            displayQuestions={displayQuestions}
            setOpenWriteQuestion={setOpenWriteQuestion}
          />
        )}

      </div>
      <ExpandImage expandImage = {expandImage} setExpandImage = {setExpandImage} selectedReview = {selectedReview} selectedMediaIndex = {selectedMediaIndex}/>
      <WriteReview productId = {data?.product?.id} openWriteReview = {openWriteReview} setOpenWriteReview = {setOpenWriteReview} productTitle = {data?.product?.title}/>
      <WriteQuestion productId = {data?.product?.id} openWriteQuestion = {openWriteQuestion} setOpenWriteQuestion = {setOpenWriteQuestion}/>
    </section>
  )
}


function QuestionsTab({displayQuestions,setOpenWriteQuestion}){
  const {currentUser} = useContext(UserContext)
  return(
    <>
      {(displayQuestions?.length > 0 || displayQuestions.every(question => question.answer != "")) && (
        <>
          {currentUser ? 
            <Button 
              onClick = {()=>setOpenWriteQuestion(true)}
              text = 'Ask a question' 
              CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary py-2 w-max px-4 my-6' 
            />
          :
          <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
            <Button 
                onClick
                text = 'Ask a question' 
                CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary py-2 w-max px-4 my-6' 
              />
          </Link>
          }
        </>
        )}

      {displayQuestions?.length > 0 ? 
        <>

          {/* Display for admin accounts, allows admins to see quesitons that need answering. */}
          <div>
            {/* Checks if any questions are left unanswered for admin users. */}
            {(displayQuestions.some((question)=>question.answer === "") && currentUser?.id === process.env.NEXT_PUBLIC_ADMIN_ID) && (<p className = "mt-10 text-2xl font-medium">Questions that require your attention.</p>)} 

            {displayQuestions?.map((question,index)=>(
              <React.Fragment key = {index}>
                {(question.answer === "" && currentUser?.id === process.env.NEXT_PUBLIC_ADMIN_ID) &&
                  <UnansweredQuestions question = {question}/>
                }
              </React.Fragment>
            ))}
          </div>

          {/* For users that are not admins. */}
          {/* If all questions have no answeres, display no questions */}
          {/* Else display the questions that are answered. */}
          {displayQuestions.every(question => question.answer === "") ? 
          <div className = "flex items-center justify-center py-24"> 
            <div className = "">
              <p className = "max-w-sm text-2xl font-medium text-center">Questions are currently being answered.</p>
              <p className = "max-w-sm mt-2 text-lg font-medium text-center mb-7 text-onBackground/60">Ask another question?</p>
              <div className = "flex items-center justify-center mx-auto w-max">          
              {currentUser ? 
                <Button 
                  onClick = {()=>setOpenWriteQuestion(true)}
                  text = 'Ask a question' 
                  CSS = 'bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                />
              :
              <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
                <Button 
                    onClick
                    text = 'Ask a question' 
                    CSS = ' bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                  />
              </Link>
              }
              </div>
            </div>
          </div>
          :
          <div className = "divide-y">
            {displayQuestions?.map((question,key)=>(
              <React.Fragment key = {key}>
                {(question.answer != "" && (
                  <AnsweredQuestions question = {question}/>
                ))}
              </React.Fragment>
            ))}
          </div>
          }
        </>
        :
        <div className = "flex items-center justify-center py-40"> 
          <div className = "">
              <p className = "max-w-sm text-2xl font-medium text-center">Curious about this product?</p>
              <p className = "max-w-sm mt-2 text-lg font-medium text-center mb-7 text-onBackground/60">Be the first to ask away.</p>
            <div className = "flex items-center justify-center mx-auto w-max">          
            {currentUser ? 
              <Button 
                onClick = {()=>setOpenWriteQuestion(true)}
                text = 'Ask a question' 
                CSS = 'bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
              />
            :
            <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
              <Button 
                  onClick
                  text = 'Ask a question' 
                  CSS = ' bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary px-4 py-2' 
                />
            </Link>
            }
            </div>
          </div>
        </div>
      }
    </>
  )
}



function ReviewsTab({displayReviews,data,setReviewsFilter,currentPagination,paginationArray,setCurrentPagination}){
  const {currentUser} = useContext(UserContext)
  const startFrom = 1
  const displayLimit = 10
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

  const handlePaginationClick = (pagination) =>{
    setCurrentPagination(pagination)
    document.getElementById("reviewsSection").scrollIntoView({behavior:'smooth',})
  }

  return(
    <div id = "reviewsSection">
      {/* Review Button */}
      {displayReviews?.length > 0 && (
      <div className = "flex items-center justify-between">
        {currentUser ? 
          <Button 
            onClick = {()=>setOpenWriteReview(true)}
            text = 'Write a review' 
            CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary py-2 w-max px-4 my-6' 
          />
        :
        <Link href = {`/login?redirect=/product/${slugify(data.product.title)}`}>
          <Button 
              onClick
              text = 'Write a review' 
              CSS = 'text-sm bg-secondaryVariant hover:bg-secondaryVariant text-onSecondary py-2 w-max px-4 my-6' 
            />
        </Link>
        }
        <SortComponent setReviewsFilter = {setReviewsFilter}/>
      </div>
      )}
      {displayReviews?.length > 0 ? 
        <>
          <div className = "divide-y">
            {displayReviews.map((review,index)=>(
              <React.Fragment key = {index}>
                {(index + 1 >= (startFrom + currentPagination * displayLimit - displayLimit) && (index+1 <= currentPagination * displayLimit))  && (
                <div className = "py-6">
                  <div className = "flex justify-between">
                    <div className = "relative flex gap-x-4">
                      <div className = "relative bg-black rounded-full w-11 h-11">
                        <div className = "inset-0 flex items-center justify-center h-full">
                          <p className = "ml-1 text-2xl font-bold text-white">{review.reviewer.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
                        </div>
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
                      {review.images?.length > 0 && (
                        <div className = "flex gap-x-3 ">
                          {review.images.map((url,imageIndex)=>(
                            <React.Fragment key = {url}>
                            {url.includes(".mp4") ? 
                              <div className = "relative overflow-hidden rounded-md cursor-pointer pointer-events-none">
                                <div 
                                  className = "absolute inset-0 z-10 flex items-center justify-center rounded-md pointer-events-none bg-black/25"
                                >
                                  <div>
                                    <PlayCircleIcon className = "text-white w-7 h-7"/>
                                  </div>
                                </div>
                                <video 
                                  className = "relative flex items-center justify-center object-cover rounded-md cursor-pointer pointer-events-auto w-14 h-14 bg-neutral-200"
                                  onClick={()=>handleImageClick(index,imageIndex)}
                                  preload = "metadata"
                                >
                                  <source src = {`${url}#t=0.001`}/>
                                </video>
                              </div>
                            :
                              <div 
                                className = "relative overflow-hidden rounded-md cursor-pointer w-14 h-14" 
                                onClick={()=>handleImageClick(index,imageIndex)}
                              >
                                <Image src = {url} layout = 'fill'/>
                              </div>
                            }
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Pagination */}
          {displayReviews.length > displayLimit && (
            <div className = "flex items-center justify-center mt-12 gap-x-6">
              <p onClick = {()=>handlePaginationClick(currentPagination == 1 ? currentPagination : currentPagination - 1)}>
                <ChevronLeftIcon className = "w-5 h-5 cursor-pointer"/>
              </p>
              <div className = "flex gap-x-1.5">
                {paginationArray.map((val)=>(
                  <div className = "w-max" key = {val}>
                    <p 
                      className = {`${currentPagination === (val + 1) && ('bg-onBackground text-background ')} transition w-6 h-6 flex items-center justify-center rounded-full cursor-pointer select-none`}
                      onClick = {()=>handlePaginationClick(val+1)}
                    >{val + 1}</p>
                  </div>
                ))}
              </div>
              <p onClick = {()=>handlePaginationClick(currentPagination == paginationArray.length ? currentPagination : currentPagination + 1)}>
                <ChevronRightIcon className = "w-5 h-5 cursor-pointer"/>
              </p>
            </div>
          )}
        </>
        :
        <div className = "flex items-center justify-center py-40"> 
          <div className = "">
            <p className = "max-w-sm text-2xl font-medium text-center">Hm, it&apos;s empty in here.</p>
            <p className = "max-w-sm mt-2 text-lg font-medium text-center mb-7 text-onBackground/60">Be the first to review.</p>
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
  )
}


function SortComponent({setReviewsFilter}){
  const [open,setOpen] = useState(false)
  const [currentFilter,setCurrentFilter] = useState("Select")

  const handleOptionClick = (value) =>{
    setCurrentFilter(value)
    setReviewsFilter(value)
    setOpen(false)
  }
  return(
    <div className = "relative flex text-sm gap-x-2 text-onBackground/50">
      <p>Sort by:</p>
      <div>
        <p onClick = {()=>setOpen(!open)} className = {`${currentFilter === "Select" ? 'text-onBackground/50' : 'font-medium text-onBackground'} cursor-pointer`}>{currentFilter}</p>
        {open && (
          <div className = "absolute right-0 mt-2 rounded-md bg-neutral-100 w-max text-onBackground">
            <p className = {`px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-300 ${currentFilter === "Newest" && 'bg-neutral-300'}`} onClick = {()=>handleOptionClick("Newest")}>Newest</p>
            <p className = {`px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-300 ${currentFilter === "Highest Ratings" && 'bg-neutral-300'}`} onClick = {()=>handleOptionClick("Highest Ratings")}>Highest Ratings</p>
            <p className = {`px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-300 ${currentFilter === "Lowest Ratings" && 'bg-neutral-300'}`} onClick = {()=>handleOptionClick("Lowest Ratings")}>Lowest Ratings</p>
          </div>
        )}
      </div>
    </div>
  )
}

function UnansweredQuestions({question}){
  const router = useRouter()
  const [answerQuestion,setAnswerQuestion] = useState(false)
  const inputRef = useRef()
  const docRef = doc(db, "questions",question.id)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const inputValue = inputRef.current.value
    await updateDoc(docRef,{answer:inputValue, dateAnswered:new Date().toISOString()})
      .then(docRef => {
        router.push("#reviews")
        window.location.reload()
      })
      .catch(error=> {
        console.log(error)
        alert("Error in updating doc.")
      })
  }

  const deleteQuestion = async () =>{
    await deleteDoc(doc(db,"questions",question.id))
      .then(()=>{
        window.location.reload()
      })
      .catch((e)=>{
        console.log(e)
        alert('Error in deleting the question, try again later.')
      })
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
  return(
    <div className = "relative w-full px-6 py-6 my-6 rounded-md bg-surface">
      <div className = "flex justify-between w-full">
        <div className = "relative flex w-full gap-x-4">
          <div className = "relative bg-black rounded-full w-11 h-11">
            {/* Profile picture based off first letter of their name */}
            <div className = "inset-0 flex items-center justify-center h-full">
              <p className = "ml-1 text-2xl font-bold text-white">{question.name.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
            </div>
            <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
              <CheckIcon className = "w-3 h-3 text-background"/>
            </div>
          </div>
          <div className = "flex flex-col flex-1">
            <p className = "flex items-center justify-between font-medium">
              {question.name}
              <span className = "pl-10 text-sm text-onBackground/25">{(formatDate(question.dateAsked).month).slice(0,3)} {formatDate(question.dateAsked).day}, {formatDate(question.dateAsked).year}</span>
            </p>
            <h3 className = "text-sm font-medium text-onBackground/70 sm:text-base">Q: {question.question}</h3>
          </div>
        </div>
      </div>
      {answerQuestion ? 
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input 
          className = "w-full h-full px-2 py-2 bg-transparent border border-black rounded-md mt-7"
          ref = {inputRef}
          placeholder = 'Write your answer'
        />
        <Button
          text = 'Submit answer'
          CSS = 'mt-4 bg-secondaryVariant py-2 text-onSecondary sm:w-max px-4'  
        />
      </form>
      :
      <div className = "flex flex-col items-center justify-center mt-7 gap-x-3 sm:flex-row sm:justify-start">
        <Button 
          text = 'Answer question' 
          CSS = 'bg-secondaryVariant py-2 text-onSecondary sm:w-max px-4'
          onClick = {()=>setAnswerQuestion(true)}
        />
        <p className = "mt-2 text-sm cursor-pointer sm:mt-0 text-onSurface/50 hover:text-onSurface/40" onClick = {()=>deleteQuestion()}>Delete question</p>
      </div>
      }
    </div>
  )
}

function AnsweredQuestions({question}){
  
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
    <div className = "relative w-full py-8">
      <div className = "flex justify-between w-full">
        <div className = "relative flex w-full gap-x-4">
          <div className = "relative bg-black rounded-full w-11 h-11">
            <div className = "inset-0 flex items-center justify-center h-full">
              <p className = "ml-1 text-2xl font-bold text-white">{question.name.slice(0,1)}<span className = " text-primaryVariant">.</span></p>
            </div>
            <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
              <CheckIcon className = "w-3 h-3 text-background"/>
            </div>
          </div>
          <div className = "flex flex-col flex-1">
            <p className = "flex items-center justify-between font-medium">
              {question.name}
              <span className = "pl-10 text-sm text-onBackground/25">{(formatDate(question.dateAsked).month).slice(0,3)} {formatDate(question.dateAsked).day}, {formatDate(question.dateAsked).year}</span>
            </p>
            <h3 className = "text-sm font-medium text-onBackground/90 sm:text-base">Q: {question.question}</h3>
          </div>
        </div>
      </div>
      {/* Question answered */}
      <div className = "flex items-center justify-start h-full pt-8 ml-4">
        <div className = "w-0.5 rounded-full h-full bg-onBackground/25"/>
        <div className = "flex-1 ml-5">
          <div className = "flex justify-between">
            <div className = "relative flex w-full gap-x-4">
              <div className = "relative rounded-full w-11 h-11 bg-neutral-600">
                <Image src = {profilePic} layout = 'fill' className = "rounded-full"/>
                <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full -bottom-0.5 -right-0.5 bg-primaryVariant">
                  <CheckIcon className = "w-3 h-3 text-background"/>
                </div>
              </div>
              <div className = "flex flex-col flex-1 w-full">
                <p className = "flex items-center justify-between font-medium">
                  Hufi Team
                  {/* <span className = "pl-10 text-sm text-onBackground/25">{(formatDate(question.dateAnswered).month).slice(0,3)} {formatDate(question.dateAnswered).day}, {formatDate(question.dateAnswered).year}</span> */}
                </p>
                <h3 className = "text-sm text-onBackground/70 sm:text-base">A: {question.answer}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductReviews