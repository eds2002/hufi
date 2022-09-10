import React from 'react'
import { Footer, Header } from '.'

const Layout = ({children}) => {
  return (
    <>
      <Header data = {children.props.headerData}/>
        {children}
      <Footer data = {children.props.footerData}/>
    </>
  )
}

export default Layout