import { useState } from 'react';

export const useFetching = (callback: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async (...args: any[]) => {
    try {
      setError('');
      setIsLoading(true);

      await callback(...args);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
