const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const servers = {
  west1: "wswest1.agario.miniclippt.com",
  east1: "wseast1.agario.miniclippt.com",
  east2: "wseast2.agario.miniclip.com",  // URL corregida
  south1: "wssouth1.agario.miniclippt.com",
};

function connectBot(partyCode, region) {
  const server = servers[region];
  if (!server) {
    console.error("Región inválida:", region);
    return;
  }

  const wsURL = `wss://${server}`;
  console.log(`Conectando a ${wsURL}...`);

  const ws = new WebSocket(wsURL);

  ws.on('open', () => {
    console.log(`Conectado a ${region}. Enviando bots a party ${partyCode}`);
    // Aquí va la lógica para mandar bots a la party (seguir, burst, etc.)
  });

  ws.on('error', (err) => {
    console.error("Error al conectar:", err.message);
  });
}

client.on('messageCreate', message => {
  if (!message.content.startsWith('!bots') || message.author.bot) return;

  const args = message.content.split(' ');
  if (args.length !== 4) {
    return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const [, partyCode, region, mode] = args;

  // Aquí podrías validar región y modo...

  message.reply(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

  connectBot(partyCode, region);
});

client.login(process.env.DISCORD_TOKEN);
