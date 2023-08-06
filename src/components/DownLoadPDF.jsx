import { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import PDFGenerator from './PDFGenerator';
import DownloadIcon from '../icons/DownloadIcon';
import ShareIcon from '../icons/ShareIcon'

export default function DownloadPDF({ quotation }) {
  const [instance, setInstance] = usePDF()

  useEffect(() => {
    setInstance(<PDFGenerator quotation={quotation} />)
  }, [quotation])

  const handleShare = async () => {
    try {
      // Generar el Blob desde el PDF generado
      const pdfBlob = instance.blob;

      // Comprobar si el navegador admite la API navigator.share
      if (navigator.share) {
        // Usar la API navigator.share para compartir el Blob del PDF
        await navigator.share({
          files: [new File([pdfBlob], `COT-2023-00${quotation.quo_number}.pdf`, { type: 'application/pdf' })],
          title: `Cotización ${quotation.quo_number}`,
          text: '¡Echa un vistazo a esta cotización!',
        });
      } else {
        console.log('Tu navegador no admite la API navigator.share');
      }
    } catch (error) {
      console.log('Error al compartir: ', error);
    }
  };

  return (
    <div className='flex gap-x-1'>
      {instance.loading ? '...' : (
        <>
          <button
            onClick={handleShare}
          >
            <ShareIcon />
          </button>
          <a
            href={instance.url}
            download={`COT-2023-00${quotation.quo_number}.pdf`}
          >
            <DownloadIcon />
          </a>

        </>
      )}
    </div>
  )
}
