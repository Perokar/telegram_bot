
require('dotenv').config('')
const {User, update} = require('../schems/userSchema');
const {Post} = require('../schems/postSchema');
const TelegramApi = require('node-telegram-bot-api');
const cron = require('node-cron');
const {bot}= require('../index')

const keyboardOption = {
    reply_markup: JSON.stringify({inline_keyboard:
        [[{text:"Да", callback_data:'yes'}],[{text:"Нет", callback_data:'no'}]]
    }),
    parse_mode:"Markdown"
}

const cronUpdate = cron.schedule('55 23 * * *', update, {timezone:"Europe/Kiev"})
const sendCron = cron.schedule('58 23 * * *', send, {timezone:"Europe/Kiev"});
async function send(){
    const usersArr = await User.find();
    const postArr = await Post.find();
if (usersArr){
        const day1Users = usersArr.filter(user=>user.status === 'day1');
        const day2Users = usersArr.filter(user=>user.status === 'day2');
        const day3Users = usersArr.filter(user=>user.status === 'day3');
        const day7Users = usersArr.filter(user=>user.status === 'day7');
        if (day1Users){
            const day1PostArr = postArr.filter(postage=>postage.datePost == 1 )
                    day1PostArr.map(msg=>{
                        day1Users.map(user=>{
                            const send = cron.schedule(`${msg.second} * ${msg.hour} ${user.dateNow+1} * *`,()=>{
                                bot.sendMessage(user.userId,msg.post , {parse_mode: 'Markdown', disable_web_page_preview: true})
                            })  
                        })
                    })
           
        }
        if (day2Users){
            const day2PostArr = postArr.filter(postage=>postage.datePost == 2 )
                    day2PostArr.map(msg=>{
                        day2Users.map(user=>{
                            const send = cron.schedule(`${msg.second} * ${msg.hour} ${user.dateNow+2} * *`,()=>{
                                bot.sendMessage(user.userId,msg.post , {parse_mode: 'Markdown', disable_web_page_preview: true})
                            })  
                        })
                    })
           
        }
        if (day3Users){
            const day3PostArr = postArr.filter(postage=>postage.datePost == 3 )
                    day3PostArr.map(msg=>{
                        day3Users.map(user=>{
                            const send = cron.schedule(`${msg.second} * ${msg.hour} ${user.dateNow+3} * *`,()=>{
                                bot.sendMessage(user.userId,msg.post , {parse_mode: 'Markdown', disable_web_page_preview: true})
                            })  
                        })
                    })
           
        }
        if (day7Users){
            const day7PostArr = postArr.filter(postage=>postage.datePost == 7 )
                    day7PostArr.map(msg=>{
                        day7Users.map(user=>{
                            const send = cron.schedule(`${msg.second} * ${msg.hour} ${user.dateNow+3} * *`,()=>{
                                bot.sendMessage(user.userId,msg.post , keyboardOption)
                            })  
                        })
                    })
        }
    }
    else {console.log('no users found')}
}
function day7(bot, idUser){
    bot.sendMessage(idUser, 'some meny text', keyboardOption);
}
module.exports = {send, day7}