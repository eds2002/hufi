import {createContext, useEffect, useState} from 'react'

const UserContext = createContext()

export function UserProvider({children,props}){
  const [currentUser, setCurrentUser] = useState(null)
  const [currentUserACCESS, setCurrentUserACCESS] = useState(null)

  useEffect(()=>{
    setCurrentUser(props?.userData?.customer)
    setCurrentUserACCESS(props?.userAccess)
  },[])

  return(
    <UserContext.Provider value={{currentUser,setCurrentUser,currentUserACCESS,setCurrentUserACCESS}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext