/* eslint-disable no-shadow */
import './RequestForm.scss';
import { MyButton, MyLanguageSelect } from '../../../../shared/ui';
import React, { FormEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../shared/hooks/reduxHooks';
import { LANGUAGES } from '../../../../shared/consts/languages';
import { productAPI } from '../../../../entities/ProductItem';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useTranslation } from 'react-i18next';

type Props = {
  onSuccess: (v: boolean) => void;
};

export const RequestForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [lang, setLang] = useState('English');
  const [flag, setFlag] = useState('en');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const { booked } = useAppSelector((state) => state.product);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!booked) {
      const requestDto = {
        name,
        phone,
        email,
        company,
        country,
        city,
        address,
      };

      productAPI
        .sendRequest(requestDto)
        .then(() => {
          onSuccess(true);
        })
        .catch((err) => setError(err.message || 'Something went wrong...'))
        .finally(() => setLoading(false));
    } else {
      const requestDto = {
        name,
        phone,
        email,
        company,
        country,
        city,
        address,
        productId: booked.id,
        userId: user ? user.id : null,
      };

      productAPI
        .book(requestDto)
        .then(() => {
          onSuccess(true);
        })
        .catch((err) => setError(err.message || 'Something went wrong...'))
        .finally(() => setLoading(false));
    }
  };

  const handleChangeLang = (v: { lang: string; fullName: string }) => {
    setFlag(v.lang);
    setLang(v.fullName);
  };

  useEffect(() => {
    if (user) {
      const { name, phone, email, company, country, city, address, lang } =
        user;

      setName(name);
      setPhone(phone);
      setEmail(email);
      setCompany(company);
      setCity(city);
      setCountry(country);
      setAddress(address);
      setLang(lang);
      setPhone(phone);
      setFlag(LANGUAGES[lang]);
    }
  }, [user]);

  return (
    <form className="RequestForm" onSubmit={handleSubmit}>
      <h2 className="RequestForm__title">{t('sectionTitle.Your data')}</h2>

      <div className="RequestForm__fields">
        <div className="RequestForm__box">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="RequestForm__input"
            placeholder={t('form.Name') + '*'}
            required
          />

          <MyLanguageSelect
            value={lang}
            flag={flag}
            changeLang={(v) => handleChangeLang(v)}
          />

          <PhoneInput
            placeholder={t('form.phonePlaceholder') + '*'}
            value={phone}
            onChange={setPhone}
            defaultCountry="NL"
          />

          <input
            type="email"
            className="RequestForm__input"
            placeholder={t('form.emailPlaceholder') + '*'}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="RequestForm__box">
          <input
            type="text"
            className="RequestForm__input"
            placeholder={t('form.Company name')}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder={t('form.Coutry')}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder={t('form.City')}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder={t('form.Address')}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <p className="RequestForm__note">
        {t('form.* Fill in the required fields')}
      </p>

      <MyButton className="RequestForm__btn">
        {loading ? 'In progress..' : t('buttons.Send a request')}
      </MyButton>

      {error && <p className="RequestForm__error">{error}</p>}
    </form>
  );
};
