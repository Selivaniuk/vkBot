const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const GetPdf = require('./GetPdf')

let token = '671261439918a5b0ab394ef513c2b9f896bf1b3ce818630e6fc514fa48a94903f15361c8bbe98c287c5f1'

const bot = new VkBot(token);
//224285444, 168497235
const users = [183694625]
    // console.log(bot);


setInterval(() => {
    GetPdf.getNewLink(function(err, response) {
        if (err) return console.log(err);
        if (response) {
            bot.sendMessage(users, 'Доступно новое расписание!');
            GetPdf.GetPdf(l = false, function(err, response) {
                if (err) return console.log(err);
                bot.sendMessage(users, response);
            })
        }
    })
}, 3600);


bot.command('Начать', (ctx) => {
    ctx.reply('How are you doing?', null, Markup
        .keyboard([
            'Расписание',
            'Ссылка на расписание pdf',
        ])
        .oneTime(),
    );
});

bot.on((ctx) => {

    const message = ctx.message.body
    if (message) {
        if (message === 'Расписание') {

            GetPdf.GetPdf(l = false, function(err, response) {
                if (err) return console.log(err);
                ctx.reply(response)
            })

        }
        if (message === 'Ссылка на расписание pdf') {

            GetPdf.GetPdf(l = true, function(err, response) {
                if (err) return console.log(err);
                ctx.reply(response)
            })

        }

        ctx.reply(' ', null, Markup
            .keyboard([
                'Расписание',
                'Ссылка на расписание pdf',
            ])
            .oneTime(),
        );
    }
});

bot.startPolling();