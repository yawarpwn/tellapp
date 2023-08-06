import EditIcon from '../icons/EditIcon'
import LoadingIcon from '../icons/LoadingIcon'
import PrinterIcon from '../icons/PrinterIcon';
import { getIgv } from '../utils/numbers'
import { useEffect, lazy, Suspense, useState } from 'react';

const LazyDownloadPDF = lazy(() => import('./DownLoadPDF'))

export default function QuotationRow({
  quotation,
  index,
  updateQuo
}) {
  const { company, quo_number: quoNumber } = quotation
  const { total } = getIgv(quotation.quotation_items)
  const [isPDFGenerated, setIsPDFGenerated] = useState(false)


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
        <Suspense fallback={'Cargando'}>
            <LazyDownloadPDF quotation={quotation} />
        </Suspense>
        {/* <a href={instance.url} download={`COT-2023-00${quotation.quo_number}.pdf`} > */}
        {/*   <PrinterIcon /> */}
        {/* </a> */}
      </td>
    </tr>
  )
}
