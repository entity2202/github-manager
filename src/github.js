const { Client, Intents } = require("discord.js");
const { readdirSync } = require('fs');
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require("./webhook/server")(client);

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.js')[0];
    client.on(eventName, (...args) => event(client, ...args))
}

client.login(token)
