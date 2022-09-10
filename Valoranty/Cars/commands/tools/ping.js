const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("../../events/client/ready");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns Bot Pings"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `API Latency: ${client.ws.ping}\nClient ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
