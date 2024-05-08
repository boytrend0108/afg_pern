class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static BAD_REQUEST(message, errors) {
    return new ApiError(400, message, errors);
  }

  static UNAUTHORIZED() {
    return new ApiError(401, 'User is not authorized');
  }

  static NOT_FOUND() {
    return new ApiError(404, 'Not found');
  }
}

export default ApiError;
