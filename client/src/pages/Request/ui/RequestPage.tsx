import { RequestForm } from '../../../widgets/Forms/RequestForm';
import './RequestPage.scss';

export const RequestPage = () => {
  return (
    <div className="RequestPage container">
      <div className="RequestPage__header">
        <div className="RequestPage__header--left">
          <h1 className="RequestPage__title">Leaving a request</h1>

          <p className="RequestPage__text">
            After filling out the form, our manager will contact you shortly to
            agree on all the details and discuss the purchase
          </p>
        </div>

        <div className="RequestPage__header--right">
          <h2 className="RequestPage__block-title">Contact Info</h2>

          <ul className="RequestPage__contacts">
            <li className="RequestPage__contact">
              <img src="/my-icons/phone-black.svg" alt="phone" />
              <a href="tel:+31402532245">+31 40 253 22 45</a>
            </li>
            <li className="RequestPage__contact">
              <img src="/my-icons/email-black.svg" alt="mail" />
              <a href="mailto:info@bossmachinery.nl">info@bossmachinery.nl</a>
            </li>
            <li className="RequestPage__contact">
              <img src="/my-icons/whats-app-black.svg" alt="mail" />
              <a href="http://whatsapp.com">AFGmachinery</a>
            </li>
          </ul>
        </div>
      </div>

      <main className="RequestPage__main">
        <RequestForm />
      </main>
    </div>
  );
};
