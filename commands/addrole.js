const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @Bas Weeb
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Gefeliciteerd, je hebt de rol ${gRole.name} gekregen.`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Gefeliciteerd <@${rMember.id}>, jij hebt de rol ${gRole.name} gekregen. We hebben geprobeerd om een DM sturen, maar je DM's zijn geblokkeerd.`)
  }
}

module.exports.help = {
  name: "addrole"
}
