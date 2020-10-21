const errHandler = (err, req, res, next) => {
  console.log(err, "<<<< from error handler");
  let statusCode = 500;
  let errors = [];

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      errors.push("Email has already been registered!");
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
