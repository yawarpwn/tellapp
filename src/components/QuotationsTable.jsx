import { ChevronDownIcon } from "../icons"
import QuotationRow from "./QuotationRow"

export default function QuotationList({
  quotations,
  onOpenView,
  onCloseView,
  updateQuo
}) {
  const hasQuos = quotations && quotations.length > 0
  return (
    <table
      aria-multiselectable='true'
      tabIndex={-1}
      className="w-full min-w-full h-auto table-auto ">
      <thead className="sticky top-0 left-0 z-10 bg-foreground-100" role='rowgroup'>
        <tr role="row" className="outline-none">
          <th scope="col" className="table-th">
            No
            <ChevronDownIcon size={16} className='inline-block ml-1 mb-px' />
          </th>
          <th scope="col" className="table-th">
            Cliente
            <ChevronDownIcon size={16} className='inline-block ml-1 mb-px' />
          </th>
          <th scope="col" className="table-th">
            Total
          </th>
          <th scope="col" className="table-th">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {hasQuos ? (
          quotations.map((quotation, index) => {
            return (
              <QuotationRow
                onOpenView={onOpenView}
                onCloseView={onCloseView}
                key={index}
                index={index}
                quotation={quotation}
                updateQuo={updateQuo}
              />
            )
          })
        )
          : (
            <tr
              className={`border-b border-gray-200`}>
              <td className='px-2 py-2 text-xs'>
                vacio
              </td>
              <td className='px-2 py-2 text-xs'>
                vacio
              </td>
              <td className='px-2 py-2'>
                vacio
              </td>
              <td className='px-2 py-2 flex justify-between items-center gap-2'>
                vacio
              </td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

