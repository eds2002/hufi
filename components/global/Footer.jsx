import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import { slugify } from "../../utils/slugify"
import { Input } from "../elements"

export default function Footer({data}) {
  return (
    <footer className="bg-primary1">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <div className = "grid grid-cols-1 gap-3 lg:grid-cols-4 md:grid-cols-3">
          {data?.menu?.items.map((menu)=>(
            <nav className = "mb-10" key = {menu.title}>
              <p className = 'text-base font-medium text-onBackground'>{menu.title}</p>
              <ul className = "mt-2">
              {menu.items.map((subMenu)=>(
                <Link href = {`/${slugify(menu.title)}/${slugify(subMenu.title === "help@hufisupport.com" ? '' : subMenu.title)}`} key = {subMenu.title}>
                  <li className = 'items-start my-1 text-sm cursor-pointer text-onBackground/40 hover:text-onBackground/20'>{subMenu.title}</li>
                </Link>
              ))}
              </ul>
            </nav>
          ))}
          <form className = "flex-col items-start justify-start hidden w-full h-full max-w-xs text-sm md:text-base md:flex" onClick = {(e)=>e.preventDefault()}>
            <h5 className = "text-base font-medium">Interested in our future</h5>
            <p className = "text-sm text-onBackground/60"> Subscribe to learn more about future products and future discounts.</p>
            <div className = "flex mt-4 rounded-md ">
              <input className = "px-4 py-2 bg-transparent border-t border-b border-l border-black rounded-tl-md rounded-bl-md focus:outline-none focus:border-onBackground/50" placeholder="Email"/>
              <button className = "w-full h-full px-4 transition bg-secondaryVariant rounded-tr-md rounded-br-md hover:bg-secondary peer-">
                <PaperAirplaneIcon className = "w-5 h-5 text-onSecondary"/>
              </button>
            </div>
          </form>
        </div>
        <div className = 'flex flex-col items-start justify-between w-full mt-8 md:items-center md:flex-row'>
          <p className="text-xs text-center text-gray-400 ">&copy; 2022 Hufi, Inc. All rights reserved.</p>
          <div className = "flex flex-row items-start mt-10 md:items-center gap-x-4 md:mt-0 gap-y-4">
            <Link href = "/pages/terms-of-service">
              <a className = "text-xs text-gray-400">Terms of Service</a>
            </Link>
            <Link href = "/pages/refund-policy">
              <a className = "text-xs text-gray-400">Refund Policy</a>
            </Link>
            <Link href = "/pages/privacy-policy">
              <a className = "text-xs text-gray-400">Privacy Policy</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
