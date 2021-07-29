import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)

  if (message === null) {
    return null
  }

  const style = message.type === 'error' ? 'red' : 'green'
  const className = message.type === 'error' ? 'error' : 'succeed'

  return (
    <div className={className} style={{ color: `${style}` }}>
      {message.text}
    </div>
  )
}

export default Notification
