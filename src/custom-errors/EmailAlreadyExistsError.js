class EmailAlreadyExistsError extends Error {
  constructor(code, message) {
    super('User email already exists');
    this.code = 1003;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = EmailAlreadyExistsError;
