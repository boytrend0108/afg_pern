/* eslint-disable no-shadow */
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './LoginForm.scss';
import { MyButton, MyInput } from '../../../../shared/ui';
import { validate } from '../helpers/validation';
import { DtoValidationLogin } from '../types/DtoValidationLogin';
import { DtoLogin } from '../types/DtoLogin';
import { user } from '../../../../entities/User';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/hooks/reduxHooks';
import { KeyCode } from '../../../../shared/types/keyboard';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemeber] = useState(true);
  const [errors, setErrors] = useState<DtoValidationLogin | null>(null);
  const { loading, error: loginError } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.id as keyof DtoLogin;

    switch (id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  }

  function handleSubmit() {
    const dto: DtoLogin = {
      email: email.trim(),
      password: password.trim(),
    };

    setErrors(validate(dto));

    if (errors && Object.values(errors).includes(false)) {
      return false;
    }

    dispatch(user.login(dto))
      .unwrap()
      .then(() => navigate(state?.pathname || '/', { replace: true }));
  }

  function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!passwordRef.current) {
      return;
    }

    const target = e.target as HTMLInputElement;

    if (e.code === KeyCode.Enter && target.id === 'email') {
      passwordRef.current.focus();
    }
  }

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className="LoginForm">
      <img src="/logo.svg" alt="logo" className="LoginForm__logo" />
      <h1 className="LoginForm__title">Login to AFG Machinery account</h1>

      <MyInput
        ref={emailRef}
        title="Email address *"
        id="email"
        errors={errors}
        type="email"
        onChange={handleInputChange}
        onKeyUp={handleEnterPress}
        value={email}
      />

      <MyInput
        ref={passwordRef}
        title="Password *"
        id="password"
        errors={errors}
        type="password"
        onKeyUp={(e) => handleEnterPress(e)}
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
          {loading ? 'In progress...' : 'Login'}
        </MyButton>
      </div>

      <div className="LoginForm__error">
        {loginError && (
          <p className="LoginForm__error-msg">{loginError.message.message}</p>
        )}
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
