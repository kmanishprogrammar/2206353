import { useState, useEffect, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetchData<T>(
    fetchFn: () => Promise<T>,
    initialFetch = true,
    refreshInterval?: number
 ): FetchState<T> & { refetch: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: initialFetch,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!state.data) {
         setState(prevState => ({ ...prevState, loading: true, error: null }));
    } else {
        setState(prevState => ({ ...prevState, error: null }));
    }

    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      console.error("Fetch error:", err);
      setState(prevState => ({
            ...prevState,
            loading: false,
            error: err instanceof Error ? err : new Error('An unknown error occurred')
      }));
    }
  }, [fetchFn, state.data]);


  useEffect(() => {
    if (initialFetch) {
      fetchData();
    }
    let intervalId: number | undefined;
     if (refreshInterval) {
        intervalId = setInterval(fetchData, refreshInterval);
     }

     return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
     };
  }, [fetchData, initialFetch, refreshInterval]); 


  return { ...state, refetch: fetchData };
}

export default useFetchData;