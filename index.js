const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const BOT_NAME = 'Bσм.ioz#Live1k🔴'; // Tu nombre en el juego
const BOT_COUNT = 28;

const servers = {
  west1: "wss://west1.agar.io",
  east1: "wss://east1.agar.io",
  east2: "wss://east2.agar.io",
  south1: "wss://south1.agar.io"
};

client.once('ready', () => {
  console.log(`🤖 Bot de Discord conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    return message.reply('🏓 Pong!');
  }

  if (message.content.startsWith('!bots')) {
    const args = message.content.split(' ');

    if (args.length !== 4) {
      return message.reply('❌ Uso correcto: `!bots <código_party> <región> <modo>`');
    }

    const party = args[1];
    const region = args[2].toLowerCase();
    const modo = args[3].toLowerCase();

    if (!['seguir', 'alimentar', 'dividir', 'burst'].includes(modo)) {
      return message.reply('❌ Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    if (!servers[region]) {
      return message.reply('❌ Región inválida. Usa: west1, east1, east2, south1');
    }

    message.reply(`🚀 Enviando ${BOT_COUNT} bots a la party ${party} en la región ${region} en modo ${modo}...`);

    try {
      for (let i = 0; i < BOT_COUNT; i++) {
        conectarBot(party, region, modo);
      }
    } catch (error) {
      console.error('❌ Error al enviar bots:', error);
      message.reply('❌ Error al enviar bots. Revisa la consola.');
    }
  }
});

function conectarBot(party, region, modo) {
  const ws = new WebSocket(servers[region]);

  ws.on('open', () => {
    console.log(`✅ Bot conectado a ${region}`);
    ws.send(JSON.stringify({ type: "join", party: party, name: BOT_NAME }));
  });

  ws.on('message', (data) => {
    const mensaje = data.toString();
    // Aquí puedes poner lógica más avanzada si el cliente lo permite
  });

  ws.on('error', (err) => {
    console.error('❌ Error al conectar:', err.message);
  });

  ws.on('close', () => {
    console.log('🔌 Conexión cerrada');
  });
}

client.login(process.env.DISCORD_TOKEN);
