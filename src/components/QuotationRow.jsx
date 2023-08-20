import EditIcon from '../icons/EditIcon'
import { getIgv } from '../utils/numbers'
import Chip from '../atoms/Chip'
import { useEffect, lazy, Suspense, useState } from 'react';
import EyeIcon from '../icons/EyeIcon'

const LazyDownloadPDF = lazy(() => import('./PDF/DownLoadPDF'))

export default function QuotationRow({
  quotation,
  index,
  updateQuo
}) {
  const { company, quo_number, ruc, viability } = quotation
  const { total } = getIgv(quotation.quotation_items)
  const [isPDFGenerated, setIsPDFGenerated] = useState(false)


  return (
    <tr
      className={`${index % 2 ? 'bg-foreground-50' : ''}`}>
      <td className='px-3 font-normal whitespace-normal py-2 text-sm'>
        <span className='text-purple-500'>#</span>
        <span className='font-semi-bold'>{quo_number}</span>
      </td>

      <td className='table-td'>
        <div className='flex flex-col w-[200px] md:w-[400px]'>
          <p className=' w-full '>
            {company}
          </p>
          <p className='text-foreground-100'>
            {ruc}
          </p>
        </div>
      </td>
      <td className='table-td'>
        <Chip type={viability} />
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
