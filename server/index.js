/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {
  createReview, getReviewsByProductId, getReviewsMetaByProductId,
  markHelpfulByReviewId, reportReviewByReviewId,
} = require('./controllers/reviews');

const app = express();

// Middleware
app.use(express.json());
// Enable CORS
app.use(cors());

// POST routes
app.post('/reviews', (req, res) => {
  createReview(req, res);
});

// GET routes
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center">Hello There 😏😏😏</h1>');
});

/* Loader test */
app.get('/loaderio-30a54093308eb393cc092214eceb7781', (req, res) => {
  fs.readFile(path.join(__dirname, 'loaderio-30a54093308eb393cc092214eceb7781.txt'), (err, data) => {
    err ? res.send(err) : res.send(data);
  });
});

app.get('/reviews', (req, res) => {
  getReviewsByProductId(req, res);
});

app.get('/reviews/meta', (req, res) => {
  getReviewsMetaByProductId(req, res);
});

// PUT routes
app.put('/reviews/:reviewId/helpful', (req, res) => {
  markHelpfulByReviewId(req, res);
});

app.put('/reviews/:reviewId/report', (req, res) => {
  reportReviewByReviewId(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {
    console.log('Server decided to have a day off🤨...\n', err);
  }
  // getReviews().then(data => console.log(data, data[0].photos)).catch(err => console.log(err));
  console.log(`Listening on http://localhost:${port}`);
});
