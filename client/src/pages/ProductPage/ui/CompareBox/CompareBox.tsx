import React from 'react';
import cn from 'classnames';

import { ProductItem, productAction } from '../../../../entities/ProductItem';
import './CompareBox.scss';
import { MyButton } from '../../../../shared/ui';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { ProductType } from '../../../../entities/ProductItem/types';

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

  const prepareList = products.filter((el) => el.id !== compare[0].id);

  const handleClick = (m: ProductType) => {
    if (compare.length === 2 && !compare.includes(m)) {
      return;
    }

    if (compare.includes(m)) {
      dispatch(productAction.removeFromCompare(m.id));
    } else {
      dispatch(productAction.addToCompare(m));
    }
  };

  const closeTab = () => {
    dispatch(productAction.clearCompare());
    onClose();
  };

  return (
    <div className="CompareBox">
      <div className="CompareBox__header">
        <h2 className="CompareBox__title">
          Select the model you want to compare with
        </h2>

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

      <div className="CompareBox__btn">
        {compare.length > 1 ? (
          <MyButton onClick={setShowComparisonTable}>Compare</MyButton>
        ) : (
          <MyButton style={{ backgroundColor: '#ADADAC' }}>
            Select model to compare
          </MyButton>
        )}
      </div>
    </div>
  );
};
