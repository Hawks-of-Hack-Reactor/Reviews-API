const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/* Step 1 () */
const surfaceMetaData = [];
let currProductId = null;

const readStream = fs.createReadStream(path.join(__dirname, '../../SDC_csv/characteristics.csv'));
readStream
  .pipe(csv())
  .on('data', (row) => {
    const productId = parseInt(row.product_id, 10);
    if (currProductId === null) {
      currProductId = productId;
    }

    
  })
  .on('end', () => {
    console.log('done');
  });
