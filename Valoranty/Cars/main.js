const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
require("dotenv").config({
  path: "../../Valoranty/.env",
});

let prefix = ">";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();
client.commandArray = [];

const functionFolder = fs.readdirSync("./functions");
for (const folder of functionFolder) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN1);

// const Connect = (message) => {
//     const guild = message.guild;
//     if(!guild) return message.channel.send("Bitch you ain't even in a fucking VC")
//         const connection = joinVoiceChannel({
//         channelId: message.channelId,
//         guildId: message.guild.id,
//         adapterCreator: message.guild.voiceAdapterCreator,
//     })
// }
// const isCommand = (message) => {
//     if(message.content.startsWith(prefix)) return true
//     return false
// }
