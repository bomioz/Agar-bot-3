require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./lib/startBots');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('ready', () => {
  console.log(`Bot iniciado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('¡Pong!');
  }

  if (message.content.startsWith('!bots')) {
    const args = message.content.split(' ').slice(1);
    if (args.length < 3) {
      return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
    }

    const [party, region, mode] = args;

    if (!['seguir', 'alimentar', 'dividir', 'burst'].includes(mode)) {
      return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    message.reply(`Enviando bots a la party ${party} en la región ${region} en modo ${mode}...`);
    startBots({
      party,
      region,
      modo: mode,
      nombreObjetivo: 'Bσм.ioz#Live1k🔴',
      cantidad: 28,
    });
  }
});

client.login(process.env.TOKEN);
