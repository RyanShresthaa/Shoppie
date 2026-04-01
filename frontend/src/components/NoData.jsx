import React from 'react'
import { IMG_NO_DATA } from '../constants/imagePlaceholders'
const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-3'>
        <img src={IMG_NO_DATA} alt="No Data" className='w-40' />
        <p className='text-neutral-500'>No Data Available</p>
    </div>
  )
}

export default NoData