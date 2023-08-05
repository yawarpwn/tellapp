import { useCallback, useEffect, useRef, useState } from 'react';

const initialState = {
    count: null,
    data: null,
    error: null,
    fetching: false,
    stale: false,
};

export function useSelect(table, config = { columns: '*', options: {} }) {
    const client = useClient();
    const isMounted = useRef(false);
    const [state, setState] = useState({
        ...initialState,
        stale: false,
    });

    const execute = useCallback(async () => {
        if (config.pause) return null;
        setState((x) => ({
            ...initialState,
            data: x.data,
            stale: true,
            fetching: true,
        }));

        const source = client.from(table).select(config.columns, config.options);
        const { count, data, error } = await (config.filter
            ? config.filter(source)
            : source);
        const res = { count, data, error };
        if (isMounted.current) setState({ ...res, stale: false, fetching: false });
        return res;
    }, [client, config, table]);

    useEffect(() => {
        isMounted.current = true;
        execute();
        return () => {
            isMounted.current = false;
        };
    }, [config?.filter]);

    return [state, execute];
}

