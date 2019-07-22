const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class purgeCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'purge', 
      group: 'server',
      memberName: 'purge',
      description: "Clears a text channel's messages"
    });
  }

  async run(message, args)
  {
    var messagedeleteargs = message.content.slice(prefix.length).split(/ +/);
    var numberofmessagesdeleted = messagedeleteargs.join(" ").slice(6);
    var moderationlogs = message.guild.channels.find(`name`, "moderation-logs");
    if (!moderationlogs) return message.channel.send("There isn't a channel called `#moderation-logs`.");
    if (!numberofmessagesdeleted) return message.channel.send("Usage: .purge <amount of messages>.");
    if (numberofmessagesdeleted == NaN) return message.channel.send("Please enter in a proper number.");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission.").then(moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**Mcsky | Violation**")
        .setColor("#FF0000")
        .addField("⚠️ | User", "-> " + message.author.tag)
        .addField("💬 | Execution Message", "->" + message.content)
        .addField("📺 | Channel Executed", "-> " + message.channel)
        .addField("⏰ | Time", "-> " + message.createdAt)
        .setTimestamp()
        .setFooter("Mcsky Bot | created by FrostedHost")}));
    message.channel.bulkDelete(numberofmessagesdeleted).then(message.channel.bulkDelete(numberofmessagesdeleted));
    moderationlogs.send({embed: new Discord.RichEmbed()
        .setTitle("**MCsky | Purge**")
        .setColor("#4286f4")
        .addField("📌 | Executor", message.author.tag)
        .addField("#️⃣ | Number", message.size)
        .setFooter("Mcsky Bot | created by FrostedHost")});   
  }
}

module.exports = purgeCommand;
