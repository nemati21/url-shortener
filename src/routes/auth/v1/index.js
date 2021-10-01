const authCtrl = require('../../../services/auth-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'User Authentication';

module.exports = (fastify, options, next) => {
  fastify.post(
    '/signup',
    {
      schema: {
        description: 'Signup',
        tags: [swaggerTag],
        body: {
          type: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            email: schemaTypes.email,
            username: schemaTypes.string,
            password: schemaTypes.string,
          },
        },
        response: {
          ...schemaTypes.swaggerErrorTypes,
          ...schemaTypes.swagger201,
        },
      },
    },
    authCtrl.signup,
  );

  fastify.post(
    '/login',
    {
      schema: {
        description: 'Login',
        tags: [swaggerTag],
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: schemaTypes.string,
            password: schemaTypes.string,
          },
        },
        response: {
          ...schemaTypes.swaggerErrorTypes,
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              token: schemaTypes.string,
            },
          },
        },
      },
    },
    authCtrl.login,
  );

  next();
};
