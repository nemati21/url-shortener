const jwt = require('jsonwebtoken');

const service = require('./service');
const customErrors = require('../../custom-errors');
const { util } = require('../../lib');
const config = require('../../config');

const signup = async (req, res) => {
  const { email, username, password } = req.body;

  // Check the email exists already
  const existedEmail = await service.findByEmail(email);
  if (existedEmail) throw new customErrors.EmailAlreadyExistsError();

  // Check the mobile exists
  const existedUsername = await service.findByUsername(username);
  if (existedUsername) throw new customErrors.UsernameAlreadyExistsError();

  // Hash the password
  const hashedPassword = await util.createHash(password);

  await service.create({
    email, username, password: hashedPassword,
  });

  res.code(201).send('');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let user = null;

  // Check type of username and find user
  if (util.isEmail(username)) {
    user = await service.findByEmail(username);
  } else {
    user = await service.findByUsername(username);
  }

  if (!user) throw new customErrors.AuthenticationError();

  // Check password
  if (!util.compare(password, user.password)) throw new customErrors.AuthenticationError();

  // Create token
  const token = jwt.sign({ data: user }, config.jwtKey, { expiresIn: config.tokenExpiry });

  res.code(200).send({ token });
};

module.exports = {
  signup,
  login,
};
