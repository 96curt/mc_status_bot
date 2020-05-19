const { Client } = require("discord.js");
const bot = new Client();
const fs = require("fs");
const ping = require("minecraft-server-util");
const config = require("./config.json");

fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    bot.on(eventName, arg => eventHandler(bot, arg));
  });
});

bot.login(config.TOKEN);
