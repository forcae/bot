const Discord = require("discord.js");
module.exports = {
  aliases: [],
  name: "warn",
  run: async (bot, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return;
    message.delete({ timeout: 500 }).catch(e => { })
    if (!args[0]) {
      let invalid = new Discord.MessageEmbed()
        .setDescription(`**Invalid user.**`)
        .setColor("RED")
      return message.channel.send(invalid).catch(e => { })
    }
    let target = message.guild.members.cache.get(args[0].replace(/[^0-9]/g, ""));
    if (!target) {
      let invalid = new Discord.MessageEmbed()
        .setDescription(`**Invalid user.**`)
        .setColor("RED")
      return message.channel.send(invalid).catch(e => { })
    }
    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription([
        `You were warned for: ${args.slice(1).join(" ")}`])
    target.send(embed).catch(e => { })
    bot.warned.set(message.author.id, bot.warned.has(message.author.id) ? bot.warned.get(message.author.id) + 1 : 1)
    let embed2 = new Discord.MessageEmbed()
      .setColor("RED")
      .setFooter(`Total Warns: ${bot.warned.get(message.author.id)}`)
      .setDescription([
        `**${target.tag} was warned for ${args.slice(1).join(" ")}**`])
    return message.channel.send(embed2).catch(e => { })
  }
}