import { usePDF } from '@react-pdf/renderer'
import { useEffect } from 'react'
import DownloadIcon from '../../icons/DownloadIcon'
import ShareIcon from '../../icons/ShareIcon'
import PDFGenerator from './PDFGenerator'
import Button from '../../atoms/Button'

export default function DownloadPDF({ quotation }) {
  const [instance, setInstance] = usePDF()

  useEffect(() => {
    setInstance(<PDFGenerator quotation={quotation} />)
  }, [quotation])

  const handleShare = async () => {
    try {
      // Generar el Blob desde el PDF generado
      const pdfBlob = instance.blob

      // Comprobar si el navegador admite la API navigator.share
      if (navigator.share) {
        // Usar la API navigator.share para compartir el Blob del PDF
        await navigator.share({
          files: [
            new File([pdfBlob], `COT-2023-00${quotation.quo_number}.pdf`, {
              type: 'application/pdf',
            }),
          ],
          title: `Cotización ${quotation.quo_number}`,
          text: '¡Echa un vistazo a esta cotización!',
        })
      } else {
        console.log('Tu navegador no admite la API navigator.share')
      }
    } catch (error) {
      console.log('Error al compartir: ', error)
    }
  }

  return (
    <div className="flex items-center justify-between">
      {instance.loading ? (
        'cargando'
      ) : (
        <>
          <Button onClick={handleShare}>
            <ShareIcon />
            <span className="ml-2">Compatir</span>
          </Button>
          <Button
            as="a"
            href={instance.url}
            download={`COT-2023-00${quotation.quo_number}.pdf`}
          >
            <DownloadIcon />
            <span className="ml-2">Descargar</span>
          </Button>
        </>
      )}
    </div>
  )
}
