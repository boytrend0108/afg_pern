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
import { KeyCode } from '../../../../shared/types/keyboard';
import { useTab } from '../hooks/useTab';

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

  const inputRefs = useTab();
  const [
    nameRef,
    emailRef,
    passwordRef,
    countryRef,
    cityRef,
    addressRef,
    companyRef,
  ] = inputRefs.current;

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

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const currentInputIndex = inputRefs.current.findIndex(
      (el) => el.current === target,
    );

    if (
      e.code === KeyCode.Enter &&
      target !== inputRefs.current.at(-1)?.current
    ) {
      inputRefs.current[currentInputIndex + 1].current?.focus();
    }
  };

  return (
    <div className="RegistrationForm">
      <img src="/logo.svg" alt="logo" className="RegistrationForm__logo" />
      <h1 className="RegistrationForm__title">
        Register for AFG Machinery account
      </h1>

      <MyInput
        ref={nameRef}
        onKeyUp={handleEnterPress}
        onChange={handleInputChange}
        type="text"
        title="Name *"
        id="name"
        errors={errors}
        value={userName}
      />

      <div className="RegistrationForm__phone">
        <p className="RegistrationForm__input-title">Phone number*</p>
        <PhoneInput value={phone} onChange={setPhone} defaultCountry="NL" />
      </div>

      <MyInput
        ref={emailRef}
        onKeyUp={handleEnterPress}
        onChange={handleInputChange}
        title="Email address *"
        id="email"
        errors={errors}
        type="email"
        value={email}
      />

      <MyInput
        ref={passwordRef}
        onKeyUp={handleEnterPress}
        onChange={handleInputChange}
        title="Password *"
        id="password"
        errors={errors}
        type="password"
        value={password}
      />

      <div className="RegistrationForm__wr">
        <MyInput
          ref={countryRef}
          onKeyUp={handleEnterPress}
          onChange={handleInputChange}
          type="text"
          title="Country"
          id="country"
          errors={errors}
          value={country}
        />
        <MyInput
          ref={cityRef}
          onKeyUp={handleEnterPress}
          onChange={handleInputChange}
          type="text"
          title="City"
          id="city"
          errors={errors}
          value={city}
        />
      </div>

      <MyInput
        ref={addressRef}
        onKeyUp={handleEnterPress}
        onChange={handleInputChange}
        type="text"
        title="Address"
        id="address"
        errors={errors}
        value={address}
      />
      <MyInput
        ref={companyRef}
        onKeyUp={handleEnterPress}
        onChange={handleInputChange}
        type="text"
        title="Company name"
        id="company"
        errors={errors}
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
