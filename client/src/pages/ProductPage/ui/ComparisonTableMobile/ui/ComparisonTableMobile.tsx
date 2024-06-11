/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import './ComparisonTableMobile.scss';

import { MyButton } from '../../../../../shared/ui';
import { ProductItem } from '../../../../../entities/ProductItem';
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

export const ComparisonTableMobile: React.FC<Props> = ({ onClose }) => {
  const { compare } = useAppSelector((state) => state.product);
  const [options, setOptions] = useState({});
  const { user } = useAppSelector((state) => state.user);
  const [favoriteWatcher, setFavoriteWatcher] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    prepareOptions({ compare, setOptions });
  }, [compare]);

  return (
    <div className="ComparisonTableMobile">
      <div className="ComparisonTableMobile__header">
        <h2 className="ComparisonTableMobile__title">Comparison</h2>

        <img
          src="/my-icons/close-btn.svg"
          alt="close"
          className="ComparisonTableMobile__close"
          onClick={() => closeTab({ dispatch, onClose })}
        />
      </div>
      <ProductItem machine={compare[0]} />
      <ProductItem machine={compare[1]} />

      <table className="ComparisonTableMobile__table">
        <thead style={{ backgroundColor: 'white' }}>
          <tr className="ComparisonTableMobile__row">
            <th scope="col">{compare[0].title}</th>
            <th scope="col">{compare[1].title}</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(options).map(([key, value]) => (
            <tr key={key} className="ComparisonTableMobile__row">
              <td>
                <p>{t(`ComparisonTable.${key}`)}</p>
                <p>{value as any[][0]}</p>
              </td>
              <td>
                <p>{t(`ComparisonTable.${key}`)}</p>
                <p>{value as any[][1]}</p>
              </td>
            </tr>
          ))}

          <tr className="ComparisonTableMobile__row">
            {compare.map((el) => (
              <td key={el.id}>
                <MyButton
                  style={{ margin: '0 auto' }}
                  className="ComparisonTableMobile__btn"
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
                    ? 'Remove'
                    : t(`buttons.☆`)}
                </MyButton>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
