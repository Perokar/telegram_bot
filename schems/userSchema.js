const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: Number,
    userName: String,
    dateNow: Number,
    timestamp: Number,
    status: String
})
const User = mongoose.model('user', userSchema);

//update user
const statysArr = ['day0', 'day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
async function update() {
    var i = statysArr.length - 1;
    while (i >= 0) {
        const resUpdate = await User.updateMany({ "status": statysArr[i - 1] }, { $set: { "status": statysArr[i] } });
        i--;
    }

}
//user save
function addNewUser(dataUser) {
    User.findOne({ userId: dataUser.userId }, function(err, person) {
        if (err) {
            console.log(err.name);
            return;
        }
        if (!person) {
            const user = new User(dataUser);
            user.save(function(err) {
                if (err) console.log(err);
            })
            console.log('User add to base');
            return;
        }
        console.log('User already exists');
    });
}
// check user status
async function checkUser(userStatus) { //проверка юзера
    const li = await User.find({ status: userStatus });
}
// delete all base
async function clear(model) {
    await model.deleteMany();
}
//reset status
async function resetStatus() {
    await User.updateMany({ status: /./ }, { status: "day0" })
}

module.exports = { addNewUser, checkUser, clear, User, update, resetStatus }