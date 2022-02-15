const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', (req, res) => {
        const { body } = req;
        console.log(body);

        const channelID = "924792134702366750";

        // Commits
        if (body.head_commit) {
            let d = [];
            for (let i in body.commits) {
                d.push(body.commits[i].message)
            };

            let commit = new MessageEmbed()
                .setTitle(`${body.repository.full_name}: New commits (${d.length})`)
                .addField(`Message(s)`, `${d.join(",\n")}`, true)
                .addField(`Author`, `\`${body.head_commit.author.username}\``, true)
                .addField(`Modified file(s)`, `\`${body.head_commit.modified.join(",\n")}\``, true)
                .addField(`URL`, `[\`Click\`](${body.head_commit.url})`, true)
                .setColor(`BLUE`)
            client.channels.cache.get(channelID).send({ embeds: [commit] })
            // Issues: Opened
        } else if (body.action === "opened") {
            let issue = new MessageEmbed()
                .setTitle(`(${body.repository.full_name}) Issue opened!`)
                .setDescription(`${body.issue.body}`)
                .addField(`Action`, `\`${body.action}\``, true)
                .addField(`Title`, `\`${body.issue.title}\``, true)
                .addField(`Opened issues`, `\`${body.issue.number}\``, true)
                .addField(`Author`, `\`${body.issue.user.login}\``, true)
                .setColor(`GREEN`)
            client.channels.cache.get(channelID).send({ embeds: [issue] })

            // Issues: Closed
        } else if (body.action === "closed") {
            let issueClosed = new MessageEmbed()
                .setTitle(`(${body.repository.full_name}) Issue closed: #${body.issue.title}`)
                .setColor(`RED`)
            client.channels.cache.get(channelID).send({ embeds: [issueClosed] })

            // Forks
        } else if (body.forkee) {
            let fork = new MessageEmbed()
                .setTitle(`New fork/Pull request!`)
                .addField(`Author`, `\`${body.forkee.owner.login}\``)
                .addField(`Repo name`, `\`${body.forkee.full_name}\``)
                .setColor(`GREEN`)
            client.channels.cache.get(channelID).send({ embeds: [fork] })
        }
    })

    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}