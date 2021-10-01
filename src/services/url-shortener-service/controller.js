const service = require('./service');
const customErrors = require('../../custom-errors');
const { util } = require('../../lib');

const urlShortener = async (req, res) => {
  const { originalUrl, suggestionUrl } = req.body;
  const token = req.headers.authorization;
  let shortenedUrl = null;

  if (!token) throw new customErrors.AuthenticationError();
  const user = service.verifyTocken(token);

  const result = await service.findOrginalUrl(originalUrl, user.username);
  if (!result) {
    shortenedUrl = service.shortenUrl(originalUrl, suggestionUrl);
    await service.create(originalUrl, shortenedUrl, user.username);
  } else shortenedUrl = result.shortenedUrl;

  res.code(200).send({ url: shortenedUrl });
};

// I can't understand document
const redirect = async (req, res) => {
  const userAgent = req.headers['user-agent'];
  const client = util.detectClient(userAgent);

  res.code(200).send(client);
};

module.exports = {
  urlShortener,
  redirect,
};
