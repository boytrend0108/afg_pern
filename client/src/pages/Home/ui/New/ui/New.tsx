import { useState } from 'react';
import { ProductItem } from '../../../../../entities/ProductItem';
import { MyButton } from '../../../../../shared/ui';
import { ContactUs } from '../../ContactUs/ContactUs';
import './New.scss';
import { useGetAppWidth } from '../../../../../shared/hooks';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../shared/hooks/reduxHooks';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetNewProduct } from '../hooks/useGetNewProduct';
import { useAddAdvertising } from '../hooks/useAddAdvertising';
import { goToProductPage } from '../../../../../shared/helpers/goToProductPage';

export const New = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);
  const { products } = useAppSelector((state) => state.product);
  const [currentProd, setCurrentProd] = useState(products);
  const { t } = useTranslation();

  useGetAppWidth(width, setWidth);
  useGetNewProduct(dispatch);
  useAddAdvertising(width, products, setCurrentProd);

  return (
    <div className="New">
      <div className="New__container">
        <h2 className="New__title">{t('sectionTitle.New')}</h2>

        <div className="New__row">
          {currentProd.map((item) => (
            <div
              key={item.id}
              onClick={() => goToProductPage(item, navigate, dispatch)}
            >
              <ProductItem machine={item} />
            </div>
          ))}

          <ContactUs />
        </div>
      </div>

      <Link to="catalog?show=new">
        <MyButton className="MyButton New__btn">
          {t('buttons.See more')}
        </MyButton>
      </Link>
    </div>
  );
};
