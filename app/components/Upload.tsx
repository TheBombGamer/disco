import React from 'react'

const Upload = () => {
  return (
    <div className='bg-[#222222] lg:w-1/2 p-3 flex flex-col gap-5' >
        <p className="text-sm">Choose File or Drag and Drop to Upload </p>

        <div className=" px-5 py-2">
            <div className="bg-black border w-64   border-slate-400 border-dashed rounded-lg  h-56">
                <input type="file" name="" placeholder='' id="" />
            </div>
        </div>
    </div> 
  )
}

export default Upload