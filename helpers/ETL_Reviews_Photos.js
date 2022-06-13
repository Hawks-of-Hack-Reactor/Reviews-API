/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { updateReviewPhotos } = require('../database/reviewsModel');

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

// Avoid memory 'overheat'
const addByLimit = (limitObjIndex) => {
  let iterationCount = -1;
  let currReviewId = null;
  let photos = [];
  if (limitObjIndex < limits.length) {
    const readStream = fs.createReadStream(path.join(__dirname, '../../SDC_csv/reviews_photos.csv'));
    readStream
      .pipe(csv())
      .on('data', (row) => {
        // Format data
        row.id = parseInt(row.id, 10);
        row.review_id = parseInt(row.review_id, 10);
        if (currReviewId === null) {
          currReviewId = row.review_id;
        }

        if (row.review_id !== currReviewId) {
          const photosArr = photos.slice();
          photos = [];
          if (iterationCount >= limits[limitObjIndex].lower
            && iterationCount < limits[limitObjIndex].upper) {
            updateReviewPhotos(currReviewId, photosArr)
              .catch((err) => console.log(err));
          }
          currReviewId = row.review_id;
        }
        photos.push({ id: row.id, url: row.url });
        iterationCount += 1;
        if (iterationCount % 10000 === 0) {
          console.log(`Bulk ${limitObjIndex + 1} out of ${limits.length}, ${iterationCount}`);
        }
      })
      .on('end', () => {
        console.log(`Photos bulk ${limitObjIndex + 1} loaded to reviewAPI`);
        addByLimit(limitObjIndex + 1);
      });
  }
};

addByLimit(0);
