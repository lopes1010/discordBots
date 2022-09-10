const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(`Commands: ${command.data.name} `);
      }
    }
    const clientId = "1017539836166545418";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN1);
    try {
      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
    } catch (error) {
      console.error(error);
    }
  };
};
