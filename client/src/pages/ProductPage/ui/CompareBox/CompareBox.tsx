import React, { useState } from 'react';
import cn from 'classnames';

import { ProductItem } from '../../../../entities/ProductItem';
import './CompareBox.scss';
import { MyButton } from '../../../../shared/ui';

const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  onClose: () => void;
  setShowComparisonTable: () => void;
};

export const CompareBox: React.FC<Props> = ({
  onClose,
  setShowComparisonTable,
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleClick = (m: number) => {
    if (selected.length === 2 && !selected.includes(m)) {
      return;
    }

    if (selected.includes(m)) {
      setSelected(selected.filter((el) => el !== m));
    } else {
      setSelected([m, ...selected]);
    }
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
          onClick={onClose}
          className="CompareBox__close"
        />
      </div>

      <div className="CompareBox__list">
        {machines.map((m) => (
          <div
            className={cn('CompareBox__wr', {
              'CompareBox__wr--selected': selected.includes(m),
            })}
            key={m}
            onClick={() => handleClick(m)}
          >
            <ProductItem />
          </div>
        ))}
      </div>

      <div className="CompareBox__btn">
        {selected.length ? (
          <MyButton onClick={setShowComparisonTable}>Compare</MyButton>
        ) : (
          <MyButton style={{ backgroundColor: '#ADADAC' }}>
            Select 1-2 models
          </MyButton>
        )}
      </div>
    </div>
  );
};
