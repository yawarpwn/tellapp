import React from 'react'
export default function Input({ children, label, inputRef, ...props }) {
  return (
    <div className="border w-full border-zinc-800 px-3 py-1 rounded-md flex flex-col items-start hover:border-zinc-400 focus:border-zinc-400 ">
      <label className="text-xs block font-medium mb-2">
        {label}
      </label>
      <div className="w-full h-full">
        <input
          ref={inputRef}
          className="text-normal text-sm !bg-transparent outline-none w-full h-full placeholder:text-zinc-700"
          placeholder="Enter your email"
          {...props}
        />
      </div>
    </div>
  )
}
