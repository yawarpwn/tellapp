import Header from './components/Header'
import ViewPDF from './components/ViewPDF'
import CreateQuotation from './components/CreateQuotation'
import { useQuotationStore } from './store/quotation'

import AddButton from './components/AddButton'

import QuotationList from './components/QuotationList'

function App() {
  const store = useQuotationStore()

  const handleQuotationToggle = () => {
    store.updateQuoToEdit(null)
    store.toggleCreateQuo()
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
            <button className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 1</button>
            <button className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 2</button>
            <button className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 3</button>
            <button className='px-4 py-2 rounded-lg border text-purple-500 border-purple-500 '>filter 4</button>
          </div>
        </header>
        <QuotationList quotations={store.quotations} />
      </div>
      {store.openCreateQuo &&
        <CreateQuotation />
      }
    </div>
  )
}

export default App
