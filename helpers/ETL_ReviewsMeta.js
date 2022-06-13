/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
// const csv = require('csv-parser');
// const fs = require('fs');
// const path = require('path');
// require('dotenv').config();

/* Step 1
let iterationCount = 0;
const surfaceMetaData = [];
let currProductId = null;
let ratings = {
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
};
let recommended = { false: 0, true: 0 };

// several objects join

fs.createReadStream(path.join(__dirname, '../../SDC_csv/reviews.csv'))
  .pipe(csv())
  .on('data', (row) => {
let currProductId = null;
    if (productId !== currProductId) {
      surfaceMetaData.push({
        product_id: currProductId,
        ratings,
        recommended,
        characteristics: {
          Fit: 0,
          Length: 0,
          Comfort: 0,
          Quality: 0,
        },
      });
      ratings = {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
      };
      recommended = { false: 0, true: 0 };
      currProductId = productId;
    }

    const rating = Math.floor(row.rating);
    ratings[rating] += 1;
    const helpful = row.recommend;
    // eslint-disable-next-line no-unused-expressions
    helpful ? recommended.true += 1 : recommended.false += 1;

    console.log(iterationCount += 1, surfaceMetaData.length);
  })
  .on('end', () => {
    console.log('done', surfaceMetaData.length);
    fs.writeFile(path.join(__dirname, '/unique_product_ids.json'), JSON.stringify(surfaceMetaData, null, 4), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('unique_product_ids.json written!');
      }
    });
  });
*/

/* Step 2
const file = require('./unique_product_ids');
const { newReviewMeta } = require('../database/reviewsMetaModel');

let count = 0;
let currBulk = [];
const bulks = [];
for (let i = 0; i < file.ids.length; i += 1) {
  if (count < 100) {
    currBulk.push(file.ids[i]);
  } else {
    bulks.push(currBulk);
    count = 0;
    currBulk = [];
  }
  // console.log(iterationCount, count);
  count += 1;
}

const uploadBulk = (bulkI) => {
  newReviewMeta(bulks[bulkI])
    .then(() => {
      console.log(`Bulk ${bulkI} out of ${bulks.length}`);
      if (bulkI + 1 < bulks.length) {
        uploadBulk(bulkI + 1);
      }
    })
    .catch((err) => console.log(err));
};

uploadBulk(0); */
