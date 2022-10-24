import { Dialog, Transition } from '@headlessui/react'
import { collection,setDoc,doc } from 'firebase/firestore';
import { db } from '../../../firebase/app';
import { Fragment, useState } from 'react'
import { Button } from '../../elements'
import { useContext } from 'react';
import UserContext from '../../../context/userContext';
import CloseButton from '../CloseButton';

export default function WriteQuestion({openWriteQuestion, setOpenWriteQuestion,productId}) {
  const {currentUser} = useContext(UserContext)

  const [question, setQuestion] = useState({})
  const [errors,setErrors] = useState({})

  const onChange =  (e) =>{
    setQuestion({...question, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async () =>{
    // Error handling
    const errors = {}
    if(question?.question?.length < 15 ) errors['questionError'] = 'Question cannot be less than 15 characters.'
    if(!question?.question) errors['questionError'] = "Field cannot be blank."
    setErrors(errors)
    if(Object.keys(errors).length > 0) return
    setErrors({})


    createReviewDoc()
  }


  const createReviewDoc = async () => {
    // Creating a document
    const questionsRef = collection(db, "questions")
    const displayName = (currentUser?.firstName + ' ' + currentUser?.lastName?.slice(0,1))
    await setDoc(doc(questionsRef),{
      answer:"",
      dateAnswered:"",
      product:productId,
      name:displayName,
      dateAsked:new Date().toISOString(),
      question:question.question
    })
    .then(()=>{
      setOpenWriteQuestion(false)
      setQuestion({})
      setErrors({})
      window.location.reload()
    })
    .catch((error)=>{
      console.log(error)
      alert('Error in adding your review, please try again later.')
    })
  }

  return (
    <>
      <Transition appear show={openWriteQuestion} as={Fragment}>
        <Dialog as="div" className="relative z-[99999]" onClose={()=>setOpenWriteQuestion(false)}>
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
                    Leave us a question.
                  </Dialog.Title>
                  <div className="mt-7">
                    <div className = "w-full">
                      <p className = "flex flex-col items-start font-medium mt-7">
                        <span className = "flex items-center gap-x-3">Question * <span className = "text-xs font-light text-tertiaryVariant">{errors.questionError}</span></span>
                        <span className = "mb-2 text-xs text-onBackground/50">Minimum of 15 characters.</span>
                      </p>
                      <input className = "w-full h-auto px-2 py-1 border rounded-md resize-none border-onBackground"
                        name = "question"
                        onChange = {(e)=>onChange(e)}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="w-full mt-7">
                    <Button 
                      text = {`Ask my question. `} 
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
