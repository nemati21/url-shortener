const { redisClient } = require('../../database');

const create = async (originalUrl, shortenedUrl, username) => {
  let result = null;

  redisClient.sadd("username", username, (err, reply) => {
    if (err) {
      console.debug(err);
      result = null;
    }
    result = reply;
    console.debug(reply);
  });

  return result;
};

// const findOrginallUrl = (orginalUrl) => {
//   let result = null;

//   try {
//     result = db.collection('urls').find({ orginalUrl }).toArray();
//   } catch (err) {
//     result = null;
//   }

//   return result;
// };

module.exports = {
  create,
  // findOrginallUrl,
};
