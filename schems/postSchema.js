const mongoose = require('mongoose');
const cfg = require('../index');

const Schema = mongoose.Schema;
const postSchema = new Schema ({
    datePost: Number,
    hour: Number,
    secund: Number,
    post: String
})
const Post = mongoose.model('post', postSchema);

const postsArray = [
{
    datePost: 0,
    hour: 0,
    secund:0,
    post:`\u{1F44B} Привіт, я DomiNick - твій віртуальний помічник. Завтра твій перший робочий день в Domino's Pizza Ukraine. Я познайомлю тебе з компанією та розкажу, що де знаходиться.`
},
{
    datePost: 0,
    hour: 0,
    secund: 0,
    post:`Пропоную тобі такий план-мінімум на завтра \u{1F447}
    \u0031\uFE0F\u20E3 Подай документи до відділу кадрів.
    Візьми з собою наступні документи:
    \u{1F538} Трудова книга 
    \u{1F538} ІНН та паспорт (з додатком про реєстрацію, якщо в тебе ID)  
    \u{1F538} Три фотографії (розмір 3х4) 
    \u{1F538} Диплом про вищу освіту 
    \u{1F538} Свідоцтво про шлюб та народження дитини (за наявності) 
    \u{1F538} Документи надання пільг (за наявності)  
    \u0032\uFE0F\u20E3 Зустрінься зі своїм керівником та познайомся з колегами 
    \u0033\uFE0F\u20E3 Прогуляйся офісом 
    P.S: якшо знадобиться WIFI, то:
    \u{1F4CD} мережа "Dominos"
    \u{1F510} пароль 0442221111`
},
{
    datePost: 1,
    hour: 8,
    secund: 2,
    post:`Доброго ранку \u{1F44B}  Сьогодні хвилюючий та захопливий перший робочий день. Нумо до праці \u{1F4AA}  Почнімо його з віртуальної прогулянки офісом.  Переглянь [відео](https://youtu.be/RJOZ1KFfXR0) щоб не губитись \u{1F60A}`
},
{
    datePost: 1,
    hour: 8,
    secund: 5,
    post:
    `\u{1F449} Перше завдання на сьогодні \- подай документи у відділ кадрів\u{1F4D1}  Як закінчиш з документами, звернись до керівника твого відділу`
},
{
    datePost: 1,
    hour: 8,
    secund: 7,
    post:`Підпишись на наші інформаційні дайджести та будь в курсі подій компанії\u{1F440}
    \u{1F449} Інстаграм сторінка [Працюй&Кайфуй](https://www.instagram.com/dominos_funclub_kyiv/) там всі актуальні новини компанії, розіграші, конкурси та багато цікавинок. Така ж сторінка є і у фейсбуці. 
    \u{1F449} Сторінка у Facebook [Працюй&Кайфуй](https://www.facebook.com/dominosfunclub) там всі актуальні новини компанії та багато цікавинок.
    \u{1F449} Сторінка, яка присвячена [змаганням зі швидкісної розкатки піци](https://www.instagram.com/fpm_ua/) - FPM, та шкидкого складання коробок - Box Hero. Тут зможеш подивитись на наших вправним колег з піцерій`
},
{
    datePost: 1,
    hour: 18,
    secund:1,
    post:
   `Це був крутий перший день\u{1F60A}  Саме час відпочити та відновити сили.  Побачимося завтра \u{270B}`
},
{
    datePost: 2,
    hour: 9,
    secund:1,
    post:`Привіт \u{1F44B}
    Сьогодні, будь ласка, ознайомся з корпоративним порталом\.  Він допомагає нам:  \u{1F449} знайти будь-якого співробітника або піцерію  \u{1F449} детальніше дізнатися про нашу компанію та корпоративне життя  Для входу тобі згодяться логін та пароль:  Логін \- це твоє прізвище та ініціали (українською мовою, без крапок та пробілів)  Пароль: 123  Наприклад: ЛіщенкоОМ/123  [Лінк на портал](https://elearning.dominos.ua/)  При першому вході необхідно змінити пароль (всього хвилина часу, просто слідуй інструкціям), після чого заповни особисту інформацію\. [Відео-інструкція](https://www.youtube.com/watch?v=v9c5TDPWjz0) `
},
{
    datePost: 2,
    hour: 13,
    secund:1,
    post:`Domino's Pizza - компанія з 60-літнім стажем!  У 2018 році ми стали №1 з доставки піци \u{1F389}  [Пропоную переглянути відео екскурс по історії компанії](https://youtu.be/UM5fUu6f_Ok)`
},
{
    datePost: 2,
    hour: 13,
    secund:3,
    post:`А ось і круті цікавинки нашої компанії \u{1F447}  [Корпоративна культура Domino's Pizza Ukaraine](https://youtu.be/xyV_fhcxbw8)`
},
{
    datePost: 2,
    hour: 14,
    secund:1,
    post:`Хочу познайомити тебе зі структурою нашої компанії\.  Збережи собі цю інформацію \u{1F60A}  За цим [посиланням](https://docs.google.com/spreadsheets/d/1wBawB3BymWzElr9gFeyAHEVl8iiob8ULH4X_SPwNxv4/edit?usp=sharing) ти знайдеш список всіх працівників офісу 
    А за [цим](https://docs.google.com/spreadsheets/d/1W64yNmFY5F72tIOZHCibk44iZLQRkUmS3c4jL4h0FpU/edit?usp=sharing) - організаційну схему нашої компанії`
},
{
    datePost: 2,
    hour: 18,
    secund: 1,
    post:`Класно ми сьогодні попрацювали \u{1F609}
    Сьогодні ти:  \u0031\uFE0F\u20E3 познайомився(лась) з порталом  \u0032\uFE0F\u20E3 дізнався(лась) історію компанії  \u0033\uFE0F\u20E3 отримав(ла) карту офісу  Круто, зустрінемось завтра \u{270B}`
},
{
    datePost: 3,
    hour: 9,
    secund:1,
    post:`Привіт \u{1F44B}
    Сьогодні твій 3-ій день знайомства з компанією Domino's  Ось цікаві інновації Domino's у світі \- дивись на що ми рівняємось:
    1\. [Дрон DRU (Domino's Robotic Unit)](https://youtu.be/tEHeu8BeoOI) У 2016 році на вулиці Нової Зеландії вперше виїхав робот\-кур'єр з доставки піци\. Його звати Dru і він дуже милий:)
    
    2\. [Безпілотний автомобіль Ford](https://youtu.be/ZgIAx9QB7Qk)\. Спільними зусиллями компаній Ford та Domino's Pizza було розроблено безпілотний автомобіль для доставки піци\. Старт тестування цього проекту відбувся у 2017 році і проходив в американському місті Анн-Арбор в штаті Мічиган\. 
    
    3\. [Повітряний дрон DRU](https://youtu.be/ZCCoHv9ytQw) В березні 2016 року вперше в історії Domino’s Pizza відбулась доставка піци за допомогою повітряного дрону. Тестували дрон у Новій Зеландії CEO компанії Дон Мейджі (Don Meij), міністр транспорту Нової Зеландії Саймон Бріджес (Simon Bridges) і CEO компанії Flirtey (яка розробляла дрон) Метт Суїні (Matt Sweeny)
    
    4\. [Піч на колесах \- DXP](https://youtu.be/8Sh2twEoXBY) Domino's Pizza разом з американською інженерною компанією Roush Enterprises побудували спеціальний автомобіль для доставки піци - Delivery ExPert або DXP. Особливість автомобіля в тому, що він обладнаний вбудованою піччю для постійного підігріву піци, тож клієнт завжди отримує піцу ідеальної температури \- 60 градусів\.
    `
},
{
    datePost: 3,
    hour: 10,
    secund:1,
    post:`Впевнений що у тебе наразі виникають питання ❔, тож я залишу тобі лінк на [FAQ (часто задавані питання)](https://docs.google.com/document/d/1MReSZS5s8xzoB-XCy8WBVZFsWYkCDraC5Vi3w7MLwdk/edit?usp=sharing), що допоможе знайти відповіді на них 😉`
},
{
    datePost: 3,
    hour: 18,
    secund:1,
    post:`Ну що ж, я розповів тобі те, що знаю😇  Бажаю тобі швидкої адаптації🚀 та продуктивної роботи💫  Радий, що ти приєднався(лась) до нашої дружньої команди Domino's🥳  ❔ Якщо в тебе надалі виникнуть питання, то звернись до HR\-менеджера, який приймав тебе на роботу або до свого керівника`
},
{
    datePost: 7,
    hour: 9,
    secund:1,
    post:`"Чи достатьню інформації я тобі надав?
    `
},
{
    datePost: 999,
    hour: 0,
    secund: 0,
    post:`Приймаю загальні рекомендації 🤗 Якщо в тебе є ідеї щодо покращення процесу адаптації , напиши мені нижче в повідомленні 😇`
},
{
    datePost: 998,
    hour: 0,
    secund: 0,
    post:`Шкода, я б хотів виправитись, але без твоєї допомоги не вийде. Напиши, будь ласка, що саме ти б хотів отримати і чому я не зміг стати тобі корисним🙏`}
]
function addPost(){
    postsArray.map(async function (Obj){
    const post = new Post(Obj);
    post.save(function (err){
        if(err){console.log(err)}
        console.log('posts add ok');
    })
})
}
async function sendStartPost(){
    const post = await Post.find({datePost:0})
    return post;
}
async function sendPost(day, bot, id){
       const choicePost = await Post.find({datePost:day});
       choicePost.map(objPost=>{
           bot.sendMessage(id, objPost.post, {parse_mode: 'Markdown', disable_web_page_preview: true})
       })
}   

async function clearPost(){
    await Post.deleteMany();
}
module.exports = {addPost, clearPost, sendStartPost, sendPost, Post};
