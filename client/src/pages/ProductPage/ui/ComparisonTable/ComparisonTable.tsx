import React, { useState } from 'react';
import './ComparisonTable.scss';

import { MyButton } from '../../../../shared/ui';
import { ProductItem } from '../../../../entities/ProductItem';
import { useGetTitle } from './hooks';

type Props = {
  onClose: () => void;
};

const options = [
  { id: 1, value: 'Year' },
  { id: 2, value: 'Hours' },
  { id: 3, value: 'Reference' },
  { id: 4, value: 'Location' },
  { id: 5, value: 'Certificate' },
  { id: 6, value: 'Certificate' },
  { id: 7, value: 'Certificate' },
  { id: 8, value: 'Certificate' },
  { id: 9, value: 'Certificate' },
];

export const ComparisonTable: React.FC<Props> = ({ onClose }) => {
  const [btnTitile, setBtnTitle] = useState('Add to favorite');

  useGetTitle(setBtnTitle);

  return (
    <div className="ComparisonTable">
      <div className="ComparisonTable__header">
        <h2 className="ComparisonTable__title">Comparison</h2>

        <img
          src="/my-icons/close-btn.svg"
          alt="close"
          className="ComparisonTable__close"
          onClick={onClose}
        />
      </div>

      <table className="ComparisonTable__table">
        <thead>
          <tr>
            <th scope="col">
              <div className="ComparisonTable__table-header">
                <img
                  src="/logo-black.svg"
                  alt="logo"
                  className="ComparisonTable__logo"
                />
              </div>
            </th>

            <th scope="col" className="ComparisonTable__th">
              <div className="ComparisonTable__product">
                <ProductItem style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>

              <p className="ComparisonTable__product-title">SV15VT NEW</p>
            </th>

            <th scope="col" className="ComparisonTable__th">
              <div className="ComparisonTable__product">
                <ProductItem style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>

              <p className="ComparisonTable__product-title">SV15VT NEW</p>
            </th>

            {/* <th scope="col className="ComparisonTable__th"">
              <ProductItem />
            </th> */}
          </tr>
        </thead>

        <tbody>
          {options.map((op) => (
            <tr key={op.id}>
              <th scope="row">{op.value}</th>
              <td>HTML tables</td>
              <td>22</td>
              {/* <td>22</td> */}
            </tr>
          ))}

          <tr>
            <th scope="row"></th>
            <td>
              <MyButton style={{ margin: '0 auto' }}>{btnTitile}</MyButton>
            </td>

            <td>
              <MyButton style={{ margin: '0 auto' }}>{btnTitile}</MyButton>
            </td>
            {/* <td>22</td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
