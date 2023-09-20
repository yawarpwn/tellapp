import PlusIcon from '../icons/PlusIcon'

export default function AddButton({ children, ...props }) {
  return (
    <button
      className="z-0 px-3 py-4 h-8 rounded-lg inline-flex items-center gap-2 bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
      type="button "
      {...props}
    >
      Nuevo
      <PlusIcon size={28} />
    </button>
  )
}
