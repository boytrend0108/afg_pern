import './ProductItem.scss';

export const ProductItem = () => {
  return (
    <div className="ProductItem">
      <div className="ProductItem__image">
        <img className="ProductItem__image-box" src="/products/product-1.png" />
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
