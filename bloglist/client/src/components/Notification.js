import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)

  if (message === null) {
    return null
  }

  const bgColor = message.type === 'error' ? 'bg-red-500' : 'bg-green-500'

  return (
    <div
      className={`${bgColor} absolute w-screen border-2 rounded-md border-gray-100 w-screen`}
    >
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap">
          <p className="ml-3 font-medium text-white">
            <span className=" md:inline">{message.text}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Notification
