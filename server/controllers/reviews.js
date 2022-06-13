/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const {
  getReviews, saveReview, markHelpful, reportReview,
} = require('../../database/reviewsModel');
const { getReviewMeta, saveReviewMeta } = require('../../database/reviewsMetaModel');

// Create
const createReview = (req, res) => {
  const {
    product_id, rating, summary, body, recommend, reported, name, email, photos, characteristics,
  } = req.body;
  [
    product_id, rating, summary, body, recommend, reported, name, email, photos, characteristics,
  ].forEach((prop) => {
    if (prop === undefined) {
      res.end();
    }
  });
  const newEntry = {
    product_id,
    rating,
    summary,
    body,
    recommend,
    reported,
    name,
    email,
    photos,
    characteristics,
    date: new Date().getTime(),
    id: new Date().getTime(),
  };

  saveReview(newEntry)
    .then(() => {
      console.log('New review stored!');
      saveReviewMeta(newEntry)
        .then(() => {
          console.log('New meta review stored!');
          res.end();
        })
        .catch((err) => {
          console.log('New meta review fail!', err);
          res.end();
        });
    })
    .catch((err) => {
      console.log('New review fail!', err);
      res.end();
    });
};

// Read
const getReviewsByProductId = (req, res) => {
  const { product_id: productId } = req.query;

  if (productId === undefined) {
    res.send('<h3 style="color:red; text-align:center;">Error: no "valid" product_id passed!</h3>');
  } else {
    let page = parseInt(req.query.page, 10) || 1;
    let count = parseInt(req.query.count, 10) || 5;
    if (page < 1) {
      page = 1;
    }
    if (count < 1) {
      count = 1;
    } else if (count > 20) {
      count = 20;
    }
    getReviews(productId)
      .then((data) => {
        const startIndex = (page - 1) * count;
        const endIndex = startIndex + count;
        const paginated = data.slice(startIndex, endIndex).map((entry) => {
          const refinedEntry = { review_id: entry.id, ...entry };
          delete refinedEntry.id;
          // Format date
          refinedEntry.date = new Date(refinedEntry.date);
          // Only necessary photo info -> id, url
          refinedEntry.photos = refinedEntry.photos.map((photoInfo) => {
            const refinedPhoto = { id: photoInfo.id, url: photoInfo.url };
            return refinedPhoto;
          });
          return refinedEntry;
        });
        res.json({
          product: productId,
          page,
          count,
          results: paginated,
        });
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
  }
};

const getReviewsMetaByProductId = (req, res) => {
  const { product_id: productId } = req.query;

  if (productId === undefined) {
    res.send('<h3 style="color:red; text-align:center;">Error: no "valid" product_id passed!</h3>');
  } else {
    getReviewMeta(productId)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.end();
      });
  }
};

// Update
const markHelpfulByReviewId = (req, res) => {
  const { reviewId } = req.params;
  if (reviewId === undefined) {
    res.send('<p>Cannot PUT: reviewId not attached.</p>');
  } else {
    markHelpful(reviewId)
      .then(() => {
        console.log('Marked as helpful!');
        res.end();
      })
      .catch(() => res.send(`Failed to mark helpful review: ${reviewId}`));
  }
};

const reportReviewByReviewId = (req, res) => {
  const { reviewId } = req.params;
  if (reviewId === undefined) {
    res.send('<p>Cannot PUT: reviewId not attached.</p>');
  } else {
    reportReview(reviewId)
      .then(() => {
        console.log('Message reported💃!');
        res.end();
      })
      .catch(() => res.send(`Failed to report review: ${reviewId}`));
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsMetaByProductId,
  markHelpfulByReviewId,
  reportReviewByReviewId,
};
