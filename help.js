const Discord = require("discord.js");
module.exports = {
  aliases: ["h", "ayuda", "?"],
  category: "INFO",
  description: "Forcadeitor Commands Help Menu - Type a command to get extra information about it",
  emoji: "❔",
  name: "help",
  run: async (bot, message, args, prefix) => {
    message.delete({ timeout: 500 }).catch(e => { })
    let helpEmbed = new Discord.MessageEmbed()
      .setAuthor(`${bot.user.username} - Help Menu`)
      .setColor("WHITE")
      .setThumbnail(bot.user.displayAvatarURL({ format: "png" }))
      .setDescription([
        `**Commands:**`,
        ``,
        `\`${prefix}kick\` - Kick Someone`,
        `\`${prefix}ban\` - Ban Someone`,
        `\`${prefix}warn\` - Warn Someone`,
        `\`${prefix}mute\` - Mute Someone`,
        `\`${prefix}say\` - Say A Message`])
    let notificationEmbed = new Discord.MessageEmbed()
    return message.author.send(helpEmbed).then(m => {
      notificationEmbed.setColor("GREEN")
        .setDescription([
          `**${message.author}, please check your private messages!**`])
      return message.channel.send(notificationEmbed).catch(e => { })
    }).catch(e => {
      notificationEmbed.setColor("RED")
        .setDescription([
          `**${message.author}, please enable private messages!**`])
      return message.channel.send(notificationEmbed).catch(e => { })
    })
  }
}