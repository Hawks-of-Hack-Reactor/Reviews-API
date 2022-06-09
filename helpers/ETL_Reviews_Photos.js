/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { updateReviewPhotos } = require('../database/index');

let iterationCount = -1;
let currReviewId = null;
let photos = [];

const limits = [
  { lower: -1, upper: 200000 },
  { lower: 200000, upper: 400000 },
  { lower: 400000, upper: 600000 },
  { lower: 600000, upper: 800000 },
  { lower: 800000, upper: 1000000 },
  { lower: 1000000, upper: 1200000 },
  { lower: 1200000, upper: 1400000 },
  { lower: 1400000, upper: 1600000 },
  { lower: 1600000, upper: 1800000 },
  { lower: 1800000, upper: 2000000 },
  { lower: 2000000, upper: 2200000 },
  { lower: 2200000, upper: 2400000 },
  { lower: 2400000, upper: 2600000 },
  { lower: 2600000, upper: 2800000 },
];

for (const limit of limits) {
  fs.createReadStream(path.join(__dirname, '../../SDC_csv/reviews_photos.csv'))
    .pipe(csv())
    .on('data', (row) => {
      row.id = parseInt(row.id, 10);
      row.review_id = parseInt(row.review_id, 10);
      if (currReviewId === null) {
        currReviewId = row.review_id;
      }
      if (row.review_id !== currReviewId) {
        const photosArr = photos.slice();
        photos = [];
        if (iterationCount >= limit.lower && iterationCount < limit.upper) {
          updateReviewPhotos(currReviewId, photosArr)
            .then(() => {
            })
            .catch((err) => console.log(err));
        } else {
          console.log('nope');
        }

        currReviewId = row.review_id;
      }
      photos.push({ id: row.id, url: row.url });
      iterationCount += 1;
      console.log(iterationCount);
    })
    .on('end', () => {
      console.log('Data loaded to reviewAPI');
    });
}
