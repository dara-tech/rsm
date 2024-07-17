import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={'/'}><div>
        <h4 className='font-bold ring-1 ring-gray-200 p-1 rounded-md'>Resume <span className='bg-black text-white p-1 rounded-md dark:bg-white dark:text-black'>|B</span></h4>
     
    </div></Link>
    
  )
}

export default Logo