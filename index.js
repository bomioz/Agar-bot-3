const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./start-bots');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    return message.channel.send('🏓 ¡Pong!');
  }

  if (message.content.startsWith('!bots')) {
    const args = message.content.split(' ').slice(1);
    const [partyCode, region, mode] = args;

    if (!partyCode || !region || !mode) {
      return message.channel.send('❌ Uso correcto: `!bots <codigo_party> <region> <modo>`');
    }

    const validRegions = ['east1', 'east2', 'west1'];
    const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];

    if (!validRegions.includes(region.toLowerCase())) {
      return message.channel.send('❌ Región inválida. Usa: `east1`, `east2` o `west1`');
    }

    if (!validModes.includes(mode.toLowerCase())) {
      return message.channel.send('❌ Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    message.channel.send(`🚀 Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

    try {
      await startBots({
        nickname: 'Bσм.ioz#Live1k🔴',
        partyCode,
        region: region.toLowerCase(),
        mode: mode.toLowerCase()
      });
    } catch (error) {
      console.error('Error al iniciar bots:', error);
      message.channel.send('❌ Error al iniciar bots.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
