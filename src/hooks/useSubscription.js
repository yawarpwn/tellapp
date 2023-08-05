import { useEffect } from 'react';

export function useSubscription(callback, config = { event: '*', table: '*' }, client) {
  useEffect(() => {
    const subscription = client
      .from(config.table ?? '*')
      .on(config.event ?? '*', callback)
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}

