import PlusIcon from '../icons/PlusIcon'

export default function AddButton({ children, ...props }) {
  return (
    <button
      className="z-0 px-3 py-4 h-8 rounded-lg inline-flex items-center gap-2 bg-white text-black"
      type="button "
      {...props}
    >
      Nuevo
      <PlusIcon size={28} />
    </button>
  )
}
