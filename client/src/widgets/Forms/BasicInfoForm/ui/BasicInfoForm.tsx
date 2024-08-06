/* eslint-disable no-shadow */
import { FormEvent, useEffect, useState } from 'react';

import './BasicInfoForm.scss';
import {
  MyButton,
  MyButtonWhite,
  MyLanguageSelect,
} from '../../../../shared/ui';
import { InputBox } from './InputBox/InputBox';
// eslint-disable-next-line max-len
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { user as User } from '../../../../entities/User';
import { LANGUAGES } from '../../../../shared/consts/languages';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export const BasicInfoForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string | number | null>(null);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [lang, setLang] = useState('English');
  const [flag, setFlag] = useState('gb');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      const { name, phone, email, company, country, city, address, lang } =
        user;

      setName(name);
      setEmail(email);
      setCompany(company);
      setCity(city);
      setCountry(country);
      setAddress(address);
      setLang(lang);
      setPhone(phone.toString());
      setFlag(LANGUAGES[lang]);
    }
  }, [user]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      return;
    }

    const userDTO = {
      id: user.id,
      name,
      phone,
      email,
      company,
      country,
      city,
      address,
      lang,
    };

    if (!name.trim() || !phone || !email.trim()) {
      setError('Name, phone and email are required');

      return;
    }

    dispatch(User.update(userDTO))
      .unwrap()
      .catch((err) => setError(err.message));
  };

  const handleChangeLang = (v: { lang: string; fullName: string }) => {
    setFlag(v.lang);
    setLang(v.fullName);
  };

  return (
    <form className="BasicInfoForm" onSubmit={handleSubmit}>
      <h2 className="BasicInfoForm__title">Basic info</h2>

      <div className="BasicInfoForm__fields">
        <div className="BasicInfoForm__box">
          <InputBox
            required={true}
            value={name}
            setValue={(v) => setName(v.toString())}
            title="Your name*"
            subtitle=" Please enter your first name"
          />

          <InputBox
            required={true}
            value={lang}
            // eslint-disable-next-line prettier/prettier
            setValue={() => { }}
            title="Languages*"
            subtitle="Please indicate which language(s) you can communicate in"
          >
            <div className="BasicInfoForm__lang-wr">
              <MyLanguageSelect
                value={lang}
                flag={flag}
                changeLang={(v) => handleChangeLang(v)}
              />
            </div>
          </InputBox>

          <div className="BasicInfoForm__input-box">
            <p className="BasicInfoForm__input-title">Enter your phone</p>
            <p className="BasicInfoForm__input-tip">
              Please enter your telephone number
            </p>
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              defaultCountry="NL"
            />
          </div>

          <InputBox
            required={true}
            value={email}
            type="email"
            setValue={(v) => setEmail(v.toString())}
            title="Email*"
            subtitle="Please enter your email address"
          />
        </div>

        <div className="BasicInfoForm__box">
          <InputBox
            required={false}
            value={company}
            setValue={(v) => setCompany(v.toString())}
            title="Company name"
            subtitle="Please enter your company name"
          />

          <InputBox
            required={false}
            value={country}
            setValue={(v) => setCountry(v.toString())}
            title="Country"
            subtitle="Please enter your country of residence"
          />

          <InputBox
            required={false}
            value={city}
            setValue={(v) => setCity(v.toString())}
            title="City"
            subtitle="Please enter your city of residence"
          />

          <InputBox
            required={false}
            value={address}
            setValue={(v) => setAddress(v.toString())}
            title="Address"
            subtitle="Please enter your address of residence"
          />
        </div>
      </div>
      <p className="BasicInfoForm__note">* Fill in the required fields</p>
      <div className="BasicInfoForm__btn-box">
        <MyButtonWhite className="BasicInfoForm__btn--white">
          Cancel
        </MyButtonWhite>
        <MyButton className="BasicInfoForm__btn">
          {loading ? 'In progress' : 'Save'}
        </MyButton>
      </div>

      <div className="BasicInfoForm__error">
        {error && <p className="BasicInfoForm__error-msg">{error}</p>}
      </div>
    </form>
  );
};
