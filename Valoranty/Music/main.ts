import DiscordJS, { IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

let prefix = ">";

const client = new DiscordJS.Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent
    ]
})

const isCommand = (message: DiscordJS.Message) => {
    if(message.content.startsWith(prefix)) return true
    return false
}

client.on('ready', () => {
    console.log("Bot is ready")
})

client.on('messageCreate', (message) => {
    if(message.content.includes("ping") && isCommand(message)){
        message.reply({
            content: `Bot Latency: ${Date.now() - message.createdTimestamp}ms \nAPI lantecy: ${Math.round(client.ws.ping)}ms`
        })
    }
})

client.login(process.env.TOKEN2)