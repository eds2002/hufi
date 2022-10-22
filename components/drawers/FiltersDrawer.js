import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import {CheckIcon,ChevronUpIcon } from '@heroicons/react/20/solid'
import FirstTimeModal from '../modals/FirstTimeBuyer'
import { CLIENT_STATIC_FILES_RUNTIME } from 'next/dist/shared/lib/constants'
import { CloseButton } from '../features'


export default function FiltersDrawer({filtersModal,setFiltersModal,tags,allFilters,selectedFilters,setSelectedFilters}) {
  const [filtersByTags,setFiltersByTags] = useState([])
  
  const handleFilterClick = (filterName,tag)=>{
    const indexOfTag = selectedFilters.findIndex(selectedFilter=> selectedFilter.tag === tag)
    
    // If index returns -1, insert first data set of filter arr
    if(indexOfTag === -1){
      setSelectedFilters(oldArray => [...oldArray, {tag:tag, userSelected:[filterName]}])
      return
    }

    // REFERENCE
    const arrRef = selectedFilters[indexOfTag].userSelected

    // If reference includes filterName, add it to setState
    if(arrRef.includes(filterName)){
      // Map through the old arrays and filter out the value chosen
      setSelectedFilters(oldArray => oldArray.map((obj)=>({...obj,
        userSelected: obj.userSelected.filter((selected)=>selected != filterName)
      })))
    }else{
      // Map through the old arrays, stay on array with tag equal to the chosen user chosen tag 
      // and add the desired filter value. Return values to avoid returning undefined
      setSelectedFilters(oldArray => oldArray.map((obj)=> {
        if(obj.tag === tag){
          return({...obj,
            userSelected: [...obj.userSelected, filterName]
          })
        }else{
          return obj
        }
      }))
    }
  }

  // Sorts allFilters state to its correspeonding tag name.
  useEffect(()=>{
    const filtersArr = []

    // Sorts by tags
    tags.map((tag)=>{
      const tagArray = []
      allFilters.map((filter)=>{
        if(filter.split(":")[0] === tag){
          // Itterate through all objects in array, one has to least match to return 
          if(tagArray.includes(filter.split(":")[1])) return
          tagArray.push(filter.split(":")[1])
        }
      })
      filtersArr.push({tag:tag, tagFilters:tagArray})
    })
    setFiltersByTags(filtersArr)
  },[allFilters, tags])
  return (
    <Transition.Root show={filtersModal} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={()=>setFiltersModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25 bg-secondaryVariant" />
        </Transition.Child>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-xs pl-10 pointer-events-none sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                    <div className="flex-1 h-0 overflow-y-auto">

                      {/* Top Header */}
                      <div className="px-4 py-6 bg-background sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-onPrimary">Sort by filters</Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-onPrimary/70">
                            Let&apos;s quickly help you find what you&apos;re looking for.
                          </p>
                        </div>
                      </div>

                      {/* Radio options */}
                      <div className = "">
                        {filtersByTags.map((obj)=>(
                          <Disclosure key = {obj.tag}>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className={` ${open ? 'bg-surface' : 'bg-background border-b '} flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-onBackground  focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75`}>
                                  <span>{obj.tag}</span>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-onBackground`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-onBackground">
                                  {obj.tagFilters.map((filter)=>(
                                    <div className = "flex gap-3 px-2 my-2" key = {filter}>
                                      {/* TAG NAMES */}
                                      <div 
                                        className = {`relative w-4 h-4 border rounded-sm cursor-pointer border-onBackground ${selectedFilters?.some(selected => selected?.userSelected?.includes(filter)) ? 'bg-secondaryVariant' : 'bg-transparent'}`}
                                        onClick = {()=>handleFilterClick(filter,obj.tag)}  
                                      >
                                        <span className = "absolute inset-0 flex items-center justify-center text-onSecondary">
                                          {selectedFilters?.some(selected => selected?.userSelected?.includes(filter)) && (
                                            <CheckIcon className = "w-4 h-4 text-white"/>
                                          )}
                                        </span>
                                      </div>
                                      <li className = "relative list-none">
                                        {filter}
                                      </li>
                                    </div>    
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      </div>
                      <CloseButton padding={6} onClick = {()=>setFiltersModal(false)}/>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

