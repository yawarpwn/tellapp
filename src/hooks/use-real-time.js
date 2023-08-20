import { useEffect, useRef, useState } from 'react'
import { client, getQuotations } from '../services/supabase'

export function useRealTime() {
  const [quotations, setQuotations] = useState([])
  const isMounted = useRef(false)
  useEffect(() => {
    // Marcar el componente como montado cuando se monte
    isMounted.current = true
    getQuotations()
      .then((data) => {
        setQuotations(data)
      })
      .catch((error) => {
        console.error('Error al obtener las cotizaciones:', error)
      })

    // Desmontar el componente cuando se desmonte
    return () => {
      isMounted.current = false
    }
  }, [])

  const TYPE = {
    INSERT: 'INSERT',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
  }

  const handleSubscription = (payload) => {
    if (payload.eventType === TYPE.INSERT) {
      setQuotations((prev) =>
        [...prev, payload.new].sort((a, b) => b.quo_number - a.quo_number),
      )
    }

    if (payload.eventType === TYPE.UPDATE) {
      setQuotations((prev) =>
        prev.map((item) => (item.id === payload.new.id ? payload.new : item)),
      )
    }

    if (payload.eventType === TYPE.DELETE) {
      setQuotations((prev) => prev.filter((item) => item.id !== payload.old.id))
    }
  }

  useEffect(() => {
    // Verificar que el componente esté montado antes de suscribirse a los cambios
    if (isMounted.current) {
      const subscription = client
        .channel('custom-all-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'cotizaciones' },
          (payload) => handleSubscription(payload),
        )
        .subscribe()

      // Desuscribirse cuando el componente se desmonte
      return () => {
        subscription.unsubscribe()
      }
    }
  }, [])

  return {
    quotations,
  }
}
