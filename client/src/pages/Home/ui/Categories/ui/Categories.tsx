import './Categories.scss';
import { MyButton, MySearch } from '../../../../../shared/ui';
import { CategoryList } from '../../../../../widgets/CategoryList';

import { Link } from 'react-router-dom';

export const Categories = () => {
  return (
    <div className="Categories">
      <div className="Categories__header">
        <div className="Categories__phone">Call us +31 40 253 22 45</div>
        <Link to="request">
          <MyButton style={{ height: '40px', fontSize: '20px' }}>
            Leave a request
          </MyButton>
        </Link>
      </div>

      <MySearch style={{ marginBottom: '50px' }} />

      <CategoryList />
    </div>
  );
};
