import { Suspense, lazy, useState } from 'react'
import Chip from '../atoms/Chip'
import EditIcon from '../icons/EditIcon'
import EyeIcon from '../icons/EyeIcon'
import { getIgv } from '../utils/numbers'
import Modal from '../atoms/Modal'
import ViewPDF from './ViewPDF'
const LazyDownloadPDF = lazy(() => import('./PDF/DownLoadPDF'))
export default function QuotationRow({ quotation, index, updateQuo }) {
  const { company, quo_number, ruc, viability } = quotation
  const { total } = getIgv(quotation.quotation_items)
  const [isPDFGenerated, setIsPDFGenerated] = useState(false)

  const handleCloseModalPdf = () => {
    setIsPDFGenerated(false)
  }

  return (
    <tr className={`${index % 2 ? 'bg-content2' : ''}`}>
      <td className="px-3 font-normal whitespace-normal py-2 text-sm">
        <span className="text-purple-500">#</span>
        <span className="font-semi-bold">{quo_number}</span>
      </td>

      <td className="table-td">
        <div className="flex flex-col w-[200px] md:w-[400px]">
          <p className=" w-full ">{company}</p>
          <p className="text-foreground-500">{ruc}</p>
        </div>
      </td>
      <td className="table-td">
        <Chip type={viability} />
      </td>
      <td className="table-td">{total}</td>
      <td className="table-td">
        <button
          onClick={() => updateQuo(quotation)}
          type="button"
        >
          <EditIcon />
        </button>
        <button onClick={() => setIsPDFGenerated(true)}>
          <EyeIcon />
        </button>
      </td>
      {isPDFGenerated && (
        <Modal
          title="¿Qué hacemos ?"
          isOpen={isPDFGenerated}
          onClose={handleCloseModalPdf}
          maxHeight={150}
          size="xs"
        >
          <Suspense fallback="cargando...">
            <LazyDownloadPDF quotation={quotation} />
          </Suspense>
        </Modal>
      )}
    </tr>
  )
}
