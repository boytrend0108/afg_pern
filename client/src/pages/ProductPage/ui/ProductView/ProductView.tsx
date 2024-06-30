import React from 'react';
import { MiniSlider } from '../../../../widgets/Sliders/MiniSlider';
import './ProductView.scss';
import { ProductType, PromoType } from '../../../../entities/ProductItem/types';
import { getPromoType } from '../../helpers/getPromoType';
import { useTranslation } from 'react-i18next';
// import Model3D from '../../../../widgets/3DModel/intex';

type Props = {
  product: ProductType | null;
};

export const ProductView: React.FC<Props> = ({ product }) => {
  const promoType: PromoType =
    (product && getPromoType(product)) || 'Recommended';
  const { t } = useTranslation();

  return (
    <div className="ProductView">
      <MiniSlider
        promoType={promoType}
        title={t('ProductPage.General view')}
        isShow={true}
      />

      {/* <MiniSlider
        promoType={promoType}
        title={t('ProductPage.Exterior')}
        images={product ? product.product_image_inters : []}
      />

      <MiniSlider
        promoType={promoType}
        title={t('ProductPage.Interior')}
        images={product ? product.product_image_inters : []}
      />

      <MiniSlider
        promoType={promoType}
        title={t('ProductPage.3D model')}
        images={product ? product.product_image_inters : []}
      /> */}
      {/* <Model3D title={t('ProductPage.3D model')} isShow={true} /> */}
    </div>
  );
};
