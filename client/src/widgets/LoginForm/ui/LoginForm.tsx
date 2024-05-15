import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './LoginForm.scss';
import { MyButton, MyInput } from '../../../shared/ui';
import { validate } from '../helpers/validation';
import { DtoValidationLogin } from '../types/DtoValidationLogin';
import { DtoLogin } from '../types/DtoRegistration';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemeber] = useState(false);
  const [errors, setErrors] = useState<DtoValidationLogin | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof DtoLogin;

    switch (id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  };

  const handleSubmit = () => {
    const dto: DtoLogin = {
      email: email.trim(),
      password: password.trim(),
    };

    setErrors(validate(dto));

    if (errors && Object.values(errors).includes(false)) {
      return false;
    }
  };

  return (
    <div className="LoginForm">
      <img src="/logo.svg" alt="logo" className="LoginForm__logo" />
      <h1 className="LoginForm__title">Login to AFG Machinery account</h1>

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

      <div className="LoginForm__remember">
        <p>Remember</p>
        <label htmlFor="remember" className="LoginForm__checkbox">
          {remember && <img src="/my-icons/check.svg" alt="remember me" />}
        </label>
        <input
          id="remember"
          type="checkbox"
          name="remember"
          hidden
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRemeber(e.target.checked)
          }
        />
      </div>

      <div className="LoginForm__btn-box">
        <MyButton
          className="LoginForm__btn--create"
          onClick={() => navigate('/registration')}
        >
          Create an account
        </MyButton>

        <MyButton className="LoginForm__btn" onClick={handleSubmit}>
          Login
        </MyButton>
      </div>

      <div className="LoginForm__horiz">
        <div className="LoginForm__horiz-line" />
        <p>or</p>
        <div className="LoginForm__horiz-line" />
      </div>

      <p className="LoginForm__footer">
        Are you new to AFG Machinery?
        <Link to="/registration" className="LoginForm__span">
          Create an account
        </Link>
      </p>
    </div>
  );
};
