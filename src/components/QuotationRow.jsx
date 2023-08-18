import EditIcon from '../icons/EditIcon'
import { getIgv } from '../utils/numbers'
import { useEffect, lazy, Suspense, useState } from 'react';
import EyeIcon from '../icons/EyeIcon'

const LazyDownloadPDF = lazy(() => import('./DownLoadPDF'))

export default function QuotationRow({
  quotation,
  index,
  updateQuo
}) {
  const { company, quo_number: quoNumber, ruc } = quotation
  const { total } = getIgv(quotation.quotation_items)
  const [isPDFGenerated, setIsPDFGenerated] = useState(false)


  return (
    <tr
      className={`hover:bg-zinc-900`}>
      <td className='px-3 font-normal whitespace-normal py-2 text-sm'>
        <span className='text-purple-500'>#</span>
        <span className='font-semi-bold'>{quoNumber}</span>
      </td>
      <td className='table-td'>
        <div className='flex flex-col'>
          <p className='text-sm font-bold'>
            {company}
          </p>
          <p className='text-sm text-zinc-600'>
            {ruc}
          </p>
        </div>
      </td>
      <td className='table-td'>
        {total}
      </td>
      <td className='table-td'>
        <button
          onClick={() => updateQuo(quotation)}
          type='button'
        >
          <EditIcon />
        </button>
        {isPDFGenerated ? (
          <Suspense fallback={'Cargando...'}>
            <LazyDownloadPDF quotation={quotation} />
          </Suspense>
        ) : (

          <button onClick={() => setIsPDFGenerated(true)}>
            <EyeIcon />
          </button>

        )}
        {/* <a href={instance.url} download={`COT-2023-00${quotation.quo_number}.pdf`} > */}
        {/*   <PrinterIcon /> */}
        {/* </a> */}
      </td>
    </tr>
  )
}
