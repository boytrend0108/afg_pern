import React, { useRef } from 'react';
import cn from 'classnames';

import { ProductItem, productAction } from '../../../../entities/ProductItem';
import './CompareBox.scss';
import { MyButton } from '../../../../shared/ui';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { ProductType } from '../../../../entities/ProductItem/types';
import { useTranslation } from 'react-i18next';

type Props = {
  onClose: () => void;
  setShowComparisonTable: () => void;
};

export const CompareBox: React.FC<Props> = ({
  onClose,
  setShowComparisonTable,
}) => {
  const { products, compare } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);

  const prepareList = products.filter((el) => el.id !== compare[0].id);

  const handleClick = (m: ProductType) => {
    if (compare.length === 2 && compare.includes(m)) {
      dispatch(productAction.removeFromCompare());

      return;
    }

    if (compare.length === 2 && !compare.includes(m)) {
      dispatch(productAction.removeFromCompare());
      dispatch(productAction.addToCompare(m));
    } else {
      dispatch(productAction.addToCompare(m));
    }

    if (headerRef) {
      headerRef.current?.scrollIntoView();
    }
  };

  const closeTab = () => {
    dispatch(productAction.clearCompare());
    onClose();
  };

  return (
    <div className="CompareBox">
      <div className="CompareBox__header" ref={headerRef}>
        {/* <h2 className="CompareBox__title">{t('CompareBox.title')}</h2> */}
        <div>
          {compare.length > 1 ? (
            <MyButton onClick={setShowComparisonTable}>
              {t('buttons.Compare')}
            </MyButton>
          ) : (
            <MyButton
              style={{ backgroundColor: '#ADADAC' }}
              className="CompareBox__btn"
            >
              {t('buttons.Select model to compare')}
            </MyButton>
          )}
        </div>

        <img
          src="/my-icons/close-btn.svg"
          alt="close"
          onClick={closeTab}
          className="CompareBox__close"
        />
      </div>

      <div className="CompareBox__list">
        {prepareList.map((m) => (
          <div
            className={cn('CompareBox__wr', {
              'CompareBox__wr--selected': compare.find((el) => el.id === m.id),
            })}
            key={m.id}
            onClick={() => handleClick(m)}
          >
            <ProductItem machine={m} />
          </div>
        ))}
      </div>
    </div>
  );
};
