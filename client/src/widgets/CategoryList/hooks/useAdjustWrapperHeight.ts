import React, { useEffect } from 'react';
import { ROW_HEIGHT } from '../consts';

type Props = {
  wrapper: React.RefObject<HTMLDivElement>;
  list: React.RefObject<HTMLDivElement>;
  showAll: boolean;
};

export const useAdjustWrapperHeight = ({ wrapper, list, showAll }: Props) => {
  useEffect(() => {
    if (!wrapper.current) {
      return;
    }

    if (showAll) {
      wrapper.current.style.height = list.current?.offsetHeight + 'px';
    } else {
      wrapper.current.style.height = 2 * ROW_HEIGHT + 'px';
    }
  }, [showAll]);
};
