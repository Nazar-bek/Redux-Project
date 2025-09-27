import React from 'react'
import { FaSpinner } from "react-icons/fa";
const Spinner = ({classNames}) => {
  return (
    <div>
        <FaSpinner  className={`animate-spin ${classNames}`}/>
    </div>
  )
}

export default Spinner