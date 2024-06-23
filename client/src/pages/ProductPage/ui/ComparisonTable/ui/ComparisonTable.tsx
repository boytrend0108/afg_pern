/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import './ComparisonTable.scss';

import { MyButton } from '../../../../../shared/ui';
import { ProductItem } from '../../../../../entities/ProductItem';
import { useGetTitle } from '../hooks';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../shared/hooks/reduxHooks';
// eslint-disable-next-line max-len
import localStorageService from '../../../../../shared/services/localStorageService';
import { prepareOptions } from '../services/prepareOptions';
import { closeTab } from '../services/closeTab';
import { addToFavorite } from '../services/addToFavorite';
import { useTranslation } from 'react-i18next';

type Props = {
  onClose: () => void;
};

export const ComparisonTable: React.FC<Props> = ({ onClose }) => {
  const [btnTitle, setBtnTitle] = useState('Add to favorite');
  const { compare } = useAppSelector((state) => state.product);
  const [options, setOptions] = useState({});
  const { user } = useAppSelector((state) => state.user);
  const [favoriteWatcher, setFavoriteWatcher] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useGetTitle(setBtnTitle);

  useEffect(() => {
    prepareOptions({ compare, setOptions });
  }, [compare]);

  return (
    <div className="ComparisonTable">
      <div className="ComparisonTable__header">
        <h2 className="ComparisonTable__title">{t('buttons.Compare')}</h2>

        <img
          src="/my-icons/close-btn.svg"
          alt="close"
          className="ComparisonTable__close"
          onClick={() => closeTab({ dispatch, onClose })}
        />
      </div>

      <table className="ComparisonTable__table">
        <thead style={{ backgroundColor: 'white' }}>
          <tr className="ComparisonTable__row">
            <th scope="col">
              <div className="ComparisonTable__table-header">
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="ComparisonTable__logo"
                />
              </div>
            </th>

            {compare.map((el, i) => (
              <th scope="col" className="ComparisonTable__th" key={i}>
                <div className="ComparisonTable__product">
                  <ProductItem
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    machine={el}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Object.entries(options).map(([key, value]) => (
            <tr key={key} className="ComparisonTable__row">
              <th scope="row">{key}</th>
              <td>{value as any[][0]}</td>
              <td>{value as any[][1]}</td>
              {/* <td>22</td> */}
            </tr>
          ))}

          <tr className="ComparisonTable__row">
            <th scope="row"></th>
            {compare.map((el) => (
              <td key={el.id}>
                <MyButton
                  style={{ margin: '0 auto' }}
                  className="ComparisonTable__btn"
                  onClick={() =>
                    addToFavorite({
                      productId: el.id,
                      user,
                      setFavoriteWatcher,
                      favoriteWatcher,
                    })
                  }
                >
                  {localStorageService
                    .get('favorite')
                    ?.includes(el.id.toString())
                    ? t('buttons.remove')
                    : t(`buttons.${btnTitle}`)}
                </MyButton>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
