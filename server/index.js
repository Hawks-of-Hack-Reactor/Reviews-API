require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const path = require('path');

// const csvtojson = require('csvtojson');

const { getReviews, saveReview } = require('../database/index');

const app = express();

// Middleware
app.use(express.json());
// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center">Hello There 😏😏😏</h1>');
});

// app.get('/ETL', (req, res) => {
//   csvtojson()
//     .fromFile(path.join(__dirname, '../../SDC_csv/reviews.csv'))
//     .then((csvData) => {
//       console.log('done');
//       console.log(csvData);
//     });

//   res.end();
// });

const port = process.env.PORT || 1228;
app.listen(port, (err) => {
  if (err) {
    console.log('Server decided to have a day off🤨...\n', err);
  }
  // getReviews().then(data => console.log(data, data[0].photos)).catch(err => console.log(err));
  console.log(`Listening on http://localhost:${port}`);
});
