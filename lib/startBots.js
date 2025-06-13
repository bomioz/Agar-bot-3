const AgarioClient = require('./lib/agario-client'); // asegúrate de tener esta carpeta con el cliente personalizado

const NOMBRE_OBJETIVO = 'Bσм.ioz#Live1k🔴';
const TOTAL_BOTS = 28;

const regiones = {
  'us east 1': 'wseast1.agario.miniclippt.com',
  'us east 2': 'wseast2.agario.miniclippt.com',
  'us west 1': 'wswest1.agario.miniclippt.com'
};

function startBots(codigoParty, region, modo) {
  const serverUrl = regiones[region];
  if (!serverUrl) {
    console.log('❌ Región inválida');
    return;
  }

  for (let i = 0; i < TOTAL_BOTS; i++) {
    try {
      const bot = new AgarioClient.Bot();
      bot.debug = 0;
      bot.nick = '@bom.ioz';
      bot.connect(`ws://${serverUrl}/?party_id=${codigoParty}`);

      bot.on('connected', () => {
        console.log(`✅ Bot ${i + 1} conectado a ${codigoParty} (${region})`);

        bot.setNick(bot.nick);

        bot.on('leaderBoard', (leaders) => {
          // Opcional: seguimiento del leaderboard
        });

        bot.on('positionUpdate', () => {
          if (!bot.myCells.length) return;

          const target = bot.visibleNodes.find(node =>
            node.name === NOMBRE_OBJETIVO
          );

          if (target) {
            if (modo === 'seguir') {
              bot.moveTo(target.x, target.y);
            } else if (modo === 'alimentar') {
              bot.moveTo(target.x, target.y);
              bot.eject();
            } else if (modo === 'dividir') {
              bot.moveTo(target.x, target.y);
              bot.split();
            } else if (modo === 'burst') {
              bot.moveTo(target.x, target.y);
              bot.eject();
              bot.split();
            }
          }
        });
      });

      bot.on('disconnect', () => {
        console.log(`⚠️ Bot ${i + 1} desconectado`);
      });

    } catch (err) {
      console.error(`❌ Error en bot ${i + 1}:`, err.message);
    }
  }
}

module.exports = startBots;
