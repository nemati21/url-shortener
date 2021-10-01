const { MongoClient } = require('mongodb');
const redis = require('redis');

const config = require('./config');

// Connect to MongoDB
const url = `mongodb://${config.db.mongodb.username}:${config.db.mongodb.password}@${config.db.mongodb.url}`;
const mongoClient = new MongoClient(url);

const mongoDB = mongoClient.db(config.db.mongodb.name);

// Connect to Redis
const redisClient = redis.createClient({
  host: config.db.redis.host, port: config.db.redis.port,
});

module.exports = {
  mongoClient,
  mongoDB,
  redisClient,
};
