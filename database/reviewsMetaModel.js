/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const { dbConnection } = require('./dbConnection');

const reviewsMetaSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  ratings: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
  recommended: {
    false: { type: Number, default: 0 },
    true: { type: Number, default: 0 },
  },
  characteristics: {
    Fit: { type: Number, default: 0 },
    Length: { type: Number, default: 0 },
    Comfort: { type: Number, default: 0 },
    Quality: { type: Number, default: 0 },
  },
});

const ReviewsMeta = mongoose.model('ReviewsMeta', reviewsMetaSchema);

// Set up new empty entries * mainly for ETL process *
const newReviewMeta = (productIdArray) => new Promise((resolve, reject) => {
  ReviewsMeta.insertMany(productIdArray, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

const getReviewMeta = (productId) => new Promise((resolve, reject) => {
  ReviewsMeta.findOne({ product_id: productId }, { id: 0, _id: 0, __v: 0 })
    .lean()
    .exec((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
});

const saveReviewMeta = (reviewJSON) => new Promise((resolve, reject) => {
  ReviewsMeta.findOne({ product_id: reviewJSON.product_id })
    .lean()
    .exec((err, result) => {
      const rating = Math.floor(reviewJSON.rating);
      const isRecommended = reviewJSON.recommend;

      if (result) {
        const newRatings = result.ratings;
        newRatings[rating] += 1;
        const newRecommended = result.recommended;
        isRecommended ? newRecommended.true += 1 : newRecommended.false += 1;

        ReviewsMeta.findOneAndUpdate(
          { product_id: reviewJSON.product_id },
          { $set: { ratings: newRatings, recommended: newRecommended } },
        )
          .then(() => resolve())
          .catch(() => reject());
      } else {
        const newMetaObj = {
          product_id: reviewJSON.product_id,
          ratings: {
            0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
          },
          recommended: { false: 0, true: 0 },
          characteristics: {
            Fit: 0,
            Length: 0,
            Comfort: 0,
            Quality: 0,
          },
        };
        newMetaObj.ratings[rating] += 1;
        isRecommended ? newMetaObj.recommended.true += 1 : newMetaObj.recommended.false += 1;
        const newMeta = new ReviewsMeta(newMetaObj);
        newMeta.save()
          .then(() => resolve())
          .catch(() => reject());
      }
    });
});

module.exports = {
  newReviewMeta,
  saveReviewMeta,
  getReviewMeta,
};
