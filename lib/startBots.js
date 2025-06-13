const AgarioClient = require('./agario-client');
const bots = [];

function startBots({ party, region, modo, nombreObjetivo, cantidad }) {
  for (let i = 0; i < cantidad; i++) {
    const bot = new AgarioClient.Bot();
    bots.push(bot);

    bot.nickname = `${nombreObjetivo} • Bot ${i + 1}`;
    bot.connect(`${region}.agar.io`, party);

    bot.once('connected', () => {
      console.log(`${bot.nickname} conectado`);
      if (modo === 'seguir') {
        bot.setTargetNickname(nombreObjetivo);
      }
    });

    bot.on('disconnect', () => {
      console.log(`${bot.nickname} desconectado`);
    });
  }
}

module.exports = startBots;
