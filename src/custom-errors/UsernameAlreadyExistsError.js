class UsernameAlreadyExistsError extends Error {
  constructor(code, message) {
    super('User username already exists');
    this.code = 1004;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = UsernameAlreadyExistsError;
