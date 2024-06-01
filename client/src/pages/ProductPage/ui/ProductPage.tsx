import { useEffect, useState } from 'react';

import './ProductPage.scss';
import { MySearch } from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { ProductsSlider } from '../../../widgets/Sliders/ProductsSlider';
import { MainSection } from './MainSection/MainSection';
import { ComparisonTable } from './ComparisonTable/ComparisonTable';

export const ProductPage = () => {
  const [showCompare, setShowCompare] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    setShowCompare(false);
  }, [showComparisonTable]);

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

      <footer className="ProductPage__footer">
        <ProductsSlider />
      </footer>
    </section>
  );
};
