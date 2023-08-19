const STATE = {
  SEGURO: 'success',
  POSIBLE: 'warning',
  DIFICIL: 'danger'
}
export default function Chip({ children, type = "danger" }) {
  return (
    <div className="flex items-center justify-center">
    <span className={`block w-2 h-2 rounded-full bg-${type}`} />
    </div>
  )
}
