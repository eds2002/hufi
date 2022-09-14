import {createContext, useEffect, useState} from 'react'

const LocaleContext = createContext()

export function LocaleProvider({children}){
  const [locale,setLocale] = useState()
  useEffect(()=>{
    let language = window.navigator.userLanguage || window.navigator.language || "en-us";

    setLocale(language)
  },[])
  return(
    <LocaleContext.Provider value={{locale}}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext