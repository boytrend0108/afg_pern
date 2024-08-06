import { productAction } from '../../entities/ProductItem';
import { ProductType } from '../../entities/ProductItem/types';

function goToProductPage(
  machine: ProductType,
  navigate: (v: string) => void,
  dispatch: (action: any) => void,
) {
  navigate(`/product/${machine.id}?tab=general`);
  dispatch(productAction.setCurrentProduct(machine));
}

export { goToProductPage };
