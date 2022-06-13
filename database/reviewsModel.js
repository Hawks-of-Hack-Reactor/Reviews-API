/* eslint-disable camelcase */
/* eslint-disable array-callback-return */
// require('dotenv').config();
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { dbConnection } = require('./dbConnection');

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
  console.log();
  Review.insertMany(reviewsArray, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const getReviews = (productId) => new Promise((resolve, reject) => {
  Review.find({ product_id: productId }, { _id: 0, __v: 0 })
    .lean()
    .exec((err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
});

const getReviewsDistinct = (field) => new Promise((resolve, reject) => {
  Review.find().distinct(field, (err, results) => {
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
    { $set: { photos: reviewPhotosArray } },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    },
  );
});

const markHelpful = (reviewId) => new Promise((resolve, reject) => {
  Review.findOneAndUpdate(
    { id: reviewId },
    { $inc: { helpfulness: 1 } },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    },
  );
});

const reportReview = (reviewId) => new Promise((resolve, reject) => {
  Review.findOneAndUpdate(
    { id: reviewId },
    { $set: { reported: true } },
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
  getReviews,
  saveReview,
  saveReviews,
  updateReviewPhotos,
  markHelpful,
  reportReview,
  getReviewsDistinct,
  Review,
};
