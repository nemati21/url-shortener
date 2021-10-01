/* version 1.4 */

const general = {
  responseCode: {
    type: 'number',
    min: 1001,
    max: 1099,
    example: 1002,
  },
  msisdn: {
    type: 'string',
    pattern: '^9[0-9]{9}$',
    example: '9024499606',
  },
  email: {
    type: 'string',
    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    example: 'test@example.com',
  },
  url: {
    type: 'string',
    pattern: '^(http://www.|https://www.|http://|https://){1}[a-z0-9]+([-.]{1}[a-z0-9]+)*[.]{1}[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
    example: 'http://ebcom.ir/about',
  },
  uuid: {
    type: 'string',
    format: 'uuid',
    description: 'uuid',
  },
  nationalCode: {
    type: 'string',
    minLength: 10,
    maxLength: 10,
    pattern: '^[0-9]{10}$',
    example: '0070000001',
  },
  string: {
    type: 'string',
  },
  number: {
    type: 'number',
  },
  boolean: {
    type: 'boolean',
  },
};

general.swaggerErrorTypes = {
  500: {
    description: 'Internal exception happened',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        min: 1001,
        max: 1099,
        example: 1001,
      },
      message: {
        type: 'string',
        example: 'Internal error',
      },
    },
  },
  400: {
    description: 'Request is rejected due to other issues',
    type: 'object',
    properties: {
      code: general.responseCode,
      message: general.string,
    },
  },
  404: {
    description: 'URL is not defined',
    type: 'object',
    properties: {
      code: {
        type: 'number',
        min: 1001,
        max: 1099,
        example: 1098,
      },
      message: {
        type: 'string',
        example: 'Not found',
      },
    },
  },
  406: {
    description: 'Request is rejected due to input validations or provider error',
    type: 'object',
    properties: {
      code: general.responseCode,
      message: general.string,
    },
  },
};

general.swagger201 = {
  204: {
    description: 'Successful response with no body',
    type: 'string',
    example: '',
  },
};

module.exports = general;
