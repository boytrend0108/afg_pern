import validator from 'validator';

class Validate {
  registrationTDO({ email, password, name, phone }) {
    return {
      email: validator.isEmail(email) ? false : 'Email is invalid',
      password:
        password.length > 3
          ? false
          : 'Password should contain at least 4 characters',
      name:
        name.length > 3 ? false : 'Login should contain at least 4 characters',
      phone: phone.toString().length > 7 ? false : 'Check your phone number',
    };
  }

  updateUserTDO({ name, email, phone }) {
    return {
      email: validator.isEmail(email) ? false : 'Email is invalid',
      name:
        name.length > 3 ? false : 'Name should contain at least 4 characters',
      phone: phone.toString().length > 7 ? false : 'Check your phone number',
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

  productDTO({ title, price, year, hours, image, brandId, categoryId }) {
    return {
      title: title ? false : 'Title is required',
      price: price > 0 ? false : 'Price can not be 0',
      hours: hours !== undefined || hours < 0 ? false : 'Hours is required',
      image: image ? false : 'Image is required',
      year: year ? false : 'Year is required',
      brandId: brandId ? false : 'Brand is required',
      categoryId: categoryId ? false : 'Category is required',
    };
  }

  singleField({ field }) {
    return {
      [field]: [field].length ? false : 'Name is required',
    };
  }
}

export default new Validate();
