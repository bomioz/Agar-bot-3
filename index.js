require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const startBots = require('./lib/startBots');

const bot = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

bot.once('ready', () => {
  console.log(`🤖 Bot conectado como ${bot.user.tag}`);
});

bot.on('messageCreate', async message => {
  if (!message.content.startsWith('!bots') || message.author.bot) return;

  const args = message.content.split(' ');
  if (args.length !== 4) {
    return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const [cmd, partyCode, region, mode] = args;

  const modosValidos = ['seguir', 'alimentar', 'dividir', 'burst'];
  if (!modosValidos.includes(mode)) {
    return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  try {
    await startBots({
      party: partyCode,
      region: region,
      mode: mode,
      cantidad: 28,
      objetivo: 'Bσм.ioz#Live1k🔴'
    });

    message.reply(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);
  } catch (err) {
    console.error('❌ Error al enviar bots:', err);
    message.reply(`Error al enviar bots: ${err.message}`);
  }
});

bot.login(process.env.DISCORD_TOKEN);
