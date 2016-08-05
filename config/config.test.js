var config = require('./config.global');

config.env = 'test';
config.databaseEndpoint = "https://dynamodb.ap-southeast-2.amazonaws.com";

module.exports = config;