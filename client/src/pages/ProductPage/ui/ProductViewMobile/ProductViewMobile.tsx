import './ProductViewMobile.scss';
import { MyTabSwitcher } from '../../../../shared/ui';
import { useSearchParams } from 'react-router-dom';
import { TABS } from './consts';
import { TabType } from './types';
import { MiniSliderMobile } from '../../../../widgets/Sliders/MiniSliderMobile';
import { ProductType, PromoType } from '../../../../entities/ProductItem/types';
import React from 'react';
import { getPromoType } from '../../helpers/getPromoType';

type Props = {
  product: ProductType | null;
};

export const ProductViewMobile: React.FC<Props> = ({ product }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'general';
  const promoType: PromoType =
    (product && getPromoType(product)) || 'Recommended';

  return (
    <div className="ProductViewMobile">
      <MyTabSwitcher tabs={TABS} />

      {tab === TabType.general && (
        <MiniSliderMobile
          images={product ? product.product_images : []}
          promoType={promoType}
        />
      )}

      {tab === TabType.interior && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
          promoType={promoType}
        />
      )}

      {tab === TabType.exterior && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
          promoType={promoType}
        />
      )}

      {tab === TabType.model && (
        <MiniSliderMobile
          images={product ? product.product_image_inters : []}
          promoType={promoType}
        />
      )}
    </div>
  );
};
