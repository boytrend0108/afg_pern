import React, { useState } from 'react';
import { MyButton, MyInput } from '../../../../shared/ui';
import './RegistrationForm.scss';
import { DtoRegistration } from '../types/DtoRegistration';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../helpers/validation';
import { DtoValidation } from '../types/DtoValidation';
import { user } from '../../../../entities/User';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

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
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

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
    setErrors(null);

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

    const validationErr = validate(dto);

    setErrors(validationErr);

    if (validationErr && Object.values(validationErr).includes(false)) {
      return false;
    }

    dispatch(user.register(dto))
      .unwrap()
      .then(() => navigate('/activate/in-progress'))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
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

      <div className="RegistrationForm__phone">
        <p className="RegistrationForm__input-title">Phone number*</p>
        <PhoneInput value={phone} onChange={setPhone} defaultCountry="NL" />
      </div>

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
        {loading ? 'Creating....' : 'Create an account'}
      </MyButton>

      <div className="RegistrationForm__error-box">
        {error && (
          <p className="RegistrationForm__error">{error.message.message}</p>
        )}
      </div>

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
