const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const GetPdf = require('./src/GetPdf')

let token = 'f4a8b4ffbdf014595ad6d811a93344e476c55b08fe806d2947de15a3e15e1a982d554ae6600b676caf039'
const bot = new VkBot(token);
console.log(bot);

bot.command('/staret', (ctx) => {
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
        ctx.reply(message, null, Markup
            .keyboard([
                'Расписание',
                'Ссылка на расписание pdf',
            ])
            .oneTime(),
        );
    }
});

bot.startPolling();