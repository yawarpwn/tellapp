import { useEffect, useState, useMemo } from 'react'
import { useRealTime } from '../hooks/use-real-time'
import { filterUniqueCompany } from '../utils'


export default function CustomersPage() {
  const { quotations } = useRealTime()

  const customers = useMemo(() => {
    const customersFiltered = quotations.filter((x) => x.viability === 'Safe')
    return filterUniqueCompany(customersFiltered, 'ruc')
  }, [quotations])

  return (
    <div className="overflow-x-auto">
      <table
        aria-multiselectable="true"
        tabIndex={-1}
        className="w-full min-w-full h-auto table-auto text-xs "
      >
        <thead
          className="sticky top-0 left-0 z-10 bg-foreground-100"
          role="rowgroup"
        >
          <tr
            role="row"
            className="outline-none"
          >
            <th className="table-th">Cliente</th>

            <th className="table-th">Ruc</th>

            <th className="table-th">Dirección</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {customers.map((customer, index) => {
            return (
              <tr
                key={index}
                className={`${index % 2 ? 'bg-content2' : ''}`}
              >
                <td className="table-td">{customer.company}</td>

                <td className="table-td">{customer.ruc}</td>

                <td className="table-td">{customer.address}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
