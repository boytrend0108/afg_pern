import { useState } from 'react';
import { MySuccess } from '../../../shared/ui';
import { RequestForm } from '../../../widgets/Forms/RequestForm';
import './RequestPage.scss';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import { useTranslation } from 'react-i18next';

const RequestPage = () => {
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  useScrollToTop();

  return (
    <div className="RequestPage my-container">
      <div className="RequestPage__header">
        <div className="RequestPage__header--left">
          <h1 className="RequestPage__title">
            {t('sectionTitle.Leaving a request')}
          </h1>

          <p className="RequestPage__text">{t('RequestPage.subtitle')}</p>
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

export default RequestPage;
