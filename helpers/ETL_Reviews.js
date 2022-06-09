/* eslint-disable no-param-reassign */
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { saveReviews } = require('../database/index');

let iterationCount = -1;
let count = 0;
let data = [];

fs.createReadStream(path.join(__dirname, '../../SDC_csv/reviews.csv'))
  .pipe(csv())
  .on('data', (row) => {
    iterationCount += 1;
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
    count += 1;
    if (count === 2500) {
      saveReviews(data)
        .then(() => {
          console.log('Entry saved', iterationCount, row.id);
          data = [];
          count = 0;
        })
        .catch((err) => {
          console.log('Entry save fail!🧨\n', err);
          data = [];
          count = 0;
        });
    }
  })
  .on('end', () => {
    if (count > 0) {
      saveReviews(data)
        .then(() => {
          console.log('Entry saved', iterationCount);
          data = [];
          count = 0;
        })
        .catch((err) => {
          console.log('Entry save fail!🧨\n', err);
          data = [];
          count = 0;
        });
    }
    console.log('Data loaded to reviewAPI');
  });
