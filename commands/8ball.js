const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!8ball <question Is ... gay?>
  if(!args[2]) return message.reply("Stel een volledige vraag!");
  let replies = ["Ja.", "Nee.","Ik weet het niet.", "Vraag later opnieuw."];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000000")
  .addField("Vraag", question)
  .addField("Antwoord", replies[result]);

  message.channel.send(ballembed);
}
  module.exports.help = {
    name: "8ball"
  }
