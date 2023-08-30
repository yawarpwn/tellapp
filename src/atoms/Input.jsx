export default function Input({ label, name, inputRef, ...props }) {
  return (
    <div className="border w-full border-foreground-200 p-3  rounded-md flex flex-col items-start hover:border-zinc-800 focus:border-zinc-800 ">
      <label htmlFor={name || label} className="text-xs block font-medium mb-2">{label}</label>
      <div className="w-full h-full">
        <input
          name={name || label}
          ref={inputRef}
          className="text-normal text-sm !bg-transparent outline-none w-full h-full placeholder:text-foreground-400"
          placeholder="Enter your email"
          {...props}
        />
      </div>
    </div>
  )
}
