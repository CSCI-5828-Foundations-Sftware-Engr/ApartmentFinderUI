const mongoose = require("mongoose");
const review = mongoose.model("review");
const reviewAnalysis = mongoose.model("reviewAnalysis");
const natural = require("natural");
const aposToLexForm = require("apos-to-lex-form");
const SpellCorrector = require("spelling-corrector");
const SW = require("stopword");
const rabbitmq = require("./sendMessage");

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

module.exports = (app) => {
  app.post("/addreview", (req, res) => {
    console.log("Inside add review");
    const newReview = new review({
      propertyId: req.body.propertyId,
      userName: req.body.userName,
      review: req.body.review,
    });
    review
      .findOne({ userName: req.body.userName, propertyId: req.body.propertyId })
      .then((reviewResult) => {
        if (reviewResult) {
          //review already exists for this property by the user
          console.log("Review already exists for this property by the user");
          return res
            .status(201)
            .send({
              message: "Review already exists for this property by the user",
            });
        } else {
          newReview.save().then((savedReview) => {
            if (savedReview) {
              //const analysis = getAnalysis(req.body.review);
              //console.log(analysis);
              // const lexedReview = aposToLexForm(req.body.review);
              // const casedReview = lexedReview.toLowerCase();
              // const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');
              // const { WordTokenizer } = natural;
              // const tokenizer = new WordTokenizer();
              // const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
              // tokenizedReview.forEach((word, index) => {
              //     tokenizedReview[index] = spellCorrector.correct(word);
              // })
              // const filteredReview = SW.removeStopwords(tokenizedReview);
              // const { SentimentAnalyzer, PorterStemmer } = natural;
              // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
              // const analysis = analyzer.getSentiment(filteredReview);
              reviewAnalysis
                .findOne({ propertyId: req.body.propertyId })
                .then((reviewData) => {
                  console.log(reviewData);
                  //If review exists for the property, update the analysis
                  if (!(reviewData == null)) {
                    //Positive review
                    if (analysis > 0) {
                      const noOfReviews = reviewData.noOfReviews + 1;
                      const positve = reviewData.positve + 1;
                      reviewAnalysis
                        .updateOne(
                          { propertyId: req.body.propertyId },
                          {
                            noOfReviews: noOfReviews,
                            positive: positve,
                          }
                        )
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "Review updated" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                    //Negative review
                    else if (analysis < 0) {
                      const noOfReviews = reviewData.noOfReviews + 1;
                      const negative = reviewData.negative + 1;
                      reviewAnalysis
                        .updateOne(
                          { propertyId: req.body.propertyId },
                          {
                            noOfReviews: noOfReviews,
                            negative: negative,
                          }
                        )
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "Review updated" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                    // neutral review
                    else {
                      const noOfReviews = reviewData.noOfReviews + 1;
                      const neutral = reviewData.neutral + 1;
                      reviewAnalysis
                        .updateOne(
                          { propertyId: req.body.propertyId },
                          {
                            noOfReviews: noOfReviews,
                            neutral: neutral,
                          }
                        )
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "Review updated" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                  }
                  //If review doesnt exist for the property, add a new entry with initial values
                  else {
                    if (analysis > 0) {
                      const positive = 1;
                      const neutral = 0;
                      const negative = 0;
                      const newReviewAnalysis = new reviewAnalysis({
                        propertyId: req.body.propertyId,
                        noOfReviews: 1,
                        positive: positive,
                        neutral: neutral,
                        negative: negative,
                      });
                      newReviewAnalysis
                        .save()
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "New review saved" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                    //Negative review
                    else if (analysis < 0) {
                      const positive = 0;
                      const neutral = 0;
                      const negative = 1;
                      const newReviewAnalysis = new reviewAnalysis({
                        propertyId: req.body.propertyId,
                        noOfReviews: 1,
                        positive: positive,
                        neutral: neutral,
                        negative: negative,
                      });
                      newReviewAnalysis
                        .save()
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "New review saved" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                    //
                    else {
                      const positive = 0;
                      const neutral = 1;
                      const negative = 0;
                      const newReviewAnalysis = new reviewAnalysis({
                        propertyId: req.body.propertyId,
                        noOfReviews: 1,
                        positive: positive,
                        neutral: neutral,
                        negative: negative,
                      });
                      newReviewAnalysis
                        .save()
                        .then((savedReview) => {
                          console.log(savedReview);
                          return res
                            .status(200)
                            .send({ message: "New review saved" });
                        })
                        .catch((err) => {
                          console.log(err);
                          res.status(404);
                          return res.send({
                            message: "Unable to save new review",
                          });
                        });
                    }
                  }
                });
            }
          });
        }
      });
  });
};

// module.exports = (app) => {
//   app.post("/addreview", (req, res) =>{
//     console.log("Inside add review");
//     const newReview = new review({
//       propertyId: req.body.propertyId,
//       userName: req.body.userName,
//       review: req.body.review,
//     });
//     review.findOne({userName:req.body.userName,
//       propertyId: req.body.propertyId}).then((reviewResult =>{
//         if(reviewResult){
//           //review already exists for this property by the user
//           console.log("Review already exists for this property by the user")
//           return res.status(201).send({message: "Review already exists for this property by the user"});
//         }else{
//           newReview.save().then((savedReview =>{
//             rabbitmq.sendMessage(req.body.review, req.body.propertyId);
//             return res.status(200).send({message: "Review send for analysis"});
//           }));

//       }

//       }));

//   })

// };

function getAnalysis(review) {
  const lexedReview = aposToLexForm(review);
  const casedReview = lexedReview.toLowerCase();
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, "");
  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
  tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
  });
  const filteredReview = SW.removeStopwords(tokenizedReview);
  const { SentimentAnalyzer, PorterStemmer } = natural;
  const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");
  return (analysis = analyzer.getSentiment(filteredReview));
}
