const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const feedSchema = new Schema({
    feedUserId: Number,
    feedUserName: String,
    dateNow: String,
    answer: String
})
const feedBack = mongoose.model('feedback', feedSchema);

async function feedbackUser(dataFeedBack) {
    const dataCheck = await feedBack.find({ feedUserId: dataFeedBack.feedUserId });
    if (dataCheck.length > 2) {
        console.log('feedback exists in the base');
        return
    }
    const FeedBack = new feedBack(dataFeedBack);
    FeedBack.save(function(err) {
        if (err) console.log(err);
    })
    console.log('feedback add to base');
    return;
}
module.exports = { feedbackUser }