const discord = require('discord.js');

const set1 = require('./set1-en_us.json');
const set2 = require('./set2-en_us.json');
const set3 = require('./set3-en_us.json');
const set4 = require('./set4-en_us.json');
const sets = [set1, set2, set3, set4];

var auth = require('./auth.json');
const lor = require('lor-deckcodes-ts');

const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

// Initialize Discord Bot
client.on('message', message => {
    console.log(message);
    console.log("pong");
    if (message.content === "ping") message.channel.send("pong");
});

client.on('message', message => {
    console.log(message);
    console.log("pong");
    let deckCode = message.content.matchAll(/\[([A-Z0-9]+)\]/g).next();
    if (deckCode.value) {
        let deck = (lor.getDeckFromCode(deckCode.value[1])).map(e =>"- "+e.count+" "+sets[+e.cardCode.slice(0, 2)-1].find(card => e.cardCode == card.cardCode).name);
        message.channel.send(deck.join("\n"));
    }

});

client.login(auth.token);


