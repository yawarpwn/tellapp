import Header from './components/Header'
import InputSearch from './components/InputSearch'
import CreateQuotation from './components/CreateQuotation'
import AddButton from './components/AddButton'
import QuotationsTable from './components/QuotationsTable'
import { useEffect, useState, useRef } from 'react'
import { getQuotations, client } from './services/supabase'
import { createPortal } from 'react-dom'

function App() {
  const [viewOpen, setViewOpen] = useState(false)
  const [quotations, setQuotations] = useState([])
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(true)
  const isMounted = useRef(false)

  useEffect(() => {
    if (openCreateQuo) {
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
    <div className='max-w-lg mx-auto w-full'>
      <Header />
      <main>
        <div className='flex flex-col gap-4 w-full relative'>
          <header className='flex justify-between items-end gap-3'>
            <InputSearch />
            <AddButton onClick={handleQuotationToggle}>Agregar</AddButton>
          </header>
          <div className='flex justify-between items-center'>
            <span className='text-xs text-zinc-500'>
              Hay 60 cotizaciones
            </span>
            <label className='flex text-zinc-500 text-xs'>
              Filas por pagina:
              <select className='bg-transparent outline-none'>
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </label>
          </div>
          <QuotationsTable
            onOpenView={openView}
            onCloseView={closeView}
            quotations={quotations}
            updateQuo={handleupdateQuo}
          />
        </div>
      </main>
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

