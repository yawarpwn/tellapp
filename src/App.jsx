import Header from './components/Header'
import CreateQuotation from './components/CreateQuotation'
import { useQuotationStore } from './store/quotation'
import AddButton from './components/AddButton'
import QuotationList from './components/QuotationList'
import { useEffect, useState } from 'react'
import { useRealtime } from './hooks/useRealtime'


function App() {
  const store = useQuotationStore()
  const { data, fetching, error } = useRealtime()

  useEffect(() => {
    if (data) {
      store.setQuotations(data)
    }
  }, [data])


  const [viewOpen, setViewOpen] = useState(false)

  const handleQuotationToggle = () => {
    store.updateQuoToEdit(null)
    store.toggleCreateQuo()
  }


  const openView = () => {
    setViewOpen(true)
  }

  const closeView = () => {
    setViewOpen(false)
  }

  if (fetching) {
    return 'CArgando....'
  }

  if (error) {
    return 'errro'
  }


  return (
    <div className='min-h-screen'>
      <Header />
      <div className='max-w-sm px-4 mt-4 mx-auto'>
        <header className=''>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-3xl font-extrabold'>Cotización</h2>
              <p className='text-sm'>Hay un total de {store.quotations.length} Cotizaciones.</p>
            </div>
            <div className='flex items-center gap-x-4'>
              <AddButton onClick={handleQuotationToggle}>Agregar</AddButton>
            </div>
          </div>
          <div className='flex gap-x-2 justify-between'>
            <button type='buton' className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 1</button>
            <button type='button' className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 2</button>
            <button type='button' className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 3</button>
            <button type='button' className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 4</button>
          </div>
        </header>
        <QuotationList onOpenView={openView} onCloseView={closeView} quotations={store.quotations} />
      </div>
      {store.openCreateQuo &&
        <CreateQuotation quotations={store.quotations} quoToEdit={store.quoToEdit} onClose={store.closeCreateQuo} />
      }

    </div>
  )
}

export default App
