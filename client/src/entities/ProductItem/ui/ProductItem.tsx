import { useNavigate } from 'react-router-dom';
import './ProductItem.scss';
import React from 'react';

type Props = {
  className?: string;
  style?: { maxWidth: string; maxHeight: string };
};

export const ProductItem: React.FC<Props> = ({ className = '', ...props }) => {
  const navigate = useNavigate();

  return (
    <div
      {...props}
      className={`ProductItem ${className}`}
      onClick={() => navigate('/product/1')}
    >
      <div className="ProductItem__image">
        <img
          className="ProductItem__image-box"
          src="/products/product-1.png"
          width="280"
          height="420"
        />
        <div className="ProductItem__image-lable">NEW</div>
      </div>

      <div className="ProductItem__desc">
        <div className="ProductItem__desc-top">
          <p className="ProductItem__subtitle">Yanmar</p>
          <h3 className="ProductItem__title">SV15VT (NEW)</h3>

          <p className="ProductItem__breadcrumb">
            Expandable Undercarriage / New / Unused
          </p>
        </div>

        <div className="ProductItem__desc-bottom">
          <div className="ProductItem__desc-bottom-l">
            <p className="ProductItem__year">2023</p>
            <p className="ProductItem__time">2 uren</p>
          </div>

          <div className="ProductItem__desc-bottom-r">
            <p className="ProductItem__article">BM005821</p>
            <p className="ProductItem__price">€ 17.500</p>
          </div>
        </div>
      </div>
    </div>
  );
};
