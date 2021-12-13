const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const personSchema = new Schema ({
    userId: Number,
    userName:String,
    dateNow: Number,
    status: String
})
const Person = mongoose.model ('person', personSchema);

 //запись юзера
 function addNewUser (dataUser){    
    Person.findOne({userId: dataUser.userId}, function (err, persone) {
        if (err) {
           console.log(err.name);
           return;
        }
        if (!persone){
            const person = new Person(dataUser);
            person.save (function (err){
                if (err)  console.log(err);
            })
          console.log('User add to base');
          return;
        }
        console.log('User already exists');
      });
                 
}

const statysArr = ['day0','day1','day2','day3','day7'];
async function update (){
    var i = statysArr.length-1;
    const dateT = new Date();
    while (i>=0){
    const resUpdate = await Person.updateMany({"status":statysArr[i-1]}, { $set:{"status":statysArr[i]}});
    console.log(dateT);
    i--;
    }
}
//const schedul = cron.schedule(`* * * * *`, update, {timezone:"Europe/Kiev"})

async function findPerson(statusPer) {
    console.log(Person.find({statusPer}))
}
async function clear(model){
    await model.deleteMany();
}

module.exports = {addNewUser, clear, Person, update, findPerson}
