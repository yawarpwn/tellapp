import PrinterIcon from '../icons/PrinterIcon'
import EditIcon from '../icons/EditIcon'
import { getIgv } from '../utils/numbers'
import PDFGenerator from './PDFGenerator';
import { usePDF } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { deleteQuotation } from '../services/supabase';

export default function QuotationRow({
  quotation,
  index,
  onOpenView,
  onCloseView,
  updateQuo
}) {
  const { company, quo_number: quoNumber } = quotation
  const { total } = getIgv(quotation.quotation_items)
  const [instance, setInstance] = usePDF({ document: <PDFGenerator quotation={quotation} /> })



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
          onClick={() => updateQuo(quotation)}
          type='button'
        >
          <EditIcon />
        </button>
        {/* <button type='button' onClick={() => deleteQuotation(quotation.id)}> */}
        {/*   DEL */}
        {/* </button> */}
        {/* <button type='button' onClick={onOpenView}> */}
        {/*   <EyeIcon /> */}
        {/* </button> */}
        <a href={instance.url} download={`COT-2023-00${quotation.quo_number}.pdf`} >
          <PrinterIcon />
        </a>
      </td>
    </tr>
  )
}
