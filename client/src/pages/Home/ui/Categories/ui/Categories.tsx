import './Categories.scss';
import { MyButton, MySearch } from '../../../../../shared/ui';
import { CategoryList } from '../../../../../widgets/CategoryList';

import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../../../../shared/consts/socialLink';

export const Categories = () => {
  return (
    <div className="Categories">
      <div className="Categories__header">
        <a
          className="Categories__phone"
          href={`tel:${SOCIAL_LINKS.PHONE}`}
        >{`Call us ${SOCIAL_LINKS.PHONE}`}</a>
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
