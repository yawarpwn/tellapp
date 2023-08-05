import { useState, useEffect } from 'react';
import { client } from '../services/supabase';
import { getQuotations } from '../services/supabase';

export function useRealtime(table = 'cotizaciones') {
  const [data, setData] = useState();
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getQuotations();
        setData(data);
        setFetching(false);
      } catch (error) {
        console.log('error fetching data:', error);
        setError(error);
        setFetching(false);
      }
    }

    fetchData();

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
    if (!data) return;

    switch (payload.eventType) {
      case 'DELETE':
        setData((prevData) => prevData.filter((item) => item.id !== payload.old.id));
        break;
      case 'INSERT':
        setData((prevData) => [...prevData, payload.new]);
        break;
      case 'UPDATE':
        setData((prevData) =>
          prevData.map((item) => (item.id === payload.new.id ? payload.new : item))
        );
        break;
      default:
        break;
    }
  };

  const reexecute = async () => {
    try {
      const data = await getQuotations();
      setData(data);
      setError(undefined);
      return { data, error: undefined };
    } catch (error) {
      console.log('error fetching data:', error);
      setError(error);
      return { data: undefined, error };
    } finally {
      setFetching(false);
    }
  };

  return { data, fetching, error, reexecute };
}

