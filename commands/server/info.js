const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class infoCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'info', 
      group: 'server',
      memberName: 'info',
      description: "Information about the MCsky company"
    });
  }

  async run(message, bot)
  {
    var totalSeconds = (bot.uptime / 1000).toString();
    var days = Math.floor(totalSeconds / 86400).toString();
    var hours = Math.floor(totalSeconds / 3600).toString();
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60).toString();
    var seconds = totalSeconds % 60;
    message.channel.send({embed: new Discord.RichEmbed()
    .setTitle("**MCsky | Information**")
    .setColor("#4286f4")
    .addField("🔨 | Coder", "-> *FrostedHost team*")
    .addField("📚 | Library", "-> *discord.js*")
    .addField("⌛ | Uptime", "-> " + `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`)
    .setTimestamp()
    .setFooter("Mcsky Bot | created by FrostedHost")
    .setAuthor(message.author.tag)})
  }
}

module.exports = infoCommand;
