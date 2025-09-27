import React from 'react'
import empty from "../assets/empty.png"
const Empty = () => {
  return (
        <div className="flex justify-center items-center w-full h-full ">
            <img src={empty} alt="Empty not found!" className='object-cover'/>
        </div>
  )
}

export default Empty