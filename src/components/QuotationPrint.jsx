import { useQuotationStore } from '../store/quotation'
import Quotation from './Quotation'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFGenerator from './PDFGenerator';

export default function QuotationPrint() {
  const store = useQuotationStore()

  const handleClose = () => {
    store.updateQuoToEdit(null)
    store.togglePrintQuo()
  }


  return (
    <aside onClick={event => {
      if (event.target !== event.currentTarget) return
      handleClose()
    }} className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#000005be]">
      <article className="max-w-[768px] h-screen p-4 bg-white">
        {/* <PDFViewer width='100%' height='700px'> */}
        {/*   <PDFGenerator quotation={store.quoToEdit} /> */}
        {/* </PDFViewer> */}
        <Quotation quotation={store.quoToEdit} />
        <button className='py-4 px-6 bg-orange-500 text-white' onClick={() => { }}>
          <PDFDownloadLink fileName='documento.pdf' document={<PDFGenerator quotation={store.quoToEdit} />} >
            {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
          </PDFDownloadLink>
        </button>
        <button className='py-4 px-6 bg-purple-500 text-white' onClick={handleClose}>cancel</button>
      </article>
    </aside>
  )
}
