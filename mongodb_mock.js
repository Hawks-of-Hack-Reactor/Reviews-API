




{
  "product": {
    type: Number,
    unique: true,
  },
  "page": Number,
  "count": Number,
  "results": [
      {
          "review_id": {
            type: Number,
            unique: true,
          },
          "rating": Number,
          "summary": String,
          "recommend": Boolean,
          "response": {
            type: String,
            default: null,
          },
          "body": String,
          "date": String,
          "reviewer_name": String,
          "helpfulness": 1,
          "photos": [
            {
              "id": {
                type: Number,
                unique: true,
              },
              "url": String
            }
          ]
      }
    ]
}


{
  "product_id": {
    type: Number,
    unique: true,
  },
  "ratings": {
      "1": Number,
      "2": Number,
      "3": Number,
      "4": Number,
      "5": Number
  },
  "recommended": {
      "false": Boolean,
      "true": Number
  },
  "characteristics": {
      "Fit": {
          "id": Number,
          "value": String
      },
      "Length": {
          "id": Number,
          "value": String
      },
      "Comfort": {
          "id": Number,
          "value": String
      },
      "Quality": {
          "id": Number,
          "value": String
      }
  }
}