const Discord = require("discord.js");
module.exports = { // pull (event.js)
  name: "message", // pull.name (event.js)
  run: async (bot, message) => { // event.run (index.js)
    if (message.author.bot) return; // highly advised, prevents other bots from using your bot 
    let ownerguy = bot.users.cache.get("744112410322927679")
    if (message.channel.type === "dm" && bot.insupport.size >= 1 && !bot.insupport.has(message.author.id) && message.author.id !== ownerguy.id) {
      return message.reply("Someone else is being assisted! Please wait.")
    }
    if (message.channel.type === "dm" && message.author.id !== "744112410322927679") {
      if (!bot.insupport.has(message.author.id)) {
        bot.insupport.set(message.author.id, message.author.tag)
        message.react("✅").catch(e => { })
        let embed1 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription([
          `${bot.user.username} Support`,
          ``,
          `React with 🔒 to close.`])
      message.channel.send(embed1).catch(e => { }).then(m => m.react("🔒")).catch(e => { })
        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`New Support Message`)
          .setDescription([
            `**Incoming Message:**`,
            ``,
            `**User:** ${message.author} (${message.author.tag})`,
            `**Message:** ${message.content}`])
        return ownerguy.send(embed).catch(e => { }).then(m => m.react("🔒")).catch(e => { })
      } else {
        message.react("✅").catch(e => { })
        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`New Support Message`)
          .setDescription([
            `**Incoming Message:**`,
            ``,
            `**User:** ${message.author} (${message.author.tag})`,
            `**Message:** ${message.content}`])
        return ownerguy.send(embed).catch(e => { }).then(m => m.react("🔒")).catch(e => { })
      }
    }
    if (message.author.id === ownerguy.id && bot.insupport.size >= 1) {
      let user = bot.users.cache.get(bot.insupport.keyArray()[0])
      let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription([
          `**Incoming Message From Staff:**`,
          ``,
          `**Message:** ${message.content}`])
      return user.send(embed).catch(e => { })
    }
    let prefix = '!';
    if (!message.content.startsWith(prefix)) return; // if the user does not start their message with the prefix, ignore
    let args = message.content.slice(prefix.length).trim().split(' '); // get all of the message except the prefix and split the users message by spaces " "
    let cmd = args.shift().toLowerCase(); // get the command they use

    let command; // get command information when an alias or command name is used
    if (bot.commands.has(cmd)) { // if the command provided exists in the collection
      command = bot.commands.get(cmd); // command is now the information of the command provided
    } else if (bot.aliases.has(cmd)) { // if the command provided is an alias
      command = bot.commands.get(bot.aliases.get(cmd)); // command is the information of the command received from the aliases collection
    } else return; // if a command isn't provided, ignore
    command.run(bot, message, args, prefix); // this will appear again in your command files
    console.log(`Command Used: ${command.name}`)
  }
}