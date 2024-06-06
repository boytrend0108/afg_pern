import React, { useEffect, useState } from 'react';

import './ProductPage.scss';
import { MySearch } from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { ProductsSlider } from '../../../widgets/Sliders/ProductsSlider';
import { MainSection } from './MainSection/MainSection';
import { ComparisonTable } from './ComparisonTable/ui/ComparisonTable';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { productAction } from '../../../entities/ProductItem';

export const ProductPage = () => {
  const [showCompare, setShowCompare] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.scrollTop = 400;
  }, []);

  useEffect(() => {
    setShowCompare(false);
  }, [showComparisonTable]);

  const handleRecommendClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLElement).dataset.button) {
      return;
    }

    document.documentElement.scrollTop = 0;
    setShowCompare(false);
    setShowComparisonTable(false);
    dispatch(productAction.clearCompare());
  };

  return (
    <section className="ProductPage my-container">
      <header className="ProductPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList />
      </header>

      {showComparisonTable ? (
        <ComparisonTable onClose={() => setShowComparisonTable(false)} />
      ) : (
        <MainSection
          showCompare={showCompare}
          setShowCompare={setShowCompare}
          setShowComparisonTable={() => setShowComparisonTable(true)}
        />
      )}

      <footer
        className="ProductPage__footer"
        onClick={(e) => handleRecommendClick(e)}
      >
        <h2 className="ProductPage__recommend-title">We recommend</h2>
        <ProductsSlider />
      </footer>
    </section>
  );
};
