const config = require("../config.json");
const ping = require("minecraft-server-util");

module.exports = bot => {
  var statuses = ["Loading"];
  console.log(`Logged in as ${bot.user.tag}!`);

  //ping minecraft server
  setInterval(() => {
    ping(config.HOST, config.PORT, (error, response) => {
      if (error) {
        statuses = ["MC server is offline"];
        console.log(error.code);
        return;
      }
      statuses = [
        response.host + " is Online",
        "MC Version: " + response.version,
        response.onlinePlayers + "/" + response.maxPlayers + " Players Online"
      ];
      let playerNames = "";
      if (response.samplePlayers) {
        for (let i = 0; i < 5 && i < response.samplePlayers.length; ++i) {
          playerNames = playerNames + response.samplePlayers[i].name + ", ";
        }
        statuses.push(playerNames);
      }

      //console.log("ping success");
    });
  }, config.PING_INTERVAL);

  //cycle status
  let index = 0;
  setInterval(function() {
    if (index > statuses.length - 1) index = 0;
    let MyStatus = statuses[index++];
    //console.log(MyStatus);
    bot.user.setActivity(MyStatus);
  }, config.CYCLE_INTERVAL);
};
