const catchError = (action) => {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default catchError;
