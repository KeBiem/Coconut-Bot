const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.mentions.members.first();
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.slice(1).join(" ");
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, je hebt de rol ${gRole.name} verloren.`)
  }catch(e){
    message.channel.send(`RIP <@${rMember.id}>, We hebben de rol ${gRole.name} verwijderd van je.  We hebben geprobeerd om een DM sturen, maar je DM's zijn geblokkeerd.`)
  }
}

module.exports.help = {
  name: "removerole"
}
