import { useMemo, useState } from 'react'
import AddButton from './components/AddButton'
import EditModal from './components/EditModal'
import InputSearch from './components/InputSearch'
import Pagination from './components/Pagination'
import QuotationsTable from './components/QuotationsTable'
import TableEmpety from './components/TableEmpety'
import { createSearchInstance } from './services/search'

import Modal from './atoms/Modal'
import { ROWS_PER_PAGE, VIABILITY } from './constants'
import { useRealTime } from './hooks/use-real-time'

function App() {
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[1])
  const [viabilityFilter, setViabilityFilter] = useState('Todos')
  const [page, setPage] = useState(1)
  const { quotations } = useRealTime()

  const instanceSearch = createSearchInstance(quotations, {
    keys: ['company', 'quo_number', 'ruc'],
  })

  const hasFilterValue = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    let filteredQuotations = [...quotations]
    if (hasFilterValue) {
      const results = instanceSearch.search(filterValue)
      const items = results.map((result) => result.item)
      return items
    }

    if (viabilityFilter !== 'Todos') {
      filteredQuotations = filteredQuotations.filter(
        (quo) => quo.viability === viabilityFilter
      )
      setPage(1)
    }

    return filteredQuotations
  }, [filterValue, quotations, viabilityFilter, rowsPerPage])

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage)
  }, [filteredItems])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const onNextPage = () => {
    if (page === pages) {
      return
    }
    setPage(page + 1)
  }

  const updatePage = (page) => {
    setPage(page)
  }

  const onRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value))
    setPage(1)
  }

  const onSearchValue = (event) => {
    setFilterValue(event.target.value)
    setPage(1)
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
            <AddButton
              disabled={quotations.length === 0}
              onClick={handleQuotationToggle}
            >
              Agregar
            </AddButton>
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
          {quotations.length > 0 ? (
            <QuotationsTable
              quotations={items}
              updateQuo={handleupdateQuo}
            />
          ) : (
            <TableEmpety />
          )}
        </div>
        <Pagination
          currentPage={page}
          totalPages={pages}
          onNextPage={onNextPage}
          updatePage={updatePage}
        />
      </div>
      {openCreateQuo && (
        <Modal
          title={quoToEdit ? 'Actualizar Cotización' : 'Crear Cotización'}
          isOpen={openCreateQuo}
          onClose={closeCreateQuo}
        >
          <EditModal
            quotations={quotations}
            quoToEdit={quoToEdit}
            onClose={closeCreateQuo}
          />
        </Modal>
      )}
    </main>
  )
}

export default App
