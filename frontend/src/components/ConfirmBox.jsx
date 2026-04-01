import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close, message }) => {
  return (
    <div className='fixed inset-0 z-50 bg-neutral-800/70 p-4 flex items-center justify-center'>
      <div className='bg-white w-full max-w-md rounded p-4 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold'>Delete Permanently</h1>
          <button onClick={close} className='flex justify-between items-center gap-3'>
            <IoClose size={25} />
          </button>
        </div>
        <p>{message || "Are you sure to permanently delete this item?"}</p>
        <div className='flex items-center justify-end gap-2'>
          <button onClick={cancel} className='px-3 py-1 border rounded'>Cancel</button>
          <button onClick={confirm} className='px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox