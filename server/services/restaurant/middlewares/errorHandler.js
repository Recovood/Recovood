const errHandler = (err, req, res, next) => {
  console.log(err, "<<<< from error handler Food");
  let statusCode = 500;
  let errors = [];

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeConstraintError":
      err.errors.forEach((error) => {
        errors.push(error.message);
      });
      statusCode = 400;
      break;
    case "JsonWebTokenError":
      errors.push("User is not authenticated");
      statusCode = 401;
      break;
    default:
      errors.push(err.message);
      statusCode = err.statusCode || 500;
      break;
  }
  res.status(statusCode).json({ errors });
};

module.exports = errHandler;
