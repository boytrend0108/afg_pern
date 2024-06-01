import React from 'react';
import { MiniSlider } from '../../../../widgets/Sliders/MiniSlider';
import './ProductView.scss';
import { ProductType } from '../../../../entities/ProductItem/types';

type Props = {
  product: ProductType | null;
};

export const ProductView: React.FC<Props> = ({ product }) => {
  return (
    <div className="ProductView">
      <MiniSlider
        title="General view"
        isShow={true}
        images={product ? product.product_images : []}
      />
      <MiniSlider
        title="Exterior"
        images={product ? product.product_image_inters : []}
      />
      <MiniSlider
        title="Interior"
        images={product ? product.product_image_inters : []}
      />
      <MiniSlider
        title="3D model"
        images={product ? product.product_image_inters : []}
      />
    </div>
  );
};
