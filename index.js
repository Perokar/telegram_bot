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
        status: 'day0'
    }

    if (msg.text == '/start') {
        addNewUser(id);
        const messageArr = await sendStartPost();
        messageArr.forEach((text) => {
            bot.sendMessage(msg.from.id, text.post, { parse_mode: 'Markdown', disable_web_page_preview: true });
        })
    }
    if (msg.text == '/update') {
        update();

    }
    if (msg.text == "/test") // поиск
    {
        //createSchedule(Post);
        //   //bot.sendMessage(msg.from.id, [Піч на колесах \- DXP](https://youtu.be/8Sh2twEoXBY) Domino's Pizza разом з американською інженерною компанією Roush Enterprises побудували спеціальний автомобіль для доставки піци - Delivery ExPert або DXP. Особливість автомобіля в тому, що він обладнаний вбудованою піччю для постійного підігріву піци, тож клієнт завжди отримує піцу ідеальної температури \- 60 градусів\., {parse_mode: 'Markdown', disable_web_page_preview: true})
    }
    if (msg.text == "/add") // поиск
    {
        addPost();
    }
    if (msg.text == "/day1") // поиск
    {
        sendPost(1, bot, msg.from.id)
    }
    if (msg.text == "/day2") // поиск
    {
        sendPost(2, bot, msg.from.id)
    }
    if (msg.text == "/day3") // поиск
    {
        sendPost(3, bot, msg.from.id)
    }
    if (msg.text == "/day7") // поиск
    {
        bot.sendMessage(msg.from.id, `Чи достатьню інформації я тобі надав? `, keyboardOption)
    }
    if (msg.text == "/reset") // Добавление в базу
    {
        resetStatus();
    }
    if (msg.text == "/clean") // Удаление из базы
    {
        arrModels = [Post];
        arrModels.map(model => {
            clear(model);
        })
        bot.sendMessage(msg.from.id, "Все базы обнулены")
    }
    console.log('msg did not handle');
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
        answerPost(answer.post)
    }

    function answerPost(text) {
        bot.editMessageText(text, {
            message_id: msg.message.message_id,
            chat_id: msg.from.id,
            inline_keyboard: [
                []
            ]
        })
        bot.on('message', async(msg) => {
            const answer = {
                userId: msg.from.id,
                userName: msg.from.first_name,
                dateNow: new Date().getDate(),
                answer: msg.text
            }
            feedbackUser(answer)
            if (callData == 998) {
                let text = await Post.findOne({ datePost: 1000 })
                bot.sendMessage(msg.from.id, text.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
                callData = 1000;
            }
        })
    }
})

/////==================================/////////////////////////////////////
const keyboardOption = { // кнопки
    reply_markup: {
        inline_keyboard: [
            [
                { text: "Да", callback_data: 999 },
                { text: "Нет", callback_data: 998 }
            ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
    }
}
const sendCron = cron.schedule('55 00 * * *', function() { getDen(User, Post, sendSchedule) }, { timezone: "Europe/Kiev" });
const cronUpdate = cron.schedule('54  00 * * *', update, { timezone: "Europe/Kiev" });
cronUpdate.start();
sendCron.start();
console.log(sendCron.start);

async function getDen(humens, messages, callback) { // download base
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
            const day1PostArr = postArr.filter(postage => postage.datePost == 1)
            day1PostArr.map(msg => {
                day1Users.map(user => {
                    const day1 = cron.schedule(`${msg.secund} 0 ${msg.hour} ${user.dateNow+1} * *`, () => {
                        bot.sendMessage(user.userId, msg.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
                    }, { timezone: "Europe/Kiev" })
                    day1.start();
                })
            })

        }
        if (day2Users.length > 0) {
            const day2PostArr = postArr.filter(postage => postage.datePost == 2)
            day2PostArr.map(msg => {
                day2Users.map(user => {
                    const day2 = cron.schedule(`${msg.secund} 0 ${msg.hour} ${user.dateNow+2} * *`, () => {
                        bot.sendMessage(user.userId, msg.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
                    }, { timezone: "Europe/Kiev" })
                    day2.start();
                })
            })

        }
        if (day3Users.length > 0) {
            const day3PostArr = postArr.filter(postage => postage.datePost == 3)
            day3PostArr.map(msg => {
                day3Users.map(user => {
                    const day3 = cron.schedule(`${msg.secund} 0 ${msg.hour} ${user.dateNow+3} * *`, () => {
                        bot.sendMessage(user.userId, msg.post, { parse_mode: 'Markdown', disable_web_page_preview: true })
                    }, { timezone: "Europe/Kiev" })
                    day3.start();
                })
            })

        }
        if (day7Users.length > 0) {
            try {
                const day7PostArr = postArr.filter(postage => postage.datePost == 7)
                day7PostArr.map(msg => {
                    day7Users.map(user => {
                        const day7 = cron.schedule(`${msg.secund} 0 ${msg.hour} ${user.dateNow+7} * *`, () => {
                            bot.sendMessage(user.userId, msg.post, keyboardOption)
                        }, { timezone: "Europe/Kiev" })
                        day7.start();
                    })
                })
            } catch (err) {
                console.log(err)
            }
        }
    } else { console.log('no users found') }
}