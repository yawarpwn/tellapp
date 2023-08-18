import Header from './components/Header'
import InputSearch from './components/InputSearch'
import EditModal from './components/EditModal'
import AddButton from './components/AddButton'
import QuotationsTable from './components/QuotationsTable'
import { useEffect, useState, useRef } from 'react'
import { getQuotations, client } from './services/supabase'
import { createPortal } from 'react-dom'
import { useMemo } from 'react'

function App() {
  const [quotations, setQuotations] = useState([])
  const [quoToEdit, setQuoToEdit] = useState(null)
  const [openCreateQuo, setOpenCreateQuo] = useState(false)
  const [filterValue, setFilterValue] = useState('')
  const isMounted = useRef(false)

  const hasFilterValue = Boolean(filterValue)

  const filteredQuotations = useMemo(() => {
    if(hasFilterValue) {
      return quotations.filter(x => x.company.toLowerCase().includes(filterValue.toLowerCase()))
    } else {
      return quotations
    } 
  }, [filterValue])

  const onSearchValue = (event) => {
    setFilterValue(event.target.value)
  }


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
    INSERT: "INSERT",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
  };

  const handleSubscription = (payload) => {
    if (payload.eventType === TYPE.INSERT) {
      setQuotations((prev) => [...prev, payload.new].sort((a, b) => b.quo_number - a.quo_number));
    }

    if (payload.eventType === TYPE.UPDATE) {
      setQuotations((prev) =>
        prev.map((item) => item.id === payload.new.id ? payload.new : item)
      );
    }

    if (payload.eventType === TYPE.DELETE) {
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


  return (
    <div className='max-w-lg px-2 mx-auto w-full'>
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
              <select className='bg-transparent outline-none'>
                <option>5</option>
                <option>10</option>
                <option>15</option>
              </select>
            </label>
          </div>
          <div className='w-full overflow-x-auto'>
            <QuotationsTable
              quotations={filteredQuotations}
              updateQuo={handleupdateQuo}
            />
          </div>
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

