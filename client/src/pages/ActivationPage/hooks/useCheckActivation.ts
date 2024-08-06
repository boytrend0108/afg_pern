import { useEffect } from 'react';
import { user } from '../../../entities/User';

export function useCheckActivation(
  setActive: (v: boolean) => void,
  setLoading: (v: boolean) => void,
  setError: (v: string) => void,
  activationToken: string | undefined,
) {
  useEffect(() => {
    if (!activationToken) {
      return;
    }

    setLoading(true);

    user.userAPI
      .activate(activationToken)
      .then(() => setActive(true))
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }, []);
}
