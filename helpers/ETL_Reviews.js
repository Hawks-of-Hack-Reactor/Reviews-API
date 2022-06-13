/* eslint-disable no-param-reassign */
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { saveReviews } = require('../database/reviewsModel');

let iterationCount = 0;
let count = 0;
let data = [];

const readStream = fs.createReadStream(path.join(__dirname, '../../SDC_csv/reviews.csv'));
readStream
  .pipe(csv())
  .on('data', (row) => {
    // Convert values to proper format
    ['id', 'product_id', 'rating', 'date', 'helpfulness'].forEach((prop) => {
      row[prop] = parseInt(row[prop], 10);
    });
    row.recommend = row.recommend === 'true';
    row.reported = row.reported === 'true';
    if (row.response === 'null') {
      row.response = null;
    }
    data.push(row);
    if (count === 2500) {
      saveReviews(data.slice())
        .then(() => {
          console.log('Entry saved', iterationCount, row.id);
        })
        .catch((err) => {
          console.log('Entry save fail!🧨\n', err);
        });
      data = [];
      count = 0;
    }
    iterationCount += 1;
    count += 1;
    console.log(iterationCount, row.product_id);
  })
  .on('end', () => {
    console.log('Data read complete...');
  });
