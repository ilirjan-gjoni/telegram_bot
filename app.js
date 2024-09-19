const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

// Replace the value below with the Telegram token you received from @BotFather
const token = '7363467796:AAFbAkwgYeX4waoessi5FFPnCDJ-Ut5jFe8';

// URL of your server that will be used for webhook (replace with your actual URL)
const webhookUrl = 'https://telegram-bot-jh60.onrender.com/';  // Replace with your actual domain

// Create a bot instance without polling
const bot = new TelegramBot(token);

// Initialize express app
const app = express();
app.use(bodyParser.json());  // Parse the JSON sent from Telegram

// Set up your bot's webhook
bot.setWebHook(`${webhookUrl}/${token}`);

// Route for receiving updates from Telegram
app.post(`/webhook/${token}`, (req, res) => {
    bot.processUpdate(req.body);  // Process the incoming update
    res.sendStatus(200);  // Respond to Telegram that we received the update
});

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

// Handle all other messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Ignore messages with the "/start" command to avoid double replies
    if (msg.text !== '/start') {
        bot.sendMessage(chatId, `You said: "${msg.text}". Please use /start to continue.`);
    }
});

// Start the express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});


