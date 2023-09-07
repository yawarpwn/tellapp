import QuotationRow from './QuotationRow'
import QuotationTableHeader from './QuotationTableHeader'

export default function QuotationList({
  quotations,
  onOpenView,
  onCloseView,
  updateQuo,
}) {
  return (
    <table
      aria-multiselectable="true"
      tabIndex={-1}
      className="w-full min-w-full h-auto table-auto "
    >
      <QuotationTableHeader />
      <tbody role="rowgroup">
        {quotations.map((quotation, index) => {
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
        })}
      </tbody>
    </table>
  )
}
