const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        const { commits, head_commit, pusher, pull_request, issue, repository, after } = body;
        console.log(body);

        const channelID = "943261043415720026";

        if (commits) {
            let commitList = [];
            for (let i in commits) {
                commits.push(commits[i].message)
            };

            let commit = new MessageEmbed()
                .setTitle(`(${repository.full_name}) New commits [${commitList.length}]`)
                .setDescription(`Changes, full informations: https://github.com/Skyndalex/github-manager/commit/${after}`)
                .addField(`Message(s)`, `\`${commitList.join(",\n") || "None"}\``, true)
                .addField(`Author`, `\`${pusher.name}\``, true)
                .addField(`Modified file(s)`, `\`${head_commit.modified.join(",\n") || "None"}\``, true)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({embeds: [commit]})
        } else if (issue?.state === "open") {
            let issueEmbed = new MessageEmbed()
                .setTitle(`(${repository.full_name}) Issue opened!`)
                .setDescription(`${issue.body}`)
                .addField(`Title`, `\`${issue.title}\``, true)
                .addField(`Opened issues`, `\`${issue.number}\``, true)
                .addField(`Author`, `\`${issue.user.login}\``, true)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({ embeds: [issueEmbed] })
        } else if (issue?.state === "closed") {
            let issueClosed = new MessageEmbed()
                .setTitle(`(${body.repository.full_name}) Issue closed: #${issue.title}`)
                .setColor(`RED`)
            await client.channels.cache.get(channelID).send({embeds: [issueClosed]})
        } else if (pull_request?.state === "open") {
            let pulLRequestNew = new MessageEmbed()
                .setTitle(`(${repository.full_name}) New pull request #${pull_request.title} by ${pull_request.user.login}`)
                .setURL(pull_request.html_url)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({embeds: [pulLRequestNew]})
        }
    })
    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}
