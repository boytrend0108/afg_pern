import React, { useState } from 'react';
import { MyButton, MyInput } from '../../../../shared/ui';
import './RegistrationForm.scss';
import { DtoRegistration } from '../types/DtoRegistration';
import { Link } from 'react-router-dom';
import { validate } from '../helpers/validation';
import { DtoValidation } from '../types/DtoValidation';

export const RegistrationForm = () => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState<number | string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<DtoValidation | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof DtoRegistration;

    switch (id) {
      case 'name':
        setUserName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      case 'company':
        setCompany(e.target.value);
        break;
    }
  };

  const handleSubmit = () => {
    const dto: DtoRegistration = {
      name: userName.trim(),
      phone,
      email: email.trim(),
      password: password.trim(),
      country: country.trim(),
      city: city.trim(),
      address: address.trim(),
      company: company.trim(),
    };

    setErrors(validate(dto));

    if (errors && Object.values(errors).includes(false)) {
      return false;
    }
  };

  return (
    <div className="RegistrationForm">
      <img src="/logo.svg" alt="logo" className="RegistrationForm__logo" />
      <h1 className="RegistrationForm__title">
        Register for AFG Machinery account
      </h1>

      <MyInput
        type="text"
        title="Name *"
        id="name"
        errors={errors}
        onChange={handleInputChange}
        value={userName}
      />
      <MyInput
        title="Phone number *"
        id="phone"
        errors={errors}
        type="number"
        onChange={handleInputChange}
        value={phone}
      />
      <MyInput
        title="Email address *"
        id="email"
        errors={errors}
        type="email"
        onChange={handleInputChange}
        value={email}
      />
      <MyInput
        title="Password *"
        id="password"
        errors={errors}
        type="password"
        onChange={handleInputChange}
        value={password}
      />

      <div className="RegistrationForm__wr">
        <MyInput
          type="text"
          title="Country"
          id="country"
          errors={errors}
          onChange={handleInputChange}
          value={country}
        />
        <MyInput
          type="text"
          title="City"
          id="city"
          errors={errors}
          onChange={handleInputChange}
          value={city}
        />
      </div>

      <MyInput
        type="text"
        title="Address"
        id="address"
        errors={errors}
        onChange={handleInputChange}
        value={address}
      />
      <MyInput
        type="text"
        title="Company name"
        id="company"
        errors={errors}
        onChange={handleInputChange}
        value={company}
      />

      <MyButton className="RegistrationForm__btn" onClick={handleSubmit}>
        Create an account
      </MyButton>

      <div className="RegistrationForm__horiz">
        <div className="RegistrationForm__horiz-line" />
        <p>or</p>
        <div className="RegistrationForm__horiz-line" />
      </div>

      <p>
        Do you already have an account?
        <Link to="/login" className="RegistrationForm__span">
          Log in here
        </Link>
      </p>
    </div>
  );
};
