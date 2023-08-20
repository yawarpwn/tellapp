const VIABILITY = {
  Safe: 'bg-success',
  Possible: 'bg-warning',
  Difficult: 'bg-danger'
}
export default function Chip({ type = "danger" }) {

  return (
    <div className="flex items-center justify-center">
      <span className={`inline-block w-2 h-2 rounded-full ${VIABILITY[type]} bg-green-500`} />
    </div>
  )
}
