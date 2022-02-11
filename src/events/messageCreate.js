const { MessageEmbed } = require("discord.js");
module.exports = (client, message) => {
    let channelID = "898284496384839721"

    // Commits

    fetch("https://api.github.com/repos/Skyndalex/skyndalex/commits/beta")
        .then(res => res.json())
        .then(async res => {
            let embed = new MessageEmbed()
                .setTitle(`New commit!`)
                .addField(`Message`, `${res.commit.message}`)
                .addField(`Author`, `${res.commit.author.name}`)
               if (Object.keys(res.commit)) client.channels.cache.get(channelID).send({ embeds: [embed]})
            })

    // Versions
    // Issues
    // Pull requests
    // Projects
    // Deployements
    // Collaborators
    // Branches
    //
}