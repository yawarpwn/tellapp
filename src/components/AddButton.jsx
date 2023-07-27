import PlusIcon from '../icons/PlusIcon'

export default function AddButton({ children,...props}) {
  return (
  <button className='bg-purple-500 hover:bg-purple-400 px-4 py-2 flex items-center rounded-lg text-white' {...props}>
      <PlusIcon />
      <span className='font-semibold'>
      {children}
      </span>
    </button>
  )
}
