import { Dialog, Transition } from '@headlessui/react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection,setDoc,doc } from 'firebase/firestore';
import { db } from '../../../firebase/app';
import { PhotoIcon, StarIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { Button } from '../../elements'
import { countries } from '../../../constants/countryAndStates'
import Image from 'next/image'
import {v4} from 'uuid'
import { useContext } from 'react';
import UserContext from '../../../context/userContext';
import CloseButton from '../CloseButton';
import { aliReviews } from '../../../constants/reviews';
import { slugify } from '../../../utils/slugify';

export default function WriteReview({openWriteReview, setOpenWriteReview,productId}) {
  const {currentUser} = useContext(UserContext)
  const [rating, setRating] = useState()
  const [hoverIndex, setHoverIndex] = useState()

  const [reviews, setReviews] = useState({})
  const [images,setImages] = useState([])
  const [country,setCountry] = useState(null)
  const [state,setState] = useState()
  const [errors,setErrors] = useState({})

  const [uploadedImages,setUploadedImages] = useState([])

  const onChange =  (e) =>{
    setReviews({...reviews, [e.target.name]: e.target.value})
  }
  
  const imageConvert = (event) =>{
    if (event.target.files && event.target.files[0]) {
      setImages(oldImages => [...oldImages, {original: event.target.files, previewImg: URL.createObjectURL(event.target.files[0])}])
    }
  }


  const handleSubmit = async () =>{
    // Error handling
    const errors = {}
    if(rating == undefined) errors['ratingError'] = 'Must set a rating.'
    if(reviews.reviewTitle == "" || reviews.reviewTitle == undefined) errors['reviewTitleError'] = 'Must include a title.'
    if(reviews.review == "" || reviews.review == undefined) errors['reviewError'] = 'Must include a review.' 
    if(reviews.reviewTitle.length < 5) errors['reviewTitleError'] = 'Title must be more than 5 characters.'
    if(reviews.review.length > 150 ) errors['reviewError'] = 'Must be less than 150 characters.'
    setErrors(errors)
    if(Object.keys(errors).length > 0) return

    if(images.length > 0){
      // Logic for reviews that contain images
      // Add urls to firebase cloud.
      const storage = getStorage()
      const downloadedUrls = []
      await Promise.all(images.map(async (image)=>{
        const storageRef = ref(storage, `${slugify(productTitle)}/${image.original[0].name + v4()}`)
        let blob = await fetch(image.previewImg).then(r => r.blob())
        const snapshot = await uploadBytes(storageRef, blob)
        const urls = await getDownloadURL(snapshot.ref)
        downloadedUrls.push(urls)
      }))
      createReviewDoc(downloadedUrls)
    }else{
      // If review doesn't contain images, just review the doc with the information we already have.
      const downloadedUrls = []
      createReviewDoc(downloadedUrls)
    }
  }


  // For adding reviews based on supplier page
  const addReviews = async () =>{
    const reviewsRef = collection(db,"reviews")
    aliReviews.forEach(async (review) =>{
      await setDoc(doc(reviewsRef),review)
    })
  }

  const createReviewDoc = async (downloadUrls) => {
    // Creating a document
    const reviewsRef = collection(db, "reviews")
    const displayName = (currentUser?.firstName + ' ' + currentUser?.lastName?.slice(0,1))
    await setDoc(doc(reviewsRef),{
      rating:rating + 1,
      reviewTitle:reviews.reviewTitle,
      review:reviews.review,
      country:country ?? null,
      state:state ?? null,
      product:productId,
      images:downloadUrls,
      reviewerId:currentUser?.id,
      reviewer:displayName,
      createdAt:new Date().toISOString(),
      edited:false,
    })
    .then(()=>{
      setOpenWriteReview(false)
      setRating()
      setHoverIndex()
      setReviews({})
      setImages([])
      setCountry(null)
      setState()
      setErrors({})
    })
    .catch((error)=>{
      (error)
      alert('Error in adding your review, please try again later.')
    })
  }

  return (
    <>
      <Transition appear show={openWriteReview} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={()=>setOpenWriteReview(false)}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium text-onBackground"
                  >
                    Write a review
                  </Dialog.Title>
                  <div className="mt-7">
                    <div className = "w-full">
                      <p className = "mt-2 font-medium">
                        <span className = "flex items-center gap-x-3">Rating * <span className = "text-xs font-light text-tertiaryVariant">{errors.ratingError}</span></span>
                      </p>
                      <p className = "flex">
                        {[0,1,2,3,4].map((index)=>(
                          <StarIcon 
                            className = {`w-[24px] h-[24px] ${index <= (hoverIndex || rating) ? 'text-secondaryVariant' : 'text-secondaryVariant/25' }`}
                            onClick = {()=>setRating(index)}
                            onMouseEnter = {()=>setHoverIndex(index)}
                            onMouseLeave = {()=>setHoverIndex(rating)}
                            key = {index}
                          />
                        ))}
                      </p>
                    </div>

                    <div className = "w-full">
                      <p className = "flex flex-col items-start font-medium mt-7">
                        <span className = "flex items-center gap-x-3">Review Title * <span className = "text-xs font-light text-tertiaryVariant">{errors.reviewTitleError}</span></span>
                        <span className = "mb-2 text-xs text-onBackground/50">Minimum of 5 characters.</span>
                      </p>
                      <input className = "w-full h-auto px-2 py-1 border rounded-md resize-none border-onBackground"
                        name = "reviewTitle"
                        onChange = {(e)=>onChange(e)}
                      />
                    </div>

                    <div className = "w-full">
                      <p className = "flex flex-col items-start font-medium mt-7">
                        <span className = "flex items-center gap-x-3">Review * <span className = "text-xs font-light text-tertiaryVariant">{errors.reviewError}</span></span>
                        <span className = "text-xs text-onBackground/50">Your honest opinions (150 characters or less).</span>
                      </p>
                      <textarea className = {`${reviews?.review?.length > 150 && ('text-tertiaryVariant')} w-full h-32 px-2 py-2 border rounded-md resize-none border-onBackground`}
                      name = "review"
                      onChange = {(e)=>onChange(e)}
                      ></textarea>
                      <p className = "mb-2 text-xs">{reviews?.review?.length}/150</p>
                    </div>
                    
                    <div className = "w-full">
                      <p className = "flex flex-col items-start font-medium mt-7">
                        Upload photos (Optional)
                        <span className = "mb-2 text-xs text-onBackground/50">Photos of your product (Max 4).</span>
                      </p>
                      <div className = "flex gap-x-3">
                        {images.map((uri,index)=>(
                          <div className = "relative w-16 h-16" key = {uri.previewImg}>
                            <Image src = {uri.previewImg} layout = 'fill'/>
                            <div className = "absolute flex items-center justify-center w-4 h-4 rounded-full cursor-pointer -top-1 -right-1 bg-tertiaryVariant">
                              <XMarkIcon className = "w-4 h-4 text-white" onClick = {()=>setImages(images => images.filter((img,i)=> i != index))}/>
                            </div>
                          </div>  
                        ))}
                      </div>
                      <div className = "flex w-full mt-2">
                        <label className = {`${images.length >= 4 && ('bg-onBackground/30 hover:bg-onBackground/30 cursor-default')} flex items-center justify-center px-3 py-2 text-sm rounded-full cursor-pointer w-max bg-primaryVariant text-onPrimary gap-x-3 hover:bg-primary`}>
                          <PhotoIcon className = "w-5 h-5"/>Upload photo<input type = "file" style = {{display:'none'}} name = "image" onChange = {(e)=>imageConvert(e)} disabled = {images.length >= 4}/>
                        </label>
                      </div>
                    </div>
                    
                    <div className = "w-full">
                      <div>
                        <p className = "flex flex-col items-start font-medium mt-7">
                          Country (Optional) 
                        </p>
                        <select className = "px-2 py-2 mt-1 border border-black rounded-full" onChange = {(e)=>setCountry(e.target.value)}>
                            <option>Select a country</option>
                          {countries.countries.map((arr)=>(
                            <option key = {arr.country}>{arr.country}</option>
                          ))}
                        </select>
                      </div>
                      {(country != null && country != "Select a country") && (
                        <div>
                          <p className = "flex flex-col items-start mt-4 font-medium">
                            Country (Optional) 
                          </p>
                          <select className = "px-2 py-2 mt-1 border border-black rounded-full" onChange = {(e)=>setState(e.target.value)}>
                            <option>Select a state</option>
                            {countries.countries.map((arr)=>(
                              <>
                                {arr.country == country && (
                                  <>
                                    {arr.states.map((state)=>(
                                        <option key = {state}>{state}</option>
                                    ))}
                                  </>
                                )}
                              </>  
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-max mt-7">
                    <Button 
                      text = {`Submit my review `} 
                      CSS = 'bg-secondaryVariant hover:bg-secondary text-onSecondary px-4 py-2'
                      onClick = {()=>handleSubmit()}
                    />
                  </div>
                  <CloseButton onClick = {()=>setOpenWriteReview(false)}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
