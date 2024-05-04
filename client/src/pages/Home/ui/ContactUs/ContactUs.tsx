import './ContactUs.scss';

export const ContactUs = () => {
  return (
    <div className="ContactUs">
      <div className="ContactUs__top">
        <p className="ContactUs__title">Contact Us</p>
        <p className="ContactUs__subtitle">
          If you are interested in a particular model or need help
        </p>
      </div>

      <div className="ContactUs__contacts">
        <a
          href="tel:+31402562245"
          className="ContactUs__contact ContactUs__contact--phone"
        >
          +31402562245
        </a>
        <a
          href="mailto:test@gmail.com"
          className="ContactUs__contact ContactUs__contact--mail"
        >
          info@afg-machinary.com
        </a>
        <a
          href="https://web.whatsapp.com/"
          className="ContactUs__contact ContactUs__contact--whatsapp"
        >
          AFGMachinery
        </a>
      </div>
    </div>
  );
};
