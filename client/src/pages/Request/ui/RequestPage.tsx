import { useState } from 'react';
import { MySuccess } from '../../../shared/ui';
import { RequestForm } from '../../../widgets/Forms/RequestForm';
import './RequestPage.scss';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';

export const RequestPage = () => {
  const [success, setSuccess] = useState(false);

  useScrollToTop();

  return (
    <div className="RequestPage my-container">
      <div className="RequestPage__header">
        <div className="RequestPage__header--left">
          <h1 className="RequestPage__title">Leaving a request</h1>

          <p className="RequestPage__text">
            After filling out the form, our manager will contact you shortly to
            agree on all the details and discuss the purchase
          </p>
        </div>

        <div className="RequestPage__header--right">
          <MyContactInfo />
        </div>
      </div>

      <main className="RequestPage__main">
        {success ? (
          <MySuccess />
        ) : (
          <RequestForm onSuccess={(v) => setSuccess(v)} />
        )}
      </main>
    </div>
  );
};
