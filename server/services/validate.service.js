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

  productDTO({ title, price, year, hours, image }) {
    return {
      title: title ? false : 'Title is required',
      price: price > 0 ? false : 'Price can not be 0',
      hours: hours !== undefined || hours < 0 ? false : 'Hours is required',
      image: image ? false : 'Image is required',
      year: year ? false : 'Year is required',
    };
  }

  singleField({ field }) {
    return {
      [field]: [field].length ? false : 'Name is required',
    };
  }
}

export default new Validate();
