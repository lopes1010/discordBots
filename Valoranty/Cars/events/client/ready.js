module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`I'm READYYY!!! ${client.user.tag} is ready`);
  },
};
