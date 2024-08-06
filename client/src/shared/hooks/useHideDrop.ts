import React, { useEffect } from 'react';

export const useHideDrop = (
  ref: React.RefObject<any>,
  onClose: (v: boolean) => void,
) => {
  useEffect(() => {
    const closeSelect = (e: any) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose(false);
      }
    };

    document.body.addEventListener('mousedown', closeSelect);

    return () => {
      document.body.removeEventListener('mousedown', closeSelect);
    };
  }, []);
};
