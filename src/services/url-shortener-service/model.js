const { mongoDB } = require('../../database');

const create = async (url) => {
  let result = null;

  try {
    result = await mongoDB.collection('urls').insertOne({ ...url, visitor: 0, date: new Date() });
  } catch (err) {
    console.log(err);
    result = null;
  }

  return result;
};

const findOrginallUrl = async (originalUrl, username) => {
  let result = null;

  try {
    result = await mongoDB.collection('urls').findOne({ originalUrl, username }, {
      projection: {
        _id: 0,
        originalUrl: 1,
        shortenedUrl: 1,
      },
    });
  } catch (err) {
    result = null;
  }

  return result;
};

module.exports = {
  create,
  findOrginallUrl,
};
