export default function Chip({ type = "danger" }) {
  const VIABILITY = {
    'Difficult': 'bg-danger',
    'Safe': 'bg-success',
    'Possible': 'bg-warning'
  }


  return (
    <div className="flex items-center justify-center">
      <span className={`inline-block w-2 h-2 rounded-full ${VIABILITY[type]}`} />
    </div>
  )
}
