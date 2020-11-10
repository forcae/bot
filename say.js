const Discord = require("discord.js");
module.exports = {
  aliases: [],
  name: "say",
  run: async (bot, message, args, prefix, guildData) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    message.delete({ timeout: 500 }).catch(e => { })
    let channel = message.channel;
    let msg;
    if (args[0]) {
      let channelid = args[0].replace(/[^0-9]/g, "");
      if (message.guild.channels.cache.has(channelid)) {
        channel = message.guild.channels.cache.get(channelid);
        msg = args.slice(1).join(" ")
      } else {
        msg = args.join(" ")
      }
    }
    if (!msg) {
      let error = new Discord.MessageEmbed()
        .setColor(bot.colors.red)
        .setDescription(`Please say a message!`)
      return channel.send(error).then(m => m.delete({ timeout: 10000 }).catch(e => { })).catch(e => { });
    } else {
      let permissions = message.guild.me.permissionsIn(channel);
      if (!permissions || !permissions.has("SEND_MESSAGES")) return;
      channel.send(msg.replace(/{EVERYONE}/gi, "@everyone").replace(/{HERE}/gi, "@here")).catch(e => { })
    }
  }
}