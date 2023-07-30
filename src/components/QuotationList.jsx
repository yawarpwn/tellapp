import ChevronRightIcon from '../icons/ChevronRightIcon'
import PrinterIcon from '../icons/PrinterIcon'
import EditIcon from '../icons/EditIcon'
import { useQuotationStore } from '../store/quotation'

function QuotationCard({ quotation }) {
  const { company, quoNumber } = quotation
  const store = useQuotationStore()

  const handleEditQuo = (id) => {
    const quoToEdit = store.quotations.find(quo => quo.id === id)
    store.updateQuoToEdit(quoToEdit)
    store.toggleCreateQuo()
  }

  const handlePrintQuo = (id) => {
    const quoToEdit = store.quotations.find(quo => quo.id === id)
    store.updateQuoToEdit(quoToEdit)
    store.togglePrintQuo()
  }
  return (
    <li className="px-6 py-6 bg-white text-gray-500 shadow-md rounded-lg border hover:border-purple-500 flex gap-x-4 items-center justify-between font-light">
      <div>
        <span className='text-purple-500'>#</span>
        <span className='font-semi-bold'>{quoNumber}</span>
      </div>
      <div className='flex-1'>
        <span >
          {company}
        </span>
      </div>
      <div>
        <span>Total: S/ 800.00</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <button onClick={() => handleEditQuo(quotation.id)}>
          <EditIcon
          />
        </button>
        <button onClick={() => handlePrintQuo(quotation.id)}>
          <PrinterIcon />
        </button>
      </div>
    </li>
  )
}

export default function QuotationList({ quotations }) {
  return (
    <ul className="mt-10 gap-y-2 flex flex-col">
      {quotations.map((quotation) => {
        return (
          <QuotationCard key={quotation.id} quotation={quotation} />
        )
      })}
    </ul>
  )
}
