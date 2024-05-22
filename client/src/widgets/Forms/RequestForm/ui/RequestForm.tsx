/* eslint-disable no-shadow */
import './RequestForm.scss';
import { MyButton, MyLanguageSelect } from '../../../../shared/ui';
import React, { FormEvent, useState } from 'react';

type Props = {
  onSuccess: (v: boolean) => void;
};

export const RequestForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

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
    onSuccess(true);
  };

  return (
    <form className="RequestForm" onSubmit={handleSubmit}>
      <h2 className="RequestForm__title">Your data:</h2>

      <div className="RequestForm__fields">
        <div className="RequestForm__box">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="RequestForm__input"
            placeholder="Name*"
            required
          />

          <MyLanguageSelect />

          <input
            type="text"
            className="RequestForm__input"
            placeholder="Phone number*"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            className="RequestForm__input"
            placeholder="E-mail address*"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="RequestForm__box">
          <input
            type="text"
            className="RequestForm__input"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            className="RequestForm__input"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <p className="RequestForm__note">* Fill in the required fields</p>

      <MyButton className="RequestForm__btn">Send a request</MyButton>
    </form>
  );
};
