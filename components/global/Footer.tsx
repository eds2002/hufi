import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { slugify } from "../../utils/slugify"
import Image from 'next/image'


interface iData{
  data:{
    menu:{
      handle:string;
      items:Array<{
        id:string;
        items:iItems[];
        title:string;
        url:string;
      }>
    }
  }
}

interface iItems{
  id:string;
  items:iItems[];
  title:string;
  url:string;
}

export default function Footer({data}:iData) {
  return (
    <footer className=" bg-secondaryVariant">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <div className = 'pointer-events-none select-none'>
          <Image 
            src = "/HufiBlack.svg"
            width = {100}
            height = {100}
          />
        </div>

        <div className = "grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3">
          {data?.menu?.items.map((menu)=>(
            <nav className = "mb-10" key = {menu.title}>
              <p className = 'text-base font-medium text-onSecondary w-max'>{menu.title}</p>
              <ul className = "mt-2">
              {menu.items.map((subMenu)=>(
                <Link href = {`/${slugify(menu.title)}/${slugify(subMenu.title === "help@hufisupport.com" ? '' : subMenu.title)}`} key = {subMenu.title}>
                  <li className = 'items-start my-1 text-sm cursor-pointer text-onSecondary/70 hover:text-onSecondary/40 w-max'>{subMenu.title}</li>
                </Link>
              ))}
              </ul>
            </nav>
          ))}
          <form className = "flex-col items-start justify-start hidden w-full h-full max-w-xs text-sm md:text-base md:flex" onClick = {(e)=>e.preventDefault()}>
            <h5 className = "text-base font-medium text-onSecondary">Need a good read?</h5>
            <p className = "text-sm text-onSecondary/60"> Subscribe to learn more about future products and future discounts.</p>
            <div className = "relative flex w-full mt-4 border rounded-full">
              <input className = "w-full px-4 py-2 bg-transparent border-t border-b border-l rounded-full border-onSecondary focus:outline-none focus:border-onBackground/50" placeholder="Email"/>
              <button className = "absolute top-0 bottom-0 right-0 h-full px-4 transition border-2 rounded-full w-max hover:bg-onSecondary text-onSecondary hover:text-secondaryVariant">
                <PaperAirplaneIcon className = "w-5 h-5 "/>
              </button>
            </div>
          </form>
        </div>
        <div className = 'flex flex-col items-start justify-between w-full mt-8 md:items-center md:flex-row'>
          <p className="text-xs text-center text-onSecondary/70 ">&copy; 2022 Hufi, Inc. All rights reserved.</p>
          <div className = "flex flex-row items-start mt-10 md:items-center gap-x-4 md:mt-0 gap-y-4">
            <Link href = "/pages/terms-of-service">
              <a className = "text-xs text-onSecondary/70">Terms of Service</a>
            </Link>
            <Link href = "/pages/refund-policy">
              <a className = "text-xs text-onSecondary/70">Refund Policy</a>
            </Link>
            <Link href = "/pages/privacy-policy">
              <a className = "text-xs text-onSecondary/70">Privacy Policy</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
