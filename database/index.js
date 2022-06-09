/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
// require('dotenv').config();
const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

process.env.MONGODB_URI = MONGODB_URI;
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
  product_id: Number,
  id: {
    type: Number,
    unique: true,
  },
  rating: Number,
  summary: String,
  recommend: Boolean,
  reported: Boolean,
  response: {
    type: String,
    default: null,
  },
  body: String,
  date: Number,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: {
    type: Number,
    default: 0,
  },
  photos: [{ type: photosSchema, default: [] }],
});

const Review = mongoose.model('Reviews', reviewSchema);

// One
const saveReview = (reviewJSON) => new Promise((resolve, reject) => {
  const review = new Review(reviewJSON);
  review.save((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

// Many
const saveReviews = (reviewsArray) => new Promise((resolve, reject) => {
  Review.insertMany(reviewsArray, (err, result) => {
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

const updateReviewPhotos = (review_id, reviewPhotosArray) => new Promise((resolve, reject) => {
  Review.findOneAndUpdate(
    { id: review_id },
    { $push: { photos: { $each: reviewPhotosArray } } },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    },
  );
});

module.exports = {
  getReviews, saveReview, saveReviews, updateReviewPhotos,
};
