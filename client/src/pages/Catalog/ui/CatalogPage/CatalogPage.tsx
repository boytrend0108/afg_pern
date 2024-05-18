import { ProductItem } from '../../../../entities/ProductItem';
import { MySearch } from '../../../../shared/ui';
import { CategoryList } from '../../../../widgets/CategoryList';
import { CatalogFilter } from '../CatalogFilter/CatalogFilter';
import './CatalogPage.scss';

const machines = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const CatalogPage = () => {
  return (
    <section className="CatalogPage container">
      <header className="CatalogPage__header">
        <MySearch style={{ marginBottom: '50px' }} />
        <CategoryList />
      </header>

      <main className="CatalogPage__main">
        <aside className="CatalogPage__filters">
          <CatalogFilter
            minValue="500"
            middleValue="10000"
            maxValue="20000"
            title="Price"
            id="Price"
          />
          <CatalogFilter
            minValue="500"
            middleValue="10000"
            maxValue="20000"
            title="Mileage"
            id="Mileage"
          />
          <CatalogFilter
            minValue="100"
            middleValue="500"
            maxValue="1000"
            title="Hours"
            id="Hours"
          />
          <CatalogFilter
            minValue="2000"
            middleValue="2012"
            maxValue="2024"
            title="Construction year"
            id="Year"
          />
        </aside>
        <div className="CatalogPage__list">
          {machines.map((m) => {
            return <ProductItem key={m} />;
          })}
        </div>
      </main>
    </section>
  );
};
