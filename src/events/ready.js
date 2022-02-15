const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('github.com/Skyndalex', { type: "WATCHING" });
}