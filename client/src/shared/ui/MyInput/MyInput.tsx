/* eslint-disable max-len */
import { forwardRef, useState } from 'react';
import './MyInput.scss';
import { useNavigate } from 'react-router-dom';
import { DtoValidation } from '../../../widgets/Forms/RegistrationForm/types/DtoValidation';
import { DtoValidationLogin } from '../../../widgets/Forms/LoginForm/types/DtoValidationLogin';

type Props = {
  title: string;
  onChange: (e: any) => void;
  onKeyUp: (e: any) => void;
  value: string | number;
  type: string;
  id: string;
  errors: DtoValidation | DtoValidationLogin | null;
  ref: { current: any } | null;
};

export const MyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { title, type = 'text', errors, id, ...otherProps } = props;
  const [inputType, setInputType] = useState<string>(type);
  const navigate = useNavigate();

  function handleClick() {
    const value = inputType === 'text' ? 'password' : 'text';

    setInputType(value);
  }

  return (
    <div className="MyInput">
      <div className="MyInput__wr">
        <p className="MyInput__title">{title}</p>
        {errors && !errors[id] && (
          <p className="MyInput__title--err">
            {title.slice(0, title.length - 2)} is requred
          </p>
        )}
        {type === 'password' && (
          <p className="MyInput__show-psw" onClick={handleClick}>
            {inputType === 'password' ? 'Show password' : 'Hide password'}
          </p>
        )}
      </div>

      <input
        type={inputType}
        className="MyInput__field"
        {...otherProps}
        id={id}
        ref={ref}
      />

      {type === 'password' && (
        <p className="MyInput__show-psw-fgt" onClick={() => navigate('/login')}>
          Forgot your password?
        </p>
      )}
    </div>
  );
});
