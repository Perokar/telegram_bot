const mongoose = require('mongoose');
require('dotenv').config('')
const uri = process.env.URI;

const Schema = mongoose.Schema;
const conn = mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
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

async function checkUser(userStatus) { //проверка юзера
    console.log(await User.find({status:userStatus}));  
}

async function clearUser(){
    await User.deleteMany();
}

module.exports = {addNewUser, checkUser, clearUser, User}
