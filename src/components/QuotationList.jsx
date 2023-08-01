import PrinterIcon from '../icons/PrinterIcon'
import EditIcon from '../icons/EditIcon'
import { useQuotationStore } from '../store/quotation'
import { getIgv } from '../utils/numbers'
import PDFGenerator from './PDFGenerator';
import { usePDF } from '@react-pdf/renderer';

function QuotationCard({ quotation }) {
  console.log(quotation)
  const { company, quoNumber } = quotation
  const store = useQuotationStore()
  const { total } = getIgv(quotation.items)
  const [instance] = usePDF({ document: <PDFGenerator quotation={quotation} /> })

  const handleEditQuo = (id) => {
    const quoToEdit = store.quotations.find(quo => quo.id === id)
    store.updateQuoToEdit(quoToEdit)
    store.toggleCreateQuo()
  }

  return (
    <li className="px-4 py-4 bg-white text-gray-500 shadow-md rounded-lg border hover:border-purple-500 flex gap-x-2 items-center justify-between font-light">
      <div>
        <span className='text-purple-500'>#</span>
        <span className='font-semi-bold'>{quoNumber}</span>
      </div>
      <div className='flex-1'>
        <p>{company}</p>
        <div className='text-purple-500 flex justify-between'>
          <span>Items: {quotation.items.length}</span>
          <span>S/{total}</span>
        </div>
      </div>
      <div className='flex flex-col justify-between items-center gap-x-2'>
        <button onClick={() => handleEditQuo(quotation.id)}>
          <EditIcon
          />
        </button>
        <a href={instance.url} download={`COT-2023-00${quotation.quoNumber}.pdf`} >
          <PrinterIcon />
        </a>
      </div>
    </li>
  )
}

export default function QuotationList({ quotations }) {
  return (
    <ul className="mt-6 gap-y-2 flex flex-col">
      {quotations.map((quotation) => {
        return (
          <QuotationCard key={quotation.id} quotation={quotation} />
        )
      })}
    </ul>
  )
}
