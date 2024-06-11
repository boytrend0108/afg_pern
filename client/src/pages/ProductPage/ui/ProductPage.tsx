import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import './ProductPage.scss';
import { MySearch } from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { ProductsSlider } from '../../../widgets/Sliders/ProductsSlider';
import { MainSection } from './MainSection/MainSection';
import { ComparisonTable } from './ComparisonTable/ui/ComparisonTable';
import { useAppDispatch } from '../../../shared/hooks/reduxHooks';
import { productAction } from '../../../entities/ProductItem';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line max-len
import { ComparisonTableMobile } from './ComparisonTableMobile/ui/ComparisonTableMobile';

export const ProductPage = () => {
  const [showCompare, setShowCompare] = useState(false);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  const [width, setWidth] = useState(600);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.scrollTop = 400;

    const setViewPortWidth = () => {
      setWidth(window.innerWidth);
    };

    setViewPortWidth();

    window.addEventListener('resize', setViewPortWidth);

    return () => {
      window.removeEventListener('resize', setViewPortWidth);
    };
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
    <section
      className={cn('ProductPage', {
        'my-container': width > 600 || (width < 600 && !showComparisonTable),
      })}
    >
      <header className="ProductPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList />
      </header>

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

      <footer
        className="ProductPage__footer"
        onClick={(e) => handleRecommendClick(e)}
      >
        <h2 className="ProductPage__recommend-title">
          {t('sectionTitle.We recommend')}
        </h2>
        <ProductsSlider />
      </footer>
    </section>
  );
};
