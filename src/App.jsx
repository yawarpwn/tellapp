import Header from './components/Header'
import QuotationPrint from './components/QuotationPrint'
import { CreateQuotation } from './components/CreateQuotation'
import { useQuotationStore } from './store/quotation'

//Components
import ChevronDownIcon from './icons/ChevronDownIcon'
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
      <div className='max-w-3xl px-4 mt-4 mx-auto'>
        <header className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Cotización</h2>
            <p className='text-sm'>Hay un total de {store.quotations.length} Cotizaciones.</p>
          </div>
          <div className='flex items-center gap-x-4'>
            <div className='flex gap-x-2'>
              <p>Filter by status</p>
              <ChevronDownIcon />
            </div>
            <AddButton onClick={handleQuotationToggle}>Agregar</AddButton>
          </div>
        </header>
        <QuotationList quotations={store.quotations} />
      </div>
      {store.openCreateQuo &&
        <CreateQuotation />
      }
      {
        store.openPrintQuo &&
        <QuotationPrint />
      }
    </div>
  )
}

export default App
