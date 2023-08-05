import Header from './components/Header'
import CreateQuotation from './components/CreateQuotation'
import AddButton from './components/AddButton'
import QuotationList from './components/QuotationList'
import { useEffect, useState } from 'react'
import { getQuotations, client } from './services/supabase'


function App() {
  const [viewOpen, setViewOpen] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)

  useEffect(() => {
    getQuotations()
      .then(data => {
        const sortData = [...data].sort((a, b) => b.quo_number - a.quo_number)
        setQuotations(sortData)
      })
  }, [])


  const TYPE = {
    insert: "INSERT",
    update: "UPDATE",
    delete: "DELETE",
  };

  const handleSubscription = (payload) => {
    if (payload.eventType === TYPE.insert) {
      setQuotations((prev) => [...prev, payload.new]);
    }

    if (payload.eventType === TYPE.update) {
      setQuotations((prev) =>
        prev.map((item) => item.id === payload.new.id ? payload.new : item)
      );
    }

    if (payload.eventType === TYPE.delete) {
      setQuotations((prev) =>
        prev.filter((item) => item.id !== payload.old.id)
      );
    }
  };

  useEffect(() => {
    const quotations = client.channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cotizaciones" },
        (payload) => handleSubscription(payload),
      )
      .subscribe();

    return () => {
      quotations.unsubscribe();
    };
  }, []);


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


  const openView = () => {
    setViewOpen(true)
  }

  const closeView = () => {
    setViewOpen(false)
  }


  return (
    <div className='min-h-screen'>
      <Header />
      <div className='max-w-sm px-4 mt-4 mx-auto'>
        <header className=''>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-3xl font-extrabold'>Cotización</h2>
              <p className='text-sm'>Hay un total de {quotations.length} Cotizaciones.</p>
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
        <QuotationList 
          onOpenView={openView} 
          onCloseView={closeView} 
          quotations={quotations} 
          updateQuo={handleupdateQuo}
        />
      </div>
      {openCreateQuo &&
        <CreateQuotation quotations={quotations} quoToEdit={quoToEdit} onClose={closeCreateQuo} />
      }

    </div>
  )
}

export default App
