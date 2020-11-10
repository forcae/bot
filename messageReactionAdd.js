const Discord = require("discord.js");
module.exports = {
  name: "messageReactionAdd",
  run: async (bot, messageReaction, user) => {
    // console.log("3")
    let ownerguy = bot.users.cache.get("744112410322927679")
    if (messageReaction.message.channel.type === "dm" && bot.insupport.has(user.id) && messageReaction.emoji.name === "🔒") {
      // console.log("1")
      bot.insupport.delete(user.id)
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**Support Closed by ${user.tag}**`])
      ownerguy.send(embed).catch(e => { })
      let embed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**Support Closed**`])
      return messageReaction.message.channel.send(embed2).catch(e => { })
    } else if (messageReaction.message.channel.type === "dm" && user.id === "744112410322927679" && messageReaction.emoji.name === "🔒" && bot.insupport.size >= 1) {
      // console.log("2")
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**Support Closed by ${user.tag}**`])
      ownerguy.send(embed).catch(e => { })
      let embed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription([
          `**Support Closed**`])
      bot.users.cache.get(bot.insupport.keyArray()[0]).send(embed2).catch(e => { })
      return bot.insupport.clear()
    }
  }
}