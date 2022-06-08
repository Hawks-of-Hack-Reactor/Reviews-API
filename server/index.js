require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getReviews, saveReview } = require('../database/index');

const app = express();

// Middleware
app.use(express.json());
// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center">Hello There 😏😏😏</h1>');
});

const port = process.env.PORT || 1228;
app.listen(port, (err) => {
  if (err) {
    console.log('Server decided to have a day off🤨...\n', err);
  }
  getReviews().then(data => console.log(data, data[0].photos)).catch(err => console.log(err));
  console.log(`Listening on http://localhost:${port}`);
});
