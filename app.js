const TelegramBot = require('node-telegram-bot-api');

// Replace the value below with the Telegram token you received from @BotFather
const token = '7363467796:AAFbAkwgYeX4waoessi5FFPnCDJ-Ut5jFe8';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/start"
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Create an inline keyboard with a button linking to the bot's deep link
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Continue with Crown Slots Bot",
                        url: "https://t.me/crownslots_bot/crownslots"
                    }
                ]
            ]
        }
    };
    
    // Send a message with the inline keyboard
    bot.sendMessage(chatId, "Welcome to Crown Slots! Click the button below to continue with the bot.", opts);
});

// When any text is sent
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Ignore messages with the "/start" command to avoid double replies
    if (msg.text !== '/start') {
        bot.sendMessage(chatId, `You said: "${msg.text}". Please use /start to continue.`);
    }
});

console.log("Bot is running...");
