import Header from './components/Header'
import CreateQuotation from './components/CreateQuotation'
import AddButton from './components/AddButton'
import QuotationList from './components/QuotationList'
import { useEffect, useState, useRef } from 'react'
import { getQuotations, client } from './services/supabase'
import { createPortal } from 'react-dom'

function App() {
  const [viewOpen, setViewOpen] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)
  const isMounted = useRef(false)

  useEffect(() => {
    if(openCreateQuo) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
    
  }, [openCreateQuo])

  useEffect(() => {
    // Marcar el componente como montado cuando se monte
    isMounted.current = true
    getQuotations()
      .then(data => {
        setQuotations(data)
      })
      .catch(error => {
        console.error('Error al obtener las cotizaciones:', error);
      });

    // Desmontar el componente cuando se desmonte
    return () => {
      isMounted.current = false
    }
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
    // Verificar que el componente esté montado antes de suscribirse a los cambios
    if (isMounted.current) {
      const subscription = client.channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "cotizaciones" },
          (payload) => handleSubscription(payload),
        )
        .subscribe();

      // Desuscribirse cuando el componente se desmonte
      return () => {
        subscription.unsubscribe();
      };
    }
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
        </header>
        <QuotationList
          onOpenView={openView}
          onCloseView={closeView}
          quotations={quotations}
          updateQuo={handleupdateQuo}
        />
      </div>
      {openCreateQuo &&
        createPortal(
          <CreateQuotation quotations={quotations} quoToEdit={quoToEdit} onClose={closeCreateQuo} />,
          document.body
        )
      }
    </div>
  )
}

export default App

