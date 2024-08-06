import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import './ProductPage.scss';
import { MySearch } from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { ProductsSlider } from '../../../widgets/Sliders/ProductsSlider';
import { MainSection } from './MainSection/MainSection';
import { ComparisonTable } from './ComparisonTable/ui/ComparisonTable';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/hooks/reduxHooks';
import { productAction } from '../../../entities/ProductItem';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line max-len
import { ComparisonTableMobile } from './ComparisonTableMobile/ui/ComparisonTableMobile';
import { MyLoader } from '../../../shared/ui/MyLoader/MyLoader';
import { useGetCurrentProduct } from '../hooks/useGetCurrentProduct';

const ProductPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [showCompare, setShowCompare] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [width, setWidth] = useState(600);
  const main = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.product);

  useGetCurrentProduct(id, setWidth, main, dispatch);

  useEffect(() => {
    setShowCompare(false);
  }, [showComparisonTable]);

  const handleRecommendClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLElement).dataset.button) {
      return;
    }

    setShowCompare(false);
    setShowComparisonTable(false);

    dispatch(productAction.clearCompare());
  };

  return (
    <section
      className={cn('ProductPage', {
        'my-container': width > 600 || (width < 600 && !showComparisonTable),
      })}
    >
      <header className="ProductPage__header">
        <MySearch style={{ marginBottom: '50px' }} />

        <CategoryList />
      </header>

      <main ref={main}>
        {showComparisonTable ? (
          <>
            <ComparisonTable onClose={() => setShowComparisonTable(false)} />

            <ComparisonTableMobile
              onClose={() => setShowComparisonTable(false)}
            />
          </>
        ) : (
          <MainSection
            showCompare={showCompare}
            setShowCompare={setShowCompare}
            setShowComparisonTable={() => setShowComparisonTable(true)}
          />
        )}
      </main>

      <footer
        className="ProductPage__footer"
        onClick={(e) => handleRecommendClick(e)}
      >
        <h2 className="ProductPage__recommend-title">
          {t('sectionTitle.We recommend')}
        </h2>
        <ProductsSlider />
      </footer>

      {loading && (
        <div className="ProductPage__loader">
          <MyLoader />
        </div>
      )}
    </section>
  );
};

export default ProductPage;
