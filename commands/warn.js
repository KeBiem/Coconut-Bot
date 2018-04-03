const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
    let wUser = message.mentions.members.first();
    if(!wUser) return message.channel.send("Can't find user!");
    let wReason = args.slice(1).join(" ");
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("They waaaay too kewl");

    if(!warns[wUser.id]) warns [wUser.id] = {
        warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warn")
    .setColor("#ffffff")
    .addField("Warned User", `${wUser}`)
    .addField("Warned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", wReason);

    let warnchannel = message.guild.channels.find(`name`, "incidents");
    if(!warnchannel) return message.reply("Couldn't find channel");

    warnchannel.send(warnEmbed);


    if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).kick(wReason);
    message.channel.send(`<@${wUser.id}> has been kicked.`)
    }

  }

module.exports.help = {
    name: "warn"
}
