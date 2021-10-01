const jwt = require('jsonwebtoken');
const shortId = require('shortid');

const model = require('./model');
const customErrors = require('../../custom-errors');
const config = require('../../config');

/**
 * Shortening URL
 * @param {url} originalUrl
 * @param {string} suggestionUrl
 * @returns shortened url
 */
const shortenUrl = (originalUrl, suggestionUrl) => {
  const baseUrl = new URL(originalUrl);
  let shortenedUrl = `${baseUrl.protocol}/myURLshortener.${baseUrl.host}/r/${shortId.generate()}`;
  if (suggestionUrl) shortenedUrl += `/${suggestionUrl}`;

  return shortenedUrl;
};

/**
 * Save url information
 * @param {object} url (orginalUrl, shortenedUrl, visitors, deviceType, browserType, date)
 * @returns {object} Saved url information
 */
const create = async (originalUrl, shortenedUrl, username) => {
  const result = await model.create({ originalUrl, shortenedUrl, username });
  return result;
};

/**
 * Varify and check authorization token
 * @param {string} token
 * @returns {object} decodedTokon
 */
const verifyTocken = (token) => {
  let decodedTocken = null;

  try {
    decodedTocken = jwt.verify(token, config.jwtKey);
  } catch (err) {
    throw new customErrors.UnauthorizedError();
  }

  return decodedTocken.data;
};

/**
 * Check an orginal url shorted before
 * @param {string} url
 * @param {string} username
 */
const findOrginalUrl = async (url, username) => {
  const result = await model.findOrginallUrl(url, username);
  return result;
};

module.exports = {
  shortenUrl,
  verifyTocken,
  create,
  findOrginalUrl,
};
