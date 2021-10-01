const model = require('./model');

const create = async (user) => {
  const result = await model.create(user);
  return result;
};

const findByEmail = async (email) => {
  const user = await model.findByEmail(email);
  return user;
};

const findByUsername = async (username) => {
  const user = await model.findByUsername(username);
  return user;
};

module.exports = {
  create,
  findByEmail,
  findByUsername,
};
