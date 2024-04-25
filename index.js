const Discord = require("discord.js");
const request = require("request");

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"],
    partials: ["MESSAGE", "CHANNEL"]
});

const API_KEY = "d3c371bb0a5d52c7b79ff4f3472281af";
const token = `MTIyODIxMDI4NzE2MTY0MzA0OA.GVpaXp.5k4mi5OW-ngInQcUTY8EU53PS1iQXMUUIAwvdk`; // Replace with your actual bot token

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    if (message.content.startsWith('!weather')) {
        const city = message.content.split(' ')[1]; // Assuming city names without spaces for simplicity
        if (!city) {
            return message.reply("Please provide a city name after the command. Usage: `!weather <city>`");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        request(url, { json: true }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return message.reply(`Failed to get weather data: ${error ? error : body.message}`);
            }

            const weather = body.weather[0].description;
            const temperature = body.main.temp;
            const reply = `The weather in ${city} is currently ${weather} with a temperature of ${temperature}°C.`;
            message.reply(reply);
        });
    }
});

client.login(token);
