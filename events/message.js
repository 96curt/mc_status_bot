const { MessageEmbed } = require("discord.js");
const HELPMSG =
  "To use minecraft server status tool\ntype !mc <server address> <(optional)port number>\nex: !mc example.net 25564";
const config = require("../config.json");
const ping = require("minecraft-server-util");

module.exports = (bot, message) => {
  if (message.content.substring(0, config.PREFIX.length) !== config.PREFIX)
    return;
  const args = message.content.substring(config.PREFIX.length).split(" ");
  if (args[0] !== config.BOTCMD) return;
  if (args.length > 3)
    return message.channel.send(
      "error: too many arguments.\nFor help type: !mc ?"
    );
  if (!args[1])
    return message.channel.send(
      "error: You must give a server address.\nFor help type: !mc ?"
    );
  switch (args[1]) {
    case "help":
    case "?":
      return message.channel.send(HELPMSG);
  }
  let port;
  if (args[2]) {
    port = parseInt(args[2]);
  } else {
    port = 25565;
  }

  ping(args[1], port, (error, response) => {
    if (error) {
      message.channel.send("Server " + args[1] + " is Offline");
      console.log(error);
      return;
    }
    let playerNames = "NA";
    if (response.samplePlayers) {
      playerNames = "";
      for (let i = 0; i < 5 && i < response.samplePlayers.length; ++i) {
        playerNames = playerNames + response.samplePlayers[i].name + ", ";
      }
    }
    const Embed = new MessageEmbed()
      .setTitle("Server Status")
      .addFields(
        { name: "Server Address", value: response.host },
        { name: "Server Version", value: response.version },
        { name: "Number of Players", value: response.onlinePlayers },
        { name: "Max Players", value: response.maxPlayers },
        { name: "Players Online", value: playerNames }
      );
    message.channel.send(Embed);
  });
};
