import React from 'react'

export const Search = (props) => {
  return (
    <div>Find countries <input value={props.value} onChange={props.onChange} />
    </div>
  )
}
