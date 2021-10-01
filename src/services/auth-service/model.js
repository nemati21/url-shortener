const { mongoDB } = require('../../database');

const create = async (user) => {
  let result = null;

  try {
    result = await mongoDB.collection('users').insertOne(user);
  } catch (err) {
    result = null;
  }

  return result;
};

const findByEmail = async (email) => {
  let user = null;

  try {
    user = await mongoDB.collection('users').findOne({ email });
  } catch (err) {
    user = null;
  }

  return user;
};

const findByUsername = async (username) => {
  let user = null;

  try {
    user = await mongoDB.collection('users').findOne({ username });
  } catch (err) {
    user = null;
  }

  return user;
};

module.exports = {
  create,
  findByEmail,
  findByUsername,
};
