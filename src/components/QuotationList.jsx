import PrinterIcon from '../icons/PrinterIcon'
import EditIcon from '../icons/EditIcon'
import { useQuotationStore } from '../store/quotation'
import { getIgv } from '../utils/numbers'
import PDFGenerator from './PDFGenerator';
import { usePDF } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { deleteQuotation } from '../services/supabase';

function QuotationCard({ quotation, index, onOpenView, onCloseView }) {
  const { company, quoNumber } = quotation
  const store = useQuotationStore()
  const { total } = getIgv(quotation.items)
  const [instance, setInstance] = usePDF({ document: <PDFGenerator quotation={quotation} /> })

  const handleEditQuo = (id) => {
    const quoToEdit = store.quotations.find(quo => quo.id === id)
    store.updateQuoToEdit(quoToEdit)
    store.toggleCreateQuo()
  }


  useEffect(() => {
    setInstance(<PDFGenerator quotation={quotation} />)
  }, [])

  return (
    <tr
      className={`border-b border-gray-200 ${index % 2 ? 'bg-gray-100' : 'bg-white'}`}>
      <td className='px-2 py-2 text-xs'>
        <span className='text-purple-500'>#</span>
        <span className='font-semi-bold'>{quoNumber}</span>
      </td>
      <td className='px-2 py-2 text-xs'>
        {company.slice(0, 30) + '...'}
      </td>
      <td className='px-2 py-2'>
        {total}
      </td>
      <td className='px-2 py-2 flex justify-between items-center gap-2'>
        <button
          onClick={() => handleEditQuo(quotation.id)}
          type='button'
        >
          <EditIcon />
        </button>
        <button type='button' onClick={() => deleteQuotation(quotation.id)}>
          DEL
        </button>
        {/* <button type='button' onClick={onOpenView}> */}
        {/*   <EyeIcon /> */}
        {/* </button> */}
        <a href={instance.url} download={`COT-2023-00${quotation.quoNumber}.pdf`} >
          <PrinterIcon />
        </a>
      </td>
    </tr>
  )
}

export default function QuotationList({ quotations, onOpenView, onCloseView }) {
  const hasQuos = quotations && quotations.length > 0
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-2 py-2 bg-gray-50 ">
              No
            </th>
            <th scope="col" className="px-2 py-2">
              Cliente
            </th>
            <th scope="col" className="px-2 py-2 bg-gray-50 ">
              Total
            </th>
            <th scope="col" className="px-2 py-2">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {hasQuos ? (
            quotations.map((quotation, index) => {
              return (
                <QuotationCard onOpenView={onOpenView} onCloseView={onCloseView} key={index} index={index} quotation={quotation} />
              )
            })
          )
            : (
              <tr
                className={`border-b border-gray-200`}>
                <td className='px-2 py-2 text-xs'>
                  vacio
                </td>
                <td className='px-2 py-2 text-xs'>
                  vacio
                </td>
                <td className='px-2 py-2'>
                  vacio
                </td>
                <td className='px-2 py-2 flex justify-between items-center gap-2'>
                  vacio
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

