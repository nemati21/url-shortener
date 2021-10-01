const urlCtrl = require('../../../services/url-shortener-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'URL Shortener';

module.exports = (fastify, options, next) => {
  fastify.post(
    '/',
    {
      schema: {
        description: 'URL Shortener',
        tags: [swaggerTag],
        headers: {
          type: 'object',
          properties: {
            authorization: schemaTypes.string,
          },
        },
        body: {
          type: 'object',
          required: ['originalUrl'],
          properties: {
            originalUrl: schemaTypes.url,
            suggestionUrl: schemaTypes.string,
          },
        },
        response: {
          ...schemaTypes.swaggerErrorTypes,
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              url: schemaTypes.url,
            },
          },
        },
      },
    },
    urlCtrl.urlShortener,
  );

  fastify.get(
    '/',
    {
      schema: {
        description: 'Redirect',
        tags: [swaggerTag],
      },
    },
    urlCtrl.redirect,
  );

  next();
};
