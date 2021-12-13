require('dotenv').config('')
const token = process.env.TOKEN 
const uri =  process.env.URI
const mongoose = require('mongoose')

//const {createSchedule} = require ('./job/cron-job')
//const {addNewUser, clear, Person, update, findPerson} = require('./schems/person')
const TelegramApi = require('node-telegram-bot-api');
const {addNewUser, checkUser, clear, User, update, resetStatus } = require('./schems/userSchema');
const { addPost, sendStartPost, Post, sendPost} = require('./schems/postSchema');
const { send, day7} = require('./send/send')

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
const bot = new TelegramApi(token, {polling: true});



bot.on("message", async (msg, option) => {
  const id = {
    userId: msg.from.id,
    userName: msg.from.first_name,
    dateNow: new Date().getDate(),
    status: 'day0'
  }
  const keyboardOption ={
    reply_markup: {
      inline_keyboard:
        [
          [
            { text: "Да", callback_data: '1' },
            { text: "Нет", callback_data: '2' }
          ]
        ]
    }
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
    if (msg.text=='/day1') {
        var man = msg.from.id;

        sendPost(1, bot, man);    
  }
  if (msg.text=='/day2') {
    var man = msg.from.id;

    sendPost(2, bot, man);    
}
if (msg.text=='/day3') {
  var man = msg.from.id;

  sendPost(3, bot, man);    
}
if (msg.text=='/day7') {
  var man = msg.from.id;
  sendPost(3, bot, man);    
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

  if (msg.text == "/find") // Добавление в базу
  {
    findPerson('day3');
  }
  if (msg.text == "/reset") // Добавление в базу
  {
    resetStatus();
  }
  if (msg.text == "/clean") // Удаление из базы
  {
    arrModels = [User, Post];
    arrModels.map(model=>{
      clear(model);
    })
    bot.sendMessage(msg.from.id, "Все базы обнулены")
  }
  console.log('msg did not handle');
})
bot.on('callback_query', (msg) => {
  console.log(msg);
})
module.exports = {bot}