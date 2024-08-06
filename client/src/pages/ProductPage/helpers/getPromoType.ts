import { ProductType, PromoType } from '../../../entities/ProductItem/types';

export const getPromoType = (product: ProductType): PromoType => {
  const { product_infos: productInfos } = product;

  const promoType = productInfos.find((item) => item.title === 'promoType');

  return (promoType?.description as PromoType) || 'Recommended';
};
