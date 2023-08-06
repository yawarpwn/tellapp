import { usePDF } from '@react-pdf/renderer';
import PDFGenerator from './PDFGenerator';

import PrinterIcon from '../icons/PrinterIcon'
export default function DownloadPDF({ quotation}) {

  const [instance, setInstance] = usePDF({ document: <PDFGenerator quotation={quotation} />})

  // useEffect(() => {
  //   setInstance(<PDFGenerator quotation={quotation} />)
  // }, [quotation])
  return (
    <a href={instance.url} download={`COT-2023-00${quotation.quo_number}.pdf`} >
      <PrinterIcon />
    </a>
  )
}
