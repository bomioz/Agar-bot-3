const AgarioClient = require('./lib/agario-client');

function startBots({ nickname, partyCode, region, mode, totalBots = 28 }) {
  const bots = [];

  for (let i = 0; i < totalBots; i++) {
    const bot = new AgarioClient.Bot();
    bot.inParty = true;
    bot.connect(region, partyCode);
    bot.nickname = nickname;

    bot.on('connected', () => {
      console.log(`✅ Bot ${i + 1} conectado`);
    });

    bot.on('connectionError', (err) => {
      console.error(`❌ Error en bot ${i + 1}:`, err);
    });

    bot.on('lostMyBalls', () => {
      if (mode === 'seguir') {
        bot.setTargetNick(nickname);
      } else if (mode === 'alimentar') {
        bot.setTargetNick(nickname);
        bot.feed();
      } else if (mode === 'dividir') {
        bot.setTargetNick(nickname);
        bot.split();
      } else if (mode === 'burst') {
        bot.setTargetNick(nickname);
        bot.split();
        setTimeout(() => bot.feed(), 500);
      } else {
        console.log(`⚠️ Modo inválido: ${mode}`);
      }
    });

    bots.push(bot);
  }

  return bots;
}

module.exports = { startBots };
