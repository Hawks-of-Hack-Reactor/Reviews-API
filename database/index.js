/* eslint-disable array-callback-return */
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
});

const photosSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  url: String,
});

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    unique: true,
  },
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: {
    type: String,
    default: null,
  },
  body: String,
  date: String,
  reviewer_name: String,
  helpfulness: {
    type: Number,
    default: 0,
  },
  photos: [{ type: photosSchema, default: [] }],
});

const Review = mongoose.model('Reviews', reviewSchema);

const saveReview = () => new Promise((resolve, reject) => {
  const mock = {
    review_id: 37311,
    rating: 5,
    summary: 'This is nice?..',
    recommend: true,
    response: 'This. Is. Nice!',
    body: 'Enough said, enough said, enough said...',
    date: 'December 21, 2022',
    reviewer_name: 'Jonathan Cringe',
    helpfulness: 21,
    photos: [
      {
        id: 11,
        url: 'www.lol.com',
      },
      {
        id: 15,
        url: 'www.troll.com',
      },
    ],
  };
  const review = new Review(mock);
  review.save((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const getReviews = () => new Promise((resolve, reject) => {
  Review.find((err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});

module.exports = { getReviews, saveReview };
