import './MySuccess.scss';
import { useTranslation } from 'react-i18next';

export const MySuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="MySuccess">
      <img
        src="/my-icons/success.svg"
        alt="success"
        className="MySuccess__img"
      />
      <p className="MySuccess__title">{t('form.thanksMsg1')}</p>
      <p className="MySuccess__msg"> {t('form.thanksMsg2')}</p>
    </div>
  );
};
