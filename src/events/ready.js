const fetch = require("node-fetch")
const express = require("express")
const { webhook } = require("../config.json")
const port = 7777
let app = express();
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('github.com/Skyndalex', { type: "WATCHING" });

    app.get('/', (req, res) => {
        res.send("H")
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}