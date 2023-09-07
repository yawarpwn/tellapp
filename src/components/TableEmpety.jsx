import QuotationTableHeader from './QuotationTableHeader'

const TableEmpety = () => {
  return (
    <table
      aria-multiselectable="true"
      tabIndex={-1}
      className="w-full min-w-full h-auto table-auto "
    >
      <QuotationTableHeader />
      <tbody role="rowgroup">
        <tr role='row' >
          <td className='h-[380px] text-center vertical-middle' colSpan="5" role="gridcell">Cargando cotizaciones...</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableEmpety
