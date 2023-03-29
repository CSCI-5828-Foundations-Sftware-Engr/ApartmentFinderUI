const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertyModelSchema = new Schema({
    "propertyId": {
        "type": "String"
      },
      "propertyType": {
        "type": "String"
      },
      "listingStatus": {
        "type": "String"
      },
      "beds": {
        "type": "Number"
      },
      "address": {
        "city": {
          "type": "String"
        },
        "country": {
          "type": "String"
        },
        "county": {
          "type": "String"
        },
        "lat": {
          "type": "Number"
        },
        "line": {
          "type": "String"
        },
        "postalCode": {
          "type": "Date"
        },
        "stateCode": {
          "type": "String"
        },
        "lon": {
          "type": "Number"
        },
        "buildingSizeUnit": {
          "type": "String"
        }
      },
      "details": {
        "bathsMax": {
          "type": "Number"
        },
        "bathsMin": {
          "type": "Number"
        },
        "bedsMax": {
          "type": "Number"
        },
        "bedsMin": {
          "type": "Number"
        },
        "priceMax": {
          "type": "Number"
        },
        "priceMin": {
          "type": "Number"
        },
        "sqftMax": {
          "type": "Number"
        },
        "sqftMin": {
          "type": "Number"
        }
      },
      "photoCount": {
        "type": "Number"
      },
      "photos": {
        "type": [
          "Mixed"
        ]
      }
});

module.exports = mongoose.model("propertyData", PropertyModelSchema);