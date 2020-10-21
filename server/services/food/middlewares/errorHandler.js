const errHandler = (err, req, res, next) => {
  console.log(err, "<<<< from error handler");
  let statusCode = 500;
  let errors = [];

  // For google Login
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
      statusCode = 400;
      break;
    case "SequelizeConstraintError":
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
      statusCode = 400;
      break;
    default:
      errors.push(err.message);
      statusCode = err.statusCode || 500;
      break;
  }
  res.status(statusCode).json({ errors });
};

module.exports = errHandler;
