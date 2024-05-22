import { useEffect } from 'react';
import {
  MyBreadcrumb,
  MyButtonWhite,
  MySearch,
  MySocialBlack,
} from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { ProductsSlider } from '../../../widgets/ProductsSlider';
import { OptionGroup } from './OptionGroup/OptionGroup';
import './ProductPage.scss';
import { ProductView } from './ProductView/ProductView';
import { ProductViewMobile } from './ProductViewMobile/ProductViewMobile';
import { Link } from 'react-router-dom';

const product = {
  id: 1,
  title: 'product name',
};

export const ProductPage = () => {
  const breadcrumbs = [
    { id: 1, name: 'Home >', path: '/' },
    { id: 2, name: 'Catalog  >', path: '/catalog' },
    { id: 3, name: product.title, path: `/product/${product.id}` },
  ];

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <section className="ProductPage container">
      <header className="ProductPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList />
      </header>

      <main className="ProductPage__main">
        <div className="ProductPage__main-top">
          <div className="ProductPage__breadcrumb">
            <MyBreadcrumb breadcrumbs={breadcrumbs} />
          </div>
          <div className="ProductPage__social">
            <MySocialBlack />
          </div>
        </div>

        <div className="ProductPage__main-box">
          <ProductView />
          <ProductViewMobile />

          <div className="ProductPage__options">
            <div className="ProductPage__price-box">
              <div className="ProductPage__titles">
                <p className="ProductPage__brand">Liebherr</p>
                <p className="ProductPage__model">Liebherr R934C</p>
                <p className="ProductPage__subtitle">
                  Dutch Machine / Quick Coupler
                </p>
              </div>

              <p className="ProductPage__price">
                € 32.500 <span className="ProductPage__price-span">excl</span>
              </p>
            </div>

            <div className="ProductPage__info">
              <div className="ProductPage__info-item">
                <p className="ProductPage__info-title">Year</p>
                <p className="ProductPage__info-value">2008</p>
              </div>
              <div className="ProductPage__info-item">
                <p className="ProductPage__info-title">Hours</p>
                <p className="ProductPage__info-value">12.191</p>
              </div>
              <div className="ProductPage__info-item">
                <p className="ProductPage__info-title">Reference numbe</p>
                <p className="ProductPage__info-value">BM005801</p>
              </div>
            </div>

            <div className="ProductPage__btn-box">
              <Link to="booking">
                <MyButtonWhite className="ProductPage__btn--white">
                  Book
                </MyButtonWhite>
              </Link>

              <MyButtonWhite className="ProductPage__btn--white">
                Сompare
              </MyButtonWhite>

              <MyButtonWhite className="ProductPage__btn--white">
                <p className="ProductPage__btn-title">Get in touch</p>
              </MyButtonWhite>

              <MyButtonWhite className="ProductPage__btn--white">
                <a href="" className="ProductPage__btn-title">
                  WhatsApp
                </a>
              </MyButtonWhite>
            </div>

            <div className="ProductPage__option-group">
              <OptionGroup title="Common" />
              <div className="ProductPage__option-wr">
                <OptionGroup title="Sizes/Weights" />
                <OptionGroup title="Tires/Tracks" />
              </div>

              <div className="ProductPage__option-wr">
                <OptionGroup title="Engine information" />
                <OptionGroup title="Options" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="ProductPage__footer">
        <ProductsSlider />
      </footer>
    </section>
  );
};
