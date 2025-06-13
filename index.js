const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./start-bots'); // Asegúrate de tener este archivo
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const regionesValidas = ['us east 1', 'us east 2', 'us west 1'];
const modosValidos = ['seguir', 'alimentar', 'dividir', 'burst'];

client.on('ready', () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!bots')) return;

  const args = message.content.trim().split(/\s+/);

  // Necesitamos al menos 5 partes: !bots, party, us, east, 1, modo
  if (args.length < 5) {
    return message.reply('Uso correcto: `!bots <codigo_party> <region> <modo>`');
  }

  const codigoParty = args[1];
  const region = `${args[2]} ${args[3]} ${args[4]}`.toLowerCase();
  const modo = args[5]?.toLowerCase();

  if (!regionesValidas.includes(region)) {
    return message.reply('❌ Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
  }

  if (!modosValidos.includes(modo)) {
    return message.reply('❌ Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  // Confirma al usuario
  message.reply(`🚀 Enviando bots a la party ${codigoParty} en la región ${region} en modo ${modo}...`);

  // Aquí lanzamos los bots reales
  try {
    startBots(codigoParty, region, modo);
  } catch (error) {
    console.error('❌ Error al iniciar bots:', error);
    message.reply('❌ Hubo un error al intentar lanzar los bots.');
  }
});

client.login(process.env.DISCORD_TOKEN);
