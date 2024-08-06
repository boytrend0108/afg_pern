import { useState } from 'react';
import { MySuccess } from '../../../shared/ui';
import { RequestForm } from '../../../widgets/Forms/RequestForm';
import './BookingPage.scss';
import { ProductItem } from '../../../entities/ProductItem';
import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { useScrollToTop } from '../../../shared/hooks';
import { MyContactInfo } from '../../../shared/ui/MyContactInfo/MyContactInfo';
import { useTranslation } from 'react-i18next';

const BookingPage = () => {
  const [success, setSuccess] = useState(false);
  const { booked } = useAppSelector((state) => state.product);
  const { t } = useTranslation();

  useScrollToTop();

  return (
    <div className="BookingPage my-container">
      <div className="BookingPage__header">
        <div className="BookingPage__header--left">
          <h1 className="BookingPage__title">
            {t('BookingPage.Booking')} {booked?.brand} {booked?.title}
          </h1>

          <p className="BookingPage__text">{t('BookingPage.subtitle')}</p>
        </div>

        <div className="BookingPage__header--right">
          <MyContactInfo />
        </div>
      </div>

      <main className="BookingPage__main">
        <div className="BookingPage__main-left">
          {booked && (
            <ProductItem className="BookingPage__product" machine={booked} />
          )}
        </div>

        <div className="BookingPage__main-right">
          {success ? (
            <MySuccess />
          ) : (
            <RequestForm onSuccess={(v) => setSuccess(v)} />
          )}
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
