require('dotenv').config('')
const token = process.env.TOKEN;
const uri = process.env.URI;

const mongoose = require('mongoose');
const TelegramApi = require('node-telegram-bot-api');
const { addNewUser, checkUser, clearUser, User, update } = require('./schems/userSchema');
const { addPost, clearPost, sendStartPost } = require('./schems/postSchema');
const { send, day7} = require('./send/send')

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true})
const bot = new TelegramApi(token, { polling: true });

const keyboardOption ={
  reply_markup: {
    inline_keyboard:
      [
        [
          { text: "Да", callback_data: '1' },
          { text: "Нет", callback_data: '0' }
        ]
      ]
  }
}
bot.on("message", async (msg, prop) => {
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
    bot.sendMessage(msg.from.id, "test ok");
    //   //bot.sendMessage(msg.from.id, [Піч на колесах \- DXP](https://youtu.be/8Sh2twEoXBY) Domino's Pizza разом з американською інженерною компанією Roush Enterprises побудували спеціальний автомобіль для доставки піци - Delivery ExPert або DXP. Особливість автомобіля в тому, що він обладнаний вбудованою піччю для постійного підігріву піци, тож клієнт завжди отримує піцу ідеальної температури \- 60 градусів\., {parse_mode: 'Markdown', disable_web_page_preview: true})
  }
  if (msg.text == "/add") // поиск
  {
    addPost();
  }

  if (msg.text == "/find") // Добавление в базу
  {
    checkUser('day1');
  }
  if (msg.text == "/clean") // Удаление из базы
  {
    clearPost();
    //clearUser();
    bot.sendMessage(msg.from.id, "База обнулена")
  }
  console.log('msg did not handle');
})
bot.on('callback_query', msg => {
  console.log(msg);
})


bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
bot.on('webhook_error', (err)=>console.log(err));
bot.on('error', (err)=>console.log(err));
bot.on('chosen_inline_result', (something)=>console.log('chosen_inline_result'));
bot.on('inline_query', (something)=>console.log('inline_query'));