import validator from 'validator';

class Validate {
  registrationTDO({ email, password, login }) {
    return {
      email: validator.isEmail(email) ? false : 'Email is invalid',
      password:
        password.length > 3
          ? false
          : 'Password should contain at least 4 characters',
      login:
        login.length > 3 ? false : 'Login should contain at least 4 characters',
    };
  }

  loginTDO({ email, password }) {
    return {
      email: validator.isEmail(email) ? false : 'Email is invalid',
      password:
        password.length > 3
          ? false
          : 'Password should contain at least 4 characters',
    };
  }
}

export default new Validate();
