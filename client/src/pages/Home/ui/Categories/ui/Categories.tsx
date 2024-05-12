import { useEffect, useState } from 'react';
import cn from 'classnames';

import './Categories.scss';
import { MyButton } from '../../../../../shared/ui';
import { CategoryList } from '../../../../../widgets/CategoryList';
import { CATEGORIES } from '../constants';
import { CategoryType } from '../../../../../shared/types/category';
import { getPreparedCategories } from '../helpers/getPreparedCategories';
import { leaveRequest } from '../../../api/homePageApi';

export const Categories = () => {
  const [query, setQuery] = useState('');
  const [slicedCategories, setSlicedCategories] = useState<CategoryType[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const sliceList = () => {
      const c = getPreparedCategories(CATEGORIES, window.innerWidth);

      setSlicedCategories(c);
    };

    sliceList();

    window.addEventListener('resize', sliceList);

    return () => {
      window.removeEventListener('resize', sliceList);
    };
  }, []);

  const sendRequest = async () => {
    await leaveRequest();
  };

  return (
    <div className="Categories">
      <div className="Categories__header">
        <div className="Categories__phone">Call us +31 40 253 22 45</div>
        <MyButton
          style={{ height: '40px', fontSize: '20px' }}
          onClick={sendRequest}
        >
          Leave a request
        </MyButton>
      </div>

      <div className="Categories__container">
        <div className="Categories__search">
          Search
          <div className="Categories__input">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="Categories__input-field"
              placeholder="Machines, type, setting..."
            />

            <button className="Categories__input-btn"></button>
          </div>
        </div>

        <CategoryList categories={showAll ? CATEGORIES : slicedCategories} />

        <button
          className={cn('Categories__btn', {
            'Categories__btn---active': showAll,
          })}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Hide all categories' : 'View all categories'}

          <img
            src="/my-icons/arrow-down.png"
            alt="view all"
            className={cn('Categories__arrow', {
              'Categories__arrow--active': showAll,
            })}
          />
        </button>
      </div>
    </div>
  );
};
