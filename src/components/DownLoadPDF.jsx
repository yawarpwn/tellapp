import { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import PDFGenerator from './PDFGenerator';
import DownloadIcon from '../icons/DownloadIcon';
import WhatsappIcon from '../icons/WhatsappIcon'

export default function DownloadPDF({ quotation }) {
  console.log('DownnloadPDF - Lazy')
  const [instance, setInstance] = usePDF()
  const pdfURL = instance.url || '';

  useEffect(() => {
    setInstance(<PDFGenerator quotation={quotation} />)
  }, [quotation])

  const handleShareWhatsApp = () => {
    const whatsappURL = `whatsapp://send?text=Compartiendo PDF de cotización&data=${encodeURIComponent(pdfURL)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className='flex gap-x-1'>
      <a
        onClick={handleShareWhatsApp}
        href={'#'}
        download={`COT-2023-00${quotation.quo_number}.pdf`}
      >
        <WhatsappIcon />
      </a>
      <a
        href={instance.url}
        download={`COT-2023-00${quotation.quo_number}.pdf`}
      >
        <DownloadIcon />
      </a>
    </div>
  )
}
