import { useState, useEffect } from 'react';
import { client } from '../services/supabase';
import { getQuotations } from '../services/supabase';
import { useQuotationStore } from '../store/quotation';

export function useRealtime(table = 'cotizaciones') {
  const store = useQuotationStore()
  // const [data, setData] = useState();
  // const [store.quotations, store.setQuotations] = useState();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setFetching(true)
      try {
        const data = await getQuotations();
        store.setQuotations(data);
        setFetching(false);
      } catch (error) {
        console.log('error fetching data:', error);
        setError(error);
        setFetching(false);
      }
    }

    fetchData();

  }, [])

  useEffect(() => {
    console.log('subscription')
    const subscription = client
      .channel('custom-all-channell')
      .on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => {
        handleSubscription(payload);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table]);

  const handleSubscription = (payload) => {
    if (!store.quotations) return;

    switch (payload.eventType) {
      case 'DELETE':
        store.setQuotations((prevData) => prevData.filter((item) => item.id !== payload.old.id));
        break;
      case 'INSERT':
        store.setQuotations((prevData) => [...prevData, payload.new]);
        break;
      case 'UPDATE':
        store.setQuotations((prevData) =>
          prevData.map((item) => (item.id === payload.new.id ? payload.new : item))
        );
        break;
      default:
        break;
    }
  };


  return { data: store.quotations, fetching, error };
}

