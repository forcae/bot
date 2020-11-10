const Discord = require("discord.js");
module.exports = {
  name: "guildMemberAdd",
  run: async (bot, member) => {
    let channel = bot.channels.cache.get("744201135451013144")
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription([`${member.user} joined! We have ${message.guild.members.cache.size} members!`])
    return channel.send(embed).catch(e => { })
  }
}