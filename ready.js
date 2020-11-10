const Discord = require("discord.js");
module.exports = { // event.run() from index.js
  name: "ready", // event name
  run: async (bot) => { // bot and other paramters
    console.log("Ready event loading...") // know when your ready event is loading
    bot.user.setPresence({ activity: { name: '!help', url: 'https://www.twitch.tv/thegrefg', type: 'WATCHING' }, status: 'online' })
	console.log("Ready event success!")
  }
}