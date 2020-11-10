const Discord = require("discord.js");
module.exports = {
  aliases: [],
  name: "kick",
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
        `You were kicked from ${message.guild.name} for: ${args.slice(1).join(" ")}`])
    target.send(embed).catch(e => { })
    target.kick().then(() => {
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**${target.tag} was kicked for ${args.slice(1).join(" ")}**`])
      return message.channel.send(embed).catch(e => { })
    }).catch(() => {
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**${target.tag} could not be kicked!**`])
      return message.channel.send(embed).catch(e => { })
    })
  }
}