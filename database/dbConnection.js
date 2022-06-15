const mongoose = require('mongoose');
// const { MONGODB_URI } = require('../config');
// process.env.MONGODB_URI = MONGODB_URI;

process.env.MONGODB_URI = 'mongodb://ec2-18-233-98-61.compute-1.amazonaws.com:27017/';
const dbConnection = mongoose.connect(process.env.MONGODB_URI, {
});

module.exports = {
  dbConnection,
};
