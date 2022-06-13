const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

process.env.MONGODB_URI = MONGODB_URI;
const dbConnection = mongoose.connect(process.env.MONGODB_URI, {
});

module.exports = {
  dbConnection,
};
