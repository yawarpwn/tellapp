import { useState } from 'react'
import Header from './components/Header'
import { CreateQuotation } from './components/CreateQuotation'
import { useQuotationStore } from './store/quotation'

//Components
import ChevronDownIcon from './icons/ChevronDownIcon'
import AddButton from './components/AddButton'

import  QuotationList  from './components/QuotationList'

function App() {
  const quotations = useQuotationStore(state => state.quotations)
  const [openQuote, setOpenQuote] = useState(false)

  const handleClose = () => {
    setOpenQuote(false)
  }
  const toggleQuote = () => {
    setOpenQuote(!openQuote)
  }

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='max-w-3xl px-4 mt-4 mx-auto'>
        <header className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>Cotización</h2>
            <p className='text-sm'>Hay un total de 20 Cotizaciones.</p>
          </div>
          <div className='flex items-center gap-x-4'>
            <div className='flex gap-x-2'>
              <p>Filter by status</p>
              <ChevronDownIcon />
            </div>
            <AddButton onClick={toggleQuote}>Agregar</AddButton>
          </div>
        </header>
          <QuotationList quotations={quotations} />
      </div>
      {openQuote &&
        <CreateQuotation onClose={handleClose} />
      }
    </div>
  )
}

export default App
