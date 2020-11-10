require('dotenv').config()
const Discord = require("discord.js");
const bot = new Discord.Client({ fetchAllMembers: true })
process.env.DISCORD_TOKEN

bot.aliases = new Discord.Collection(); // define aliases collection
bot.commands = new Discord.Collection(); // define commands collection
bot.events = new Discord.Collection(); // define events collection

bot.on("message", message => { // message is the paramter for the messge event
  let event = bot.events.get("message");
  if (event) event.run(bot, message) // run your bot and message to use in the file
});
bot.on("ready", () => { // there are no paramaters for the ready event
  let event = bot.events.get("ready");
  if (event) event.run(bot) // run your bot/client so you can use it in the file
});
bot.on("messageReactionAdd", (messageReaction, user) => { // there are no paramaters for the ready event
  let event = bot.events.get("messageReactionAdd");
  if (event) event.run(bot, messageReaction, user) // run your bot/client so you can use it in the file
});
bot.on("guildMemberAdd", (member) => { // there are no paramaters for the ready event
  let event = bot.events.get("guildMemberAdd");
  if (event) event.run(bot, member) // run your bot/client so you can use it in the file
});
bot.on("guildMemberRemove", (member) => { // there are no paramaters for the ready event
  let event = bot.events.get("guildMemberRemove");
  if (event) event.run(bot, member) // run your bot/client so you can use it in the file
});
["command", "event"].forEach(handler => {
  require(`./handler/${handler}`)(bot); // include your bot in your events and commands
});

bot.insupport = new Discord.Collection();
bot.warned = new Discord.Collection();

module.exports = {
  bot: bot
};
bot.login("Nzc0NjM5MDIxOTUwNjMxOTM2.X6aszg.fNXzrK9opWsLv5csjAiAtY6Nen8")