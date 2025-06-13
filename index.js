const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./start-bots');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`🤖 Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    return message.reply('🏓 ¡Estoy activo!');
  }

  if (message.content.startsWith('!bots')) {
    const args = message.content.split(' ');

    if (args.length !== 4) {
      return message.reply('Uso correcto: `!bots <codigo_party> <region> <modo>`');
    }

    const [, partyCode, regionInput, mode] = args;

    const regionMap = {
      'us': {
        'east1': 'wss://agsrv-live-v3-0.agario.miniclip.com:443',
        'east2': 'wss://agsrv-live-v3-1.agario.miniclip.com:443',
        'west1': 'wss://agsrv-live-v3-2.agario.miniclip.com:443',
      },
    };

    const region = regionInput.toLowerCase().replace(/\s/g, '');

    if (!['seguir', 'alimentar', 'dividir', 'burst'].includes(mode)) {
      return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    if (!['east1', 'east2', 'west1'].includes(region)) {
      return message.reply('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
    }

    const nickname = 'Bσм.ioz#Live1k🔴';

    try {
      await message.reply(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);
      startBots({
        nickname,
        partyCode,
        region,
        mode,
        totalBots: 28
      });
    } catch (error) {
      console.error('Error al iniciar bots:', error);
      message.reply('❌ Error al iniciar bots.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
