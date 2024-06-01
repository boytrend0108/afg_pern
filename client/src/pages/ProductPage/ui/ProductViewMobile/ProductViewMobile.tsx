import './ProductViewMobile.scss';
import { MyTabSwitcher } from '../../../../shared/ui';
import { useSearchParams } from 'react-router-dom';
import { TABS } from './consts';
import { TabType } from './types';
import { MiniSliderMobile } from '../../../../widgets/Sliders/MiniSliderMobile';
import { ProductType } from '../../../../entities/ProductItem/types';
import React from 'react';

type Props = {
  product: ProductType | null;
};

export const ProductViewMobile: React.FC<Props> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'general';

  return (
    <div className="ProductViewMobile">
      <MyTabSwitcher tabs={TABS} />

      {tab === TabType.general && (
        <MiniSliderMobile images={product ? product.product_images : []} />
      )}

      {tab === TabType.interior && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
        />
      )}

      {tab === TabType.exterior && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
        />
      )}

      {tab === TabType.model && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
        />
      )}
    </div>
  );
};
