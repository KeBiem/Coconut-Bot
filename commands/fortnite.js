const Discord = require("discord.js");
const config = require("../botconfig.json")
const Fortnite = require("fortnite");
const ft = new Fortnite("439aba3c-fbaa-4ec3-b631-bda58abdd56b");

module.exports.run = async (bot, message, args) => {
  message.delete();
  //!fortnite EVRGONEE pc
  let username = args[0];
  let platform = args[1] || "pc";

  let data = ft.getInfo(username, platform).then(data => {

  let stats = data.lifetimeStats;
  let kills = stats.find(s => s.stat == 'kills');
  let wins = stats.find(s => s.stat == 'wins');
  let kd = stats.find(s => s.stat == 'kd');
  let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
  let tPlayed = stats.find(s => s.stat == 'timePlayed');
  let asTime = stats.find(s => s.stat == 'avgSurvivalTime');

  let embed = new Discord.RichEmbed()
  .setTitle("Fortnite Stats")
  .setAuthor(data.username)
  .setColor("#551a8b")
  .addField("Kills", kills.value, true)
  .addField("Wins", wins.value, true)
  .addField("KD", kd.value, true)
  .addField("Matches Played", mPlayed.value, true)
  .addField("Time Played", tPlayed.value, true)
  .addField("Average Survival Time", asTime.value, true);

  message.channel.send(embed);


}).catch(e => {
    console.log(e);
    message.channel.send("Couldn't find that username in the database");

  })

}
  module.exports.help = {
    name: "fortnite"
  }
