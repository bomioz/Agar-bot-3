require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const AgarioClient = require('./lib/agario-client');

const discordToken = process.env.DISCORD_TOKEN;
const BOT_NAME = 'Bσм.ioz#Live1k🔴';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Bot Discord listo! Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.reply('pong!');
  }

  if (command === 'bots') {
    if (args.length !== 3) {
      return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
    }

    const [partyCode, region, mode] = args;

    const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];
    if (!validModes.includes(mode.toLowerCase())) {
      return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    message.channel.send(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

    try {
      for (let i = 0; i < 28; i++) {
        const botName = `${BOT_NAME}_${i + 1}`;
        const agarioBot = new AgarioClient(botName, partyCode.toUpperCase(), region.toLowerCase());
        await agarioBot.connect();
        agarioBot.performAction(mode.toLowerCase());
      }
      message.channel.send(`¡Bots enviados!`);
    } catch (error) {
      console.error('Error al enviar bots:', error);
      message.channel.send('Error al enviar bots. Revisa la consola.');
    }
  }
});

client.login(discordToken);
