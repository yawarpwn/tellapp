import Header from './components/Header'
import InputSearch from './components/InputSearch'
import EditModal from './components/EditModal'
import AddButton from './components/AddButton'
import QuotationsTable from './components/QuotationsTable'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useMemo } from 'react'
import { useRealTime } from './hooks/use-real-time'

function App() {
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const { quotations } = useRealTime()

  const hasFilterValue = Boolean(filterValue)

  const filteredQuotations = useMemo(() => {
    if (hasFilterValue) {
      return quotations.filter(x => x.company.toLowerCase().includes(filterValue.toLowerCase()))
    }
    return quotations
  }, [filterValue, quotations])

  // Paginacion
  const pages = Math.ceil(quotations.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredQuotations.slice(start, end)

  }, [page, filteredQuotations, rowsPerPage])

  const onNextPage = () => {
    if (page < pages) {
      setPage(page + 1)
    }
  }

  const onPrevPage = () => {
    if (page < 0) {
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


  return (
    <div className='max-w-3xl p-2 md:p-4 my-2 shadow-xl rounded-lg mx-auto w-full bg-[hsl(var(--theme-background))] text-[hsl(var(--theme-foreground))]'>
      <Header />
      <main>
        <div className='flex flex-col gap-4 w-full relative'>
          <header className='flex justify-between items-end gap-3'>
            <InputSearch onSearchValue={onSearchValue} />
            <AddButton onClick={handleQuotationToggle}>Agregar</AddButton>
          </header>
          <div className='flex justify-between items-center'>
            <span className='text-xs text-zinc-500'>
              Hay {quotations.length} cotizaciones
            </span>
            <label className='flex text-zinc-500 text-xs'>
              Filas por pagina:
              <select className='bg-transparent outline-none'
                onChange={onRowsPerPageChange}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </label>
          </div>
          <div className='w-full overflow-x-auto'>
            <QuotationsTable
              quotations={items}
              updateQuo={handleupdateQuo}
            />
          </div>
          <header className='flex items-center justify-between'>
            <button onClick={onPrevPage}>prev</button>
            <button onClick={onNextPage}>next</button>
          </header>
        </div>
      </main>
      {openCreateQuo &&
        createPortal(
          <EditModal quotations={quotations} quoToEdit={quoToEdit} onClose={closeCreateQuo} />,
          document.body
        )
      }
    </div>
  )
}

export default App

