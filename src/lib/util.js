const bcrypt = require('bcryptjs');
const detect = require('browser-detect');

const schemaTypes = require('./schemaTypes');

const createHash = async (input) => {
  let hashedInput = null;

  try {
    hashedInput = await bcrypt.hash(input, 10);
  } catch (err) {
    hashedInput = null;
  }

  return hashedInput;
};

const compare = async (input, hashedInput) => {
  let result = false;

  try {
    result = await bcrypt.compare(input, hashedInput);
  } catch (err) {
    result = false;
  }

  return result;
};

const isEmail = (username) => {
// eslint-disable-next-line security/detect-non-literal-regexp
  const pattern = new RegExp(schemaTypes.email.pattern);

  return pattern.test(username);
};

const isUsername = (username) => {
// eslint-disable-next-line security/detect-non-literal-regexp
  const pattern = new RegExp(schemaTypes.msisdn.pattern);

  return pattern.test(username);
};

const detectClient = (userAgent) => {
  const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/ig.test(userAgent) ? 'mobile' : 'desktop';
  const browser = detect(userAgent);

  return { device, browser };
};

module.exports = {
  createHash,
  compare,
  isEmail,
  isUsername,
  detectClient,
};
