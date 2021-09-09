const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const data = require('./app/data/const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : amigo}`));
bot.help((ctx) => ctx.reply(data.commands));

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>teSt</b>' , Markup.inlineKeyboard(
            [
                [Markup.button.callback('Add', 'btn_add')]
            ]
        ));
    } catch (e) {
        console.error(e);
        ctx.reply(`Error: ${e}`);
    }
});

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (!!src) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
            ctx.reply(`Error: ${e}`)
        }
    })
}

addActionBot('btn_add', './app/img/1.jpg', data.text)

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));