const { Bot } = require('./agario-client');

function startBots(partyCode, region, const regionURLs = {
  'us-east-1': 'wss://us-east-1.agar.io/',
  'us-east-2': 'wss://us-east-2.agar.io/',
  'us-west-1': 'wss://us-west-1.agar.io/',
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
