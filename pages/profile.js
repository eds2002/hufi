import { ArrowRightOnRectangleIcon, Bars3Icon, Cog6ToothIcon, CubeIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon, UserCircleIcon, UserIcon, XMarkIcon,ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
import { useEffect,useState } from 'react'
import { useContext } from "react"
import UserContext from "../context/userContext"
import Router from 'next/router'

const Profile = () => {
  const {currentUser} = useContext(UserContext)
  const [tab,setTab] = useState()
  useEffect(()=>{
    const pathName = window.location.search.split('?')[1]
    console.log(pathName)
    setTab(pathName)
  },[])
  const linkChange = (name) =>{
    Router.push({
      pathname:'profile',
      query:{tab:encodeURI(name)}
    })
    setTab(`tab=${name}`)
  }
  return (
    <section>
      <div className = "w-full h-full px-4 pt-24 mx-auto bg-secondary">
        <div className = "px-4 mx-auto max-w-7xl ">
          <h3 className = "max-w-md text-3xl font-medium text-onSecondary">Hi {currentUser?.firstName}, how can we help you today?</h3>
          {/* <h1 className = "text-3xl font-medium text-onSecondary mt-7">Settings</h1> */}
          <div className = "flex justify-between max-w-lg pb-12 mt-12">
            <div className = "flex flex-col items-center justify-center w-auto min-w-min ">
              <UserCircleIcon className = {`w-16 h-16 p-1 transition cursor-pointer rounded-xl ${tab == 'tab=profile' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('profile')}/>
              <p className = "mt-3 text-sm text-onSecondary xl:text-base">Profile</p>
            </div>
            <div className = "flex flex-col items-center justify-center w-auto min-w-min">
            <CubeIcon className = {`w-16 h-16 p-1 transition cursor-pointer rounded-xl ${tab == 'tab=orders' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('orders')}/>
              <p className = "mt-3 text-sm text-onSecondary xl:text-base">Orders</p>
            </div>
            <div className = "flex flex-col items-center justify-center w-auto min-w-min">
            <ChatBubbleBottomCenterIcon className = {`w-16 h-16 p-1 transition cursor-pointer rounded-xl ${tab == 'tab=support' ? 'bg-primary text-onPrimary/50': 'bg-onSecondary/5 text-onSecondary hover:bg-primary/25'}`} onClick = {()=>linkChange('support')}/>
              <p className = "mt-3 text-sm text-onSecondary xl:text-base">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile