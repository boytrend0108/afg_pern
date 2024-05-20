import { MyBreadcrumb, MySearch, MySocialBlack } from '../../../shared/ui';
import { CategoryList } from '../../../widgets/CategoryList';
import { MiniSlider } from '../../../widgets/MiniSlider';
import { ProductsSlider } from '../../../widgets/ProductsSlider';
import './ProductPage.scss';

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
          <div className="ProductPage__images">
            <MiniSlider
              images={[
                'excavator-1',
                'excavator-2',
                'excavator-3',
                'excavator-4',
                'excavator-5',
                'excavator-6',
              ]}
            />
            <MiniSlider
              images={[
                'excavator-1',
                'excavator-2',
                'excavator-3',
                'excavator-4',
                'excavator-5',
                'excavator-6',
              ]}
            />
            <MiniSlider
              images={[
                'excavator-1',
                'excavator-2',
                'excavator-3',
                'excavator-4',
                'excavator-5',
                'excavator-6',
              ]}
            />
          </div>
          <div className="ProductPage__options"></div>
        </div>
      </main>

      <footer className="ProductPage__footer">
        <ProductsSlider />
      </footer>
    </section>
  );
};
