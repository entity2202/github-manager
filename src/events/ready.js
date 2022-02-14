const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('github.com/Skyndalex', { type: "WATCHING" });


    app.post('/payload', (req, res) => {
        const { body } = req

        /*
        console.log(body.head_commit)
        client.channels.cache.get("924792134702366750").send({
            content: `Message: \`${body.head_commit.message}\`\nAuthor: \`${body.head_commit.author.name}\``
        })
         */
        let commit = new MessageEmbed()
            .setTitle(`New commit!`)
            .addField(`Message`, `\`${body.head_commit.message}\``)
            .addField(`Author`, `\`${body.head_commit.author.username}\``)
            .addField(`Modified file`, `\`${body.head_commit.modified}\``)
            .addField(`URL`, `[\`Click\`](${body.head_commit.url})`)
            .setColor(`BLUE`)
        client.channels.cache.get("924792134702366750").send({ embeds: [commit] })

        //TODO: all events from list https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads
    })

    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}