import { useCallback, useState } from 'react';

export default function useFetch({ route, options = {}, onSuccess, onError, onFinish }) {
  const [fetching, setFetching] = useState(false);

  const retrieve = useCallback(async () => {
    try {
      setFetching(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(route, options);
      const json = await response.json();

      if (onSuccess) onSuccess(json);
    } catch (error) {
      if (onError) onError(error);
    } finally {
      if (onFinish) onFinish();
      setFetching(false);
    }
  }, [route, options, onSuccess, onError, onFinish]);

  return {
    fetching,
    retrieve,
  };
}
