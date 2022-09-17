const discord = require('discord.js');
const {appendFileSync} = require('fs');

const set1 = require('./set1-en_us.json');
const set2 = require('./set2-en_us.json');
const set3 = require('./set3-en_us.json');
const set4 = require('./set4-en_us.json');
const set5 = require('./set5-en_us.json');
const set6 = require('./set6-en_us.json');
const set6 = require('./set6cde-en_us.json');

const sets = [set1, set2, set3, set4, set5, set6];

var auth = require('./auth.json');
const lor = require('lor-deckcodes-ts');

const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

// Initialize Discord Bot
client.on('message', message => {
    console.log(message.content);
    if (message.content === "[ping]") {
        message.channel.send("pong");
        console.log("pong");
    }
    if (message.content === "[pong]") {
        message.channel.send("ping");
        console.log("ping");
    }
});

client.on('message', message => {
    let deckCode = message.content.matchAll(/\[([A-Z0-9]+)\]/g).next();
    if (deckCode.value) {
        let deck = (lor.getDeckFromCode(deckCode.value[1]))
            .map(e => {
              let card = sets[+e.cardCode.slice(0, 2)-1].find(card => e.cardCode == card.cardCode);
              if (!card) card = {cost: 0, name: "Unknown " + e.cardCode};
              return {card, count: e.count};
            })
            .sort((a, b) => b.card.cost - a.card.cost)
            .map(e =>"- "+e.count+" "+"("+e.card.cost+") "+e.card.name);
        let decklist = deck.join("\n");
        
        message.channel.send(deckCode.value[1]+"\n"+decklist);
    }
});

client.login(auth.token);
