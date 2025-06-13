require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const AgarioClient = require('./lib/agario-client'); // asegúrate que está aquí el archivo correcto

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const BOT_NICKNAME = 'Bσм.ioz#Live1k🔴'; // tu nombre personalizado en Agar.io

// Mapeo de regiones válidas con sus endpoints reales
const REGION_ENDPOINTS = {
  'us east 1': 'wseast1.agario.miniclippt.com',
  'us east 2': 'wseast2.agario.miniclippt.com',
  'us west 1': 'wswest1.agario.miniclippt.com',
};

const VALID_MODES = ['seguir', 'alimentar', 'dividir', 'burst'];

client.once('ready', () => {
  console.log(`Bot Discord listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    return message.channel.send('Pong! 🏓');
  }

  if (command === 'bots') {
    if (args.length !== 3) {
      return message.channel.send('Uso correcto: `!bots <código_party> <región> <modo>`');
    }

    const [partyCode, region, mode] = args;
    const regionKey = region.toLowerCase();

    if (!Object.keys(REGION_ENDPOINTS).includes(regionKey)) {
      return message.channel.send('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
    }

    if (!VALID_MODES.includes(mode.toLowerCase())) {
      return message.channel.send('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    message.channel.send(`Enviando bots a la party ${partyCode} en la región ${regionKey} en modo ${mode}...`);

    try {
      const botsCount = 28; // cantidad de bots a enviar

      for (let i = 0; i < botsCount; i++) {
        const bot = new AgarioClient.Bot({
          nickname: BOT_NICKNAME,
          server: REGION_ENDPOINTS[regionKey],
          party: partyCode,
        });

        bot.connect();

        // Ejecutar acción según modo
        switch (mode.toLowerCase()) {
          case 'seguir':
            bot.followPlayer(BOT_NICKNAME);
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
        }

        // Pequeña pausa para evitar saturar conexiones
        await new Promise((r) => setTimeout(r, 500));
      }

      message.channel.send('Bots enviados correctamente! 🎉');
    } catch (error) {
      console.error('Error al enviar bots:', error);
      message.channel.send('❌ Ocurrió un error al enviar bots. Revisa la consola.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
