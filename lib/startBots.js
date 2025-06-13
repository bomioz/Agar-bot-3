// startBots.js

const AgarioClient = require('./lib/agario-client');

const regionURLs = {
  'us-east-1': 'wss://us-east-1.agar.io/',
  'us-east-2': 'wss://us-east-2.agar.io/',
  'us-west-1': 'wss://us-west-1.agar.io/',
};

async function startBots(partyCode, region, mode, nickname, botCount = 28) {
  if (!regionURLs[region]) {
    throw new Error(`❌ Región inválida: ${region}`);
  }

  console.log(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

  for (let i = 0; i < botCount; i++) {
    try {
      const bot = new AgarioClient.Bot({
        url: regionURLs[region],
        nickname: nickname || 'Bσм.ioz#Live1k🔴',
        party: partyCode,
      });

      await bot.connect();

      switch (mode) {
        case 'seguir':
          bot.followPlayer(nickname);
          break;
        case 'alimentar':
          bot.feed();
          break;
        case 'dividir':
          bot.split();
          break;
        case 'burst':
          bot.burst();
          break;
        default:
          console.log(`Modo inválido. Usa: seguir, alimentar, dividir o burst`);
          return;
      }

      console.log(`Bot ${i + 1} conectado y en modo ${mode}`);
    } catch (error) {
      console.error('Error al enviar bots:', error);
    }
  }
}

module.exports = { startBots };
