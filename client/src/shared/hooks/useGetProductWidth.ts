import { useEffect } from 'react';
import { PRODUT_ITEM } from '../consts/product';

export function useGetProductWidth(setItemWidth: (v: number) => void) {
  useEffect(() => {
    function getItemWidth() {
      const container = document.querySelector('.my-container');

      if (!container) {
        return;
      }

      const padding = window
        .getComputedStyle(container)
        .paddingInline.slice(0, -2);

      const viewport = container.clientWidth - 2 * +padding;

      let itemQuantity = Math.ceil(viewport / PRODUT_ITEM.WIDTH_MAX);

      const width =
        (viewport - (itemQuantity - 1) * PRODUT_ITEM.GAP) / itemQuantity;

      if (width < PRODUT_ITEM.WIDTH_MIN) {
        itemQuantity--;
      }

      const computedItemWidth =
        (viewport - (itemQuantity - 1) * PRODUT_ITEM.GAP) / itemQuantity;

      setItemWidth(computedItemWidth);
    }

    getItemWidth();

    window.addEventListener('resize', getItemWidth);

    return () => {
      window.removeEventListener('resize', getItemWidth);
    };
  }, []);
}
