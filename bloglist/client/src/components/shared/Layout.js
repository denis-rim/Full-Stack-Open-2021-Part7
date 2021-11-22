import React from 'react'
import Header from '../Header'
import Notification from '../Notification'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Notification />
      <div className="h-screen px-4 sm:px-0 lg:px-8 md:w-full">
        <div className="h-full mx-auto xl:w-4/6 lg:w-full pt-8 px-4 sm:px-1 lg:px-8 ">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
