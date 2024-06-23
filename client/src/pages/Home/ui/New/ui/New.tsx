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
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetNewProduct } from '../hooks/useGetNewProduct';
import { useAddAdvertising } from '../hooks/useAddAdvertising';

export const New = () => {
  const dispatch = useAppDispatch();
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
            <ProductItem key={item.id} machine={item} />
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
