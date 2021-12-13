const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schedulSchema = {
    day: Number,
    hour: Number,
    secund: Number,
    text: String,
    task: String,
    status: String
}

const scheduleCron = mongoose.model('schedule', schedulSchema);

async function createSchedule(model){
    const basePost= await model.find({});
    const schedulArr = [];
p[r]     //console.log(basePost);
    basePost.map (baseObj=>{
        let schedulObj = {
            day: baseObj.datePost,
            hour: baseObj.hour,
            secund: baseObj.secund,
            text: baseObj.post,
            task:'func Send',
            status: 'notDone'
        }
        schedulArr.push(schedulObj);
    })
    scheduleCron.insertMany(schedulArr)
    .then (()=>console.log('schedule add'))
    .catch(err=>console.log(err));
}

module.exports = {createSchedule, scheduleCron};
