const fs = require("fs"); // built in file system
module.exports = (bot) => {
  fs.readdir("./events/", (err, files) => {
    if (err) console.log(err); // catch errors on startup
    let jsfile = files.filter(f => f.split(".").pop() === "js") // find the .js files
    if (jsfile.length <= 0) { // basic check if there are no event files
      return console.log("There are no events to load...")
    }
    jsfile.forEach((f, i) => { // if there are .js files
      let pull = require(`../events/${f}`); // get event information
      console.log(`Event ${f} loaded!`); // log the event name
      bot.events.set(pull.name, pull); // put event settings into the events collection
    });
  });
}