const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const feedSchema = new Schema ({
    feedUserId: Number,
    feedUserName:String,
    dateNow: Number,
    answer: String
})
const feedBack = mongoose.model ('feedback', feedSchema);

function feedbackUser (dataFeedBack){    
    feedBack.findOne({feedUserId: dataFeedBack.userId}, function (err, feed) {
        if (err) {
           console.log(err.name);
           return;
        }
        if (!feed){
            const FeedBack = new feedBack(dataFeedBack);
            FeedBack.save (function (err){
                if (err)  console.log(err);
            })
          console.log('feedback add to base');
          return;
        }
        console.log('feedback  already exists');
      });              
}
module.exports ={feedbackUser}