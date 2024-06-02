import React from 'react';
import { MiniSlider } from '../../../../widgets/Sliders/MiniSlider';
import './ProductView.scss';
import { ProductType, PromoType } from '../../../../entities/ProductItem/types';
import { getPromoType } from '../../helpers.ts/getPromoType';

type Props = {
  product: ProductType | null;
};

export const ProductView: React.FC<Props> = ({ product }) => {
  const promoType: PromoType =
    (product && getPromoType(product)) || 'Recomended';

  return (
    <div className="ProductView">
      <MiniSlider
        promoType={promoType}
        title="General view"
        isShow={true}
        images={product ? product.product_images : []}
      />

      <MiniSlider
        promoType={promoType}
        title="Exterior"
        images={product ? product.product_image_inters : []}
      />

      <MiniSlider
        promoType={promoType}
        title="Interior"
        images={product ? product.product_image_inters : []}
      />

      <MiniSlider
        promoType={promoType}
        title="3D model"
        images={product ? product.product_image_inters : []}
      />
    </div>
  );
};
