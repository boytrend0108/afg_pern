/* eslint-disable no-shadow */
import { FormEvent, useState } from 'react';

import './BasicInfoForm.scss';
import { MyButton, MyLanguageSelect } from '../../../../shared/ui';
import { InputBox } from './InputBox/InputBox';

export const BasicInfoForm = () => {
  const [name, setName] = useState('Ivan');
  const [phone, setPhone] = useState('000-00-00-00');
  const [email, setEmail] = useState('test@gmeil.com');
  const [company, setCompany] = useState('Afg machinery');
  const [country, setCountry] = useState('Ukraine');
  const [city, setCity] = useState('Кiev');
  const [address, setAddress] = useState('Hrechatic 44');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const requestDto = {
      name,
      phone,
      email,
      company,
      country,
      city,
      address,
    };

    // eslint-disable-next-line no-console
    console.log(requestDto);
  };

  return (
    <form className="BasicInfoForm" onSubmit={handleSubmit}>
      <h2 className="BasicInfoForm__title">Basic info</h2>

      <div className="BasicInfoForm__fields">
        <div className="BasicInfoForm__box">
          <InputBox
            required={true}
            value={name}
            setValue={setName}
            title="Your name*"
            subtitle=" Please enter your first name"
          />

          <InputBox
            required={true}
            value={'Ukrainian'}
            setValue={() => { }}
            title="Languages*"
            subtitle="Please indicate which language(s) you can communicate in"
          >
            <div className="BasicInfoForm__lang-wr">
              <MyLanguageSelect value="Ukrainian" flag="ua" />
            </div>
          </InputBox>

          <InputBox
            required={true}
            value={phone}
            setValue={setPhone}
            title="Languages*"
            subtitle="Please enter your telephone number"
          />

          <InputBox
            required={true}
            value={email}
            type="email"
            setValue={setEmail}
            title="Email*"
            subtitle="Please enter your email address"
          />
        </div>

        <div className="BasicInfoForm__box">
          <InputBox
            required={false}
            value={company}
            setValue={setCompany}
            title="Company name"
            subtitle="Please enter your company name"
          />

          <InputBox
            required={false}
            value={country}
            setValue={setCountry}
            title="Country"
            subtitle="Please enter your country of residence"
          />

          <InputBox
            required={false}
            value={city}
            setValue={setCity}
            title="City"
            subtitle="Please enter your city of residence"
          />

          <InputBox
            required={false}
            value={address}
            setValue={setAddress}
            title="Address"
            subtitle="Please enter your address of residence"
          />
        </div>
      </div>
      <p className="BasicInfoForm__note">* Fill in the required fields</p>

      <MyButton className="BasicInfoForm__btn">Send a request</MyButton>
    </form>
  );
};
