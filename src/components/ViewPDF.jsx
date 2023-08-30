import { PDFViewer } from '@react-pdf/renderer'
import PDFGenerator from './PDF/PDFGenerator'
export default function ViewPDF() {
  const defaultQuo = {
    id: '5df3180a09ea16dc4b95f910',
    quoNumber: 3022,
    company: 'Proquinsa Productos Quimicos Industriales S.A',
    email: 'proquinsaquimicos@mantrix.com',
    phone: '971 531 018',
    address: '922 Campus Road, Drytown, Wisconsin, 1986',
    date: '2019-09-12',
    ruc: '20610555538',
    items: [
      {
        id: 'afadl323',
        desc: 'Senal fotoluminiscente con soporte pvc celtex 3mm',
        qty: 200,
        rate: 7.5,
        size: '120x230cm',
      },
      {
        id: 'afaz232',
        desc: 'senal vinil con soporte pvc celtex 3mm ',
        qty: 155,
        rate: 5,
        size: '30x40cm',
      },
    ],
  }
  return (
    <div className="w-full h-full">
      <PDFViewer
        height={'100%'}
        width={'100%'}
      >
        <PDFGenerator quotation={defaultQuo} />
      </PDFViewer>
    </div>
  )
}
