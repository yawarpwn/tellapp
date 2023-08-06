import QuotationRow from "./QuotationRow"

export default function QuotationList({ 
  quotations, 
  onOpenView, 
  onCloseView, 
  updateQuo 
}) {
  const hasQuos = quotations && quotations.length > 0
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-2 py-2 bg-gray-50 ">
              No
            </th>
            <th scope="col" className="px-2 py-2">
              Cliente
            </th>
            <th scope="col" className="px-2 py-2 bg-gray-50 ">
              Total
            </th>
            <th scope="col" className="px-2 py-2">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
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
    </div>
  )
}

