const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //!kick @KeBiem askin for it

  let kUser = message.mentions.members.first();
  if (!kUser) return message.channel.send("Can't find user!");
  let kReason = args.slice(1).join(" ");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#ffffff")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if (!kickChannel) return message.channel.send("Can't find incidents channel.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);
}
module.exports.help = {
  name: "kick"
}
