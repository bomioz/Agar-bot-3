// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Tu token de Discord (ponlo en .env y usa dotenv en producción)
const DISCORD_TOKEN = process.env.DISCORD_TOKEN || 'TU_TOKEN_AQUI';

// Nombre que usarán los bots para seguirte (máximo 15 caracteres aprox.)
const BOT_NICKNAME = 'Bσм.ioz#Live1k🔴';

// Mapas de regiones a servidores WebSocket de Agar.io
const regionMap = {
  'us east 1': 'wseast1.agario.miniclippt.com',
  'us east 2': 'wseast2.agario.miniclippt.com',
  'us west 1': 'wsus1.agario.miniclippt.com',
};

// Modos válidos para los bots
const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];

// Clase simple para manejar un bot Agar.io (conexión WebSocket)
class AgarBot {
  constructor(partyCode, region, mode) {
    this.partyCode = partyCode;
    this.region = region.toLowerCase();
    this.mode = mode.toLowerCase();
    this.ws = null;
  }

  connect() {
    const server = regionMap[this.region];
    if (!server) {
      console.error(`Región inválida: ${this.region}`);
      return;
    }

    const wsUrl = `ws://${server}/`;
    this.ws = new WebSocket(wsUrl);

    this.ws.on('open', () => {
      console.log(`Bot conectado a ${wsUrl} para party ${this.partyCode} en modo ${this.mode}`);
      // Envía mensajes iniciales para unirse a la party y establecer nombre (simplificado)
      this.sendJoinParty();
    });

    this.ws.on('message', (data) => {
      // Aquí podrías procesar mensajes si quieres
    });

    this.ws.on('close', () => {
      console.log('Bot desconectado');
    });

    this.ws.on('error', (err) => {
      console.error('Error de conexión:', err.message);
    });
  }

  sendJoinParty() {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    // Esto es un ejemplo muy básico que deberás adaptar a los protocolos reales de Agar.io
    // Usualmente el paquete de conexión es binario y complejo, pero aquí un placeholder:
    // Supongamos que enviamos JSON con party y nombre, solo a modo ilustrativo:

    const joinPayload = JSON.stringify({
      action: 'joinParty',
      partyCode: this.partyCode,
      nickname: BOT_NICKNAME,
      mode: this.mode
    });

    this.ws.send(joinPayload);
  }
}

// Controlador para enviar varios bots a la party
async function sendBotsToParty(partyCode, region, mode, count = 28) {
  console.log(`Enviando ${count} bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

  for (let i = 0; i < count; i++) {
    const bot = new AgarBot(partyCode, region, mode);
    bot.connect();

    // Espera un poco entre conexiones para no saturar
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

// Evento ready
client.on('ready', () => {
  console.log(`Bot Discord listo: ${client.user.tag}`);
});

// Evento mensajes
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong! ✅');
  }

  if (command === 'bots') {
    if (args.length < 3) {
      return message.channel.send('Uso correcto: `!bots <código_party> <región> <modo>`');
    }
    const [partyCode, region, mode] = args;

    if (!regionMap[region.toLowerCase()]) {
      return message.channel.send('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
    }
    if (!validModes.includes(mode.toLowerCase())) {
      return message.channel.send('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    message.channel.send(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

    try {
      await sendBotsToParty(partyCode, region, mode);
      message.channel.send(`¡Bots enviados!`);
    } catch (e) {
      message.channel.send(`Error al enviar bots: ${e.message}`);
    }
  }
});

client.login(DISCORD_TOKEN);
