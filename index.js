require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./connect');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log('🤖 Bot listo en Discord');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!bots') || message.author.bot) return;

  const args = message.content.trim().split(/\s+/);
  if (args.length !== 4) {
    return message.reply('❗ Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const [, partyCode, region, mode] = args;

  const modosValidos = ['seguir', 'alimentar', 'dividir', 'burst'];
  const regionesValidas = ['us-east-1', 'us-east-2', 'us-west-1'];

  if (!modosValidos.includes(mode)) {
    return message.reply('❗ Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  if (!regionesValidas.includes(region)) {
    return message.reply('❗ Región inválida. Usa: `us-east-1`, `us-east-2`, `us-west-1`');
  }

  try {
    message.reply(`🚀 Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);
    startBots(partyCode, region, mode);
  } catch (error) {
    console.error('Error al enviar bots:', error);
    message.reply(`❌ Error al enviar bots: ${error.message}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
