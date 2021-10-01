const InternalError = require('./InternalError');
const RejectError = require('./RejectError');
const RequestError = require('./RequestError');
const EmailAlreadyExistsError = require('./EmailAlreadyExistsError');
const UsernameAlreadyExistsError = require('./UsernameAlreadyExistsError');
const AuthenticationError = require('./UnauthenticationError');
const UnauthorizedError = require('./UnauthorizedError');

module.exports = {
  RejectError,
  InternalError,
  RequestError,
  EmailAlreadyExistsError,
  UsernameAlreadyExistsError,
  AuthenticationError,
  UnauthorizedError,
};
