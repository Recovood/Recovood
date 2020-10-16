const bcrypt = require("bcryptjs");

const hashPassword = (plainPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPassword, salt);
  return hash;
}

const checkPassword = (plainPassword, hashedPassword) => {
  const checked = bcrypt.compareSync(plainPassword, hashedPassword);
  return checked;
}

module.exports = { hashPassword, checkPassword };