import { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import AddButton from './components/AddButton'
import EditModal from './components/EditModal'
import Header from './components/Header'
import InputSearch from './components/InputSearch'
import QuotationsTable from './components/QuotationsTable'
import { ROWS_PER_PAGE, VIABILITY } from './contants'
import { useRealTime } from './hooks/use-real-time'
function App() {
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[1])
  const [viabilityFilter, setViabilityFilter] = useState('Todos')
  const [page, setPage] = useState(1)
  const { quotations } = useRealTime()

  const hasFilterValue = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredQuotations = [...quotations]
    if (hasFilterValue) {
      return filteredQuotations.filter((x) =>
        x.company.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    if (viabilityFilter !== 'Todos') {
      filteredQuotations = filteredQuotations.filter(
        (quo) => quo.viability === viabilityFilter,
      )
      setPage(1)
    }

    return filteredQuotations
  }, [filterValue, quotations, viabilityFilter, rowsPerPage])

  // Paginacion
  const pages = Math.ceil(quotations.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const onPrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value))
    setPage(1)
  }

  const onSearchValue = (event) => {
    setFilterValue(event.target.value)
  }

  const closeCreateQuo = () => {
    setOpenCreateQuo(false)
  }

  const handleQuotationToggle = () => {
    setQuoToEdit(null)
    setOpenCreateQuo(true)
  }

  const handleupdateQuo = (quoToEdit) => {
    setQuoToEdit(quoToEdit)
    setOpenCreateQuo(true)
  }

  const onFilterViability = (event) => {
    setViabilityFilter(event.target.value)
  }

  return (
    <main>
      <div className="flex flex-col gap-4 w-full relative">
        <header className="flex justify-between items-end gap-3">
          <InputSearch onSearchValue={onSearchValue} />
          <div className="flex gap-3">
            <select
              className="bg-transparent"
              onChange={onFilterViability}
              value={viabilityFilter}
            >
              <option value={'Todos'}>Todos</option>
              {Object.keys(VIABILITY).map((value) => {
                return (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                )
              })}
            </select>
            <AddButton onClick={handleQuotationToggle}>Agregar</AddButton>
          </div>
        </header>
        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-500">
            Hay {quotations.length} cotizaciones
          </span>
          <label className="flex text-zinc-500 text-xs">
            Filas por pagina:
            <select
              className="bg-transparent outline-none"
              onChange={onRowsPerPageChange}
            >
              {ROWS_PER_PAGE.map((row) => {
                return <option key={row}>{row}</option>
              })}
            </select>
          </label>
        </div>
        <div className="w-full overflow-x-auto">
          <QuotationsTable
            quotations={items}
            updateQuo={handleupdateQuo}
          />
        </div>
        <header className="flex items-center justify-between">
          <button onClick={onPrevPage}>prev</button>
          <button onClick={onNextPage}>next</button>
        </header>
      </div>
      {openCreateQuo &&
        createPortal(
          <EditModal
            quotations={quotations}
            quoToEdit={quoToEdit}
            onClose={closeCreateQuo}
          />,
          document.body,
        )}
    </main>
  )
}

export default App
