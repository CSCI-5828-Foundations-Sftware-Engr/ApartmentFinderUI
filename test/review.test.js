const expect = require('chai').expect;
const { getAnalysis } = require('../routes/review.js'); // Replace 'main-file-name' with the name of your main file

describe('getAnalysis', () => {
  it('should return a positive sentiment value for a positive review', () => {
    const positiveReview = 'This property is amazing! I had a great time and the service was outstanding.';
    const sentimentValue = getAnalysis(positiveReview);
    expect(sentimentValue).to.be.gt(0);
  });

  it('should return a negative sentiment value for a negative review', () => {
    const negativeReview = 'Terrible experience. The property was dirty and the staff was rude.';
    const sentimentValue = getAnalysis(negativeReview);
    expect(sentimentValue).to.be.lt(0);
  });

  it('should return a neutral sentiment value for a neutral review', () => {
    const neutralReview = 'The property was average. Nothing special, but not terrible either.';
    const sentimentValue = getAnalysis(neutralReview);
    const tolerance = 1; // Adjust this value according to your desired tolerance for neutrality
    expect(sentimentValue).to.be.closeTo(0, tolerance);
  });
  
});
