const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require('ms');
const superagent = require("superagent");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log('${bot.user.username} is online!');
  bot.user.setActivity("Eenden redden van Bas");
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "join-leave-log");
  welcomechannel.send(`Kijk eens wie we daar hebben!!! :open_mouth: ${member} heeft de party gejoined!!!`);
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "join-leave-log");
  welcomechannel.send(`Alle kokosnoten nog aan toe!!! :sob: ${member} heeft ons verlaten!!!`);
});

bot.on("channelCreate", async channel => {
  console.log(`${channel.name} has been created.`);

  let sChannel = channel.guild.channels.find(`name`, "aankondiging");
  sChannel.send(`${channel} is aangemaakt.`);
});

bot.on("channelDelete", async channel => {
  console.log(`${channel.name} has been deleted.`);

  let sChannel = channel.guild.channels.find(`name`, "aankondiging");
  sChannel.send(`${channel.name} is verwijderd.`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);



if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#ffffff")
    .addField("💸", `${coinAmt} coins added!`);

    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});

  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
}

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtlvl = xp[message.author.id].level * 2000;
    xp[message.author.id].xp = curxp + xpAdd;
    if(nxtlvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor("#ffffff")
      .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

});


bot.login(botconfig.token);
