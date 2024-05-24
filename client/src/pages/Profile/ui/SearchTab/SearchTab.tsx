import { MySearch } from '../../../../shared/ui';
import './SearchTab.scss';

const searches = [
  { id: 1, value: 'tractor' },
  { id: 2, value: 'Doosan DX380LC-5' },
];

export const SearchTab = () => {
  return (
    <div className="SearchTab">
      <MySearch title="Save this search" />

      <div className="SearchTab__list">
        {searches.map((s) => (
          <div className="SearchTab__item" key={s.id}>
            <img
              src="/my-icons/search-black.svg"
              alt="search history"
              className="SearchTab__icon-search"
            />
            <p className="SearchTab__value">{s.value}</p>
            <button className="SearchTab__delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
