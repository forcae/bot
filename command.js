const fs = require("fs"); // built in file system
module.exports = bot => {
  fs.readdir("./commands/", (err, files) => { // read commands directory
    if (err) console.log(err); // catch errors on startup
    let jsfile = files.filter(f => f.split(".").pop() === "js"); // find the .js files
    if (jsfile.length <= 0) { // basic check if there are no command files
      return console.log("There are no commands to load...");
    } else {
      jsfile.forEach((f, i) => { // if there are .js files
        let pull= require(`../commands/${f}`); // get command information
        console.log(`Command ${f} loaded!`); // log the command name
        bot.commands.set(pull.name, pull); // put the command name and options in command collection
        if (pull.aliases) // check if you set aliases
          pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name)); // put aliases in the aliases collection
      });
    }
  });
};