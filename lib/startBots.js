const { Bot } = require('./agario-client');

function startBots(partyCode, region, modo) {
  const regionURLs = {
    east1: 'wss://ws.east1.agar.io/',
    west1: 'wss://ws.west1.agar.io/',
    eu: 'wss://ws.eu.agar.io/'
  };

  const url = regionURLs[region];

  if (!url) {
    console.log(`❌ Región inválida: ${region}`);
    return;
  }

  console.log(`🚀 Enviando bots a la party ${partyCode} en la región ${region} en modo ${modo}...`);

  for (let i = 1; i <= 28; i++) {
    const nickname = `Bσм.ioz#Live1k🔴`;
    const bot = new Bot(nickname, url);
    bot.connect(partyCode, modo);
  }
}

module.exports = startBots;
