import { ChevronDownIcon } from '../icons'
const QuotationTableHeader = () => {
  return (
    <thead
      className="sticky top-0 left-0 z-10 bg-foreground-100"
      role="rowgroup"
    >
      <tr
        role="row"
        className="outline-none"
      >
        <th
          scope="col"
          className="table-th"
        >
          No
          <ChevronDownIcon
            size={16}
            className="inline-block ml-1 mb-px"
          />
        </th>
        <th
          scope="col"
          className="table-th"
        >
          Cliente
          <ChevronDownIcon
            size={16}
            className="inline-block ml-1 mb-px"
          />
        </th>

        <th
          scope="col"
          className="table-th"
        >
          <ChevronDownIcon
            size={16}
            className="inline-block ml-1 mb-px"
          />
        </th>
        <th
          scope="col"
          className="table-th"
        >
          Total
          <ChevronDownIcon
            size={16}
            className="inline-block ml-1 mb-px"
          />
        </th>
        <th
          scope="col"
          className="table-th"
        >
          Acciones
        </th>
      </tr>
    </thead>
  )
}

export default QuotationTableHeader
