const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    userId: Number,
    userName:String,
    dateNow: Number,
    status: String
})
const User = mongoose.model ('user', userSchema);

 //запись юзера
 function addNewUser (dataUser){    
    User.findOne({userId: dataUser.userId}, function (err, person) {
        if (err) {
           console.log(err.name);
           return;
        }
        if (!person){
            const user = new User(dataUser);
            user.save (function (err){
                if (err)  console.log(err);
            })
          console.log('User add to base');
          return;
        }
        console.log('User already exists');
      });
                 
}
async function update (){ 
    //await User.updateMany({status:/day0/},{status:'day1'});
    await User.updateMany({status:/day1/},{status:'day2'});
    await User.updateMany({status:/day2/},{status:'day3'});
    await User.updateMany({status:/day3/},{status:'day7'});
    await User.updateMany({status:/day7/},{status:'day0'});
    console.log('update');
   }

async function checkUser(userStatus) { //проверка юзера
    console.log(await User.find({status:userStatus}));  
}

async function clearUser(){
    await User.deleteMany();
}

module.exports = {addNewUser, checkUser, clearUser, User, update}
