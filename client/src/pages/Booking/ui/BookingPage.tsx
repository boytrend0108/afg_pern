import { useState } from 'react';
import { MySuccess } from '../../../shared/ui';
import { RequestForm } from '../../../widgets/Forms/RequestForm';
import './BookingPage.scss';
import { ProductItem } from '../../../entities/ProductItem';

export const BookingPage = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className="BookingPage my-container">
      <div className="BookingPage__header">
        <div className="BookingPage__header--left">
          <h1 className="BookingPage__title">Booking Yanmar SV15VT (NEW)</h1>

          <p className="BookingPage__text">
            After filling out the form, our manager will contact you shortly to
            agree on all the details and discuss the purchase
          </p>
        </div>

        <div className="BookingPage__header--right">
          <h2 className="BookingPage__block-title">Contact Info</h2>

          <ul className="BookingPage__contacts">
            <li className="BookingPage__contact">
              <img src="/my-icons/phone-black.svg" alt="phone" />
              <a href="tel:+31402532245">+31 40 253 22 45</a>
            </li>
            <li className="BookingPage__contact">
              <img src="/my-icons/email-black.svg" alt="mail" />
              <a href="mailto:info@bossmachinery.nl">info@bossmachinery.nl</a>
            </li>
            <li className="BookingPage__contact">
              <img src="/my-icons/whats-app-black.svg" alt="mail" />
              <a href="http://whatsapp.com">AFGmachinery</a>
            </li>
          </ul>
        </div>
      </div>

      <main className="BookingPage__main">
        <ProductItem className="BookingPage__product" />

        {success ? (
          <MySuccess />
        ) : (
          <RequestForm onSuccess={(v) => setSuccess(v)} />
        )}
      </main>
    </div>
  );
};
