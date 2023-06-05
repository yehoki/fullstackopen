import React from 'react'

export const Notification = (props) => {
  return (
    <div className={props.className}>{props.message}</div>
  )
}
