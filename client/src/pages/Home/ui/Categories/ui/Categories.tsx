import './Categories.scss';
import { MyButton, MySearch } from '../../../../../shared/ui';
import { CategoryList } from '../../../../../widgets/CategoryList';

import { leaveRequest } from '../../../api/homePageApi';

export const Categories = () => {
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

      <MySearch style={{ marginBottom: '50px' }} />

      <CategoryList />
    </div>
  );
};
