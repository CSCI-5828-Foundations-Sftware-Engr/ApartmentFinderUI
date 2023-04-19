const mongoose = require("mongoose");
const property = mongoose.model("propertyData");
const review = mongoose.model("review");
const reviewAnalysis = mongoose.model("reviewAnalysis");

module.exports = (app) => {
  app.post("/property", (req, res) => {
    const { propertyId } = req.body;
    property
      .findOne({ propertyId: propertyId })
      .then((propertyResult) => {
        if (propertyResult) {
          console.log(`Found property details for propertId: ${propertyResult.propertyId}`);
          review.find(({propertyId: propertyResult.propertyId})).then((reviewResult =>{
            if(Object.keys(reviewResult).length >0){
              console.log(`Found ${Object.keys(reviewResult).length} reviews for ${propertyResult.propertyId}`);
              reviewAnalysis.find({propertyId:propertyResult.propertyId}).then((reviewAnalysisResult =>{
                if(reviewAnalysisResult){
                  console.log(`Found reviewAnalysis for ${propertyResult.propertyId}`);
                   return res.status(200).json({ property: propertyResult, reviews: reviewResult, reviewAnalysis: reviewAnalysisResult });
                }else{
                  console.log(`No reviewsAnalysis found for ${propertyResult.propertyId}`);
                   res.status(200).json({ property: propertyResult, reviews: reviewResult, reviewAnalysis: null });
                }
              }))
              
            }else{
              console.log(`No reviews found for ${propertyResult.propertyId}`);
               res.status(200).json({ property: propertyResult, reviews: null, reviewAnalysis: null });

            }
          }))
        }else{
          console.log(`No property Found for propertyId: ${propertyId}`)
           res.status(201).send({ property: propertyResult });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  });
};
