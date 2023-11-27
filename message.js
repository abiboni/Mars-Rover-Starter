
class Message {
   // Write code here!
   constructor(name, commands = []) {
      this.name = name;
      this.commands = commands;
      if (!name) {
        throw Error("name in first parameter required");
      }
      this.name = name;
    }
  
  }

module.exports = Message;