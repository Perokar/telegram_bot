require('dotenv').config('')
const token = process.env.TOKEN
const uri = process.env.URI
const mongoose = require('mongoose')
const cronJob = require('cron').CronJob;
//const {createSchedule} = require ('./job/cron-job')
//const {addNewUser, clear, Person, update, findPerson} = require('./schems/person')
const TelegramApi = require('node-telegram-bot-api');
const cron = require('node-cron');
const { addNewUser, checkUser, clear, User, update, resetStatus } = require('./schems/userSchema');
const { addPost, sendStartPost, Post, sendPost } = require('./schems/postSchema');
const { feedbackUser } = require('./schems/feedbackSchema');

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
const bot = new TelegramApi(token, { polling: true });



bot.on("message", async(msg, option) => {
    const id = {
        userId: msg.from.id,
        userName: msg.from.first_name,
        dateNow: new Date().getDate(),
        timestamp: +new Date(),
        status: 'day0'
    }

    if (msg.text == '/start') {
        addNewUser(id);
        const messageArr = await sendStartPost();
        for (let i = 0; messageArr.length > i; i++) {
            await bot.sendMessage(msg.from.id, messageArr[i].post, { parse_mode: 'Markdown', disable_web_page_preview: true }).then(() => { sleep(4000) })
        }
    }
    // if (msg.text == '/update') {
    //     update();

    // }
    // if (msg.text == "/test") // поиск
    // {
    //     //createSchedule(Post);
    //     //   //bot.sendMessage(msg.from.id, [Піч на колесах \- DXP](https://youtu.be/8Sh2twEoXBY) Domino's Pizza разом з американською інженерною компанією Roush Enterprises побудували спеціальний автомобіль для доставки піци - Delivery ExPert або DXP. Особливість автомобіля в тому, що він обладнаний вбудованою піччю для постійного підігріву піци, тож клієнт завжди отримує піцу ідеальної температури \- 60 градусів\., {parse_mode: 'Markdown', disable_web_page_preview: true})
    // }
    // if (msg.text == "/add") // поиск
    // {
    //     addPost();
    // }
    // if (msg.text == "/day1") // поиск
    // {
    //     sendPost(1, bot, msg.from.id)
    // }
    // if (msg.text == "/day2") // поиск
    // {
    //     sendPost(2, bot, msg.from.id)
    // }
    // if (msg.text == "/day3") // поиск
    // {
    //     sendPost(3, bot, msg.from.id)
    // }
    if (msg.text == "/day7") // поиск
    {
        bot.sendMessage(msg.from.id, `Чи достатьню інформації я тобі надав? `, keyboardOption)
    }
    // if (msg.text == "/reset") // Добавление в базу
    // {
    //     resetStatus();
    // }
    // if (msg.text == "/clean") // Удаление из базы
    // {
    //     arrModels = [Post];
    //     arrModels.map(model => {
    //         clear(model);
    //     })
    //     bot.sendMessage(msg.from.id, "Все базы обнулены")
    // }
    // console.log('msg did not handle');
})
bot.on('callback_query', async(msg) => { //обработчик колбека
    let callData = await + msg.data;
    if (callData == 999) {
        getFDate(999)
    }
    if (callData == 998) {
        getFDate(998)
    }
    async function getFDate(day) {
        const answer = await Post.findOne({ datePost: day })
        answerPost(answer.post, listen)
    }

    function answerPost(text, listenCallback) {
        bot.editMessageText(text, {
            message_id: msg.message.message_id,
            chat_id: msg.from.id,
            inline_keyboard: [
                []
            ]
        })
        listenCallback()
    }
    var z = false;

    function listen() {
        bot.on('message', async(msg) => {
            const answer = {
                feedUserId: msg.from.id,
                feedUserName: msg.from.first_name,
                dateNow: new Date(),
                answer: msg.text
            }
            feedbackUser(answer)
            if (callData == 998 && z == false) {
                let text = await Post.findOne({ datePost: 1000 })
                bot.sendMessage(msg.from.id, text.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
                return z = true
            }
        })
    }
})

/////==================================/////////////////////////////////////
const keyboardOption = { // кнопки
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Так", callback_data: 999 },
                { text: "Ні", callback_data: 998 }
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }
}
var jobScheduled = false;
const cronUpdate = cron.schedule('50  23 * * *', update, { scheduled: true, timezone: "Europe/Kiev" });
const cronSchedul = cron.schedule('55  23 * * *', function() { getDen(User, Post, sendSchedule) }, { scheduled: true, timezone: "Europe/Kiev" });

async function getDen(humens, messages, callback) {
    // download base
    var baseData = await humens.find({});
    var postData = await messages.find({})
    var bot = await bot;
    callback(baseData, postData)
}

function sendSchedule(usersArr, postArr) { //shedule function
    if (usersArr.length > 0) {
        const day1Users = usersArr.filter(user => user.status === 'day1');
        const day2Users = usersArr.filter(user => user.status === 'day2');
        const day3Users = usersArr.filter(user => user.status === 'day3');
        const day7Users = usersArr.filter(user => user.status === 'day7');

        if (day1Users.length > 0) {
            sendSchedulMessage(1, day1Users, postArr)
        }
        if (day2Users.length > 0) {
            sendSchedulMessage(2, day2Users, postArr)
        }
        if (day3Users.length > 0) {
            sendSchedulMessage(3, day3Users, postArr)
        }
        if (day7Users.length > 0) {
            sendSchedulMessage(7, day7Users, postArr)
        }
    } else { console.log('no users found') }
    jobScheduled = true;
}

function sendSchedulMessage(dayIndex, usersArr, postArray) {
    const PostArr = postArray.filter(postage => postage.datePost == dayIndex)
    PostArr.map(msg => {
        usersArr.map(user => {
            cron.schedule(`${msg.secund} 0 ${msg.hour} ${deltaDate(dayIndex, user)} * *`, () => {
                bot.sendMessage(user.userId, msg.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
            }, { scheduled: true, timezone: "Europe/Kiev" })
        })
    })
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function deltaDate(plus, user) {
    var stamp = user.timestamp;
    let timeStm = stamp + (1000 * 60 * 60 * 24 * plus)
    let day = new Date(timeStm).getDate()
    return day
}