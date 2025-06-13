require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const WebSocket = require('ws');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const NICKNAME = 'Bσм.ioz#Live1k🔴';
const BOT_COUNT = 28;

const REGIONS = {
  'us-east-1': 'wss://east1.agar.io/',
  'us-east-2': 'wss://east2.agar.io/',
  'us-west-1': 'wss://us.agar.io/'
};

const MODES = ['seguir', 'alimentar', 'dividir', 'burst'];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log('🤖 Bot listo!');
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!bots') || message.author.bot) return;

  const args = message.content.trim().split(/ +/);
  if (args.length !== 4) {
    return message.reply('Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const [cmd, party, regionKey, mode] = args;
  const regionUrl = REGIONS[regionKey.toLowerCase()];
  if (!regionUrl) return message.reply(`❌ Región inválida: ${regionKey}`);
  if (!MODES.includes(mode)) return message.reply(`❌ Modo inválido. Usa: \`${MODES.join('`, `')}\``);

  message.reply(`✅ Enviando bots a la party **${party}** en la región **${regionKey}** en modo **${mode}**...`);

  for (let i = 0; i < BOT_COUNT; i++) {
    const ws = new WebSocket(regionUrl);

    ws.on('open', () => {
      const skin = '';
      const name = `${NICKNAME}`;
      const spawnMsg = Buffer.concat([
        Buffer.from([0x00]),
        Buffer.from(party),
        Buffer.from([0x00, 0x01]),
        Buffer.from(skin + name)
      ]);
      ws.send(spawnMsg);

      if (mode === 'seguir') {
        // Lógica simple: Enviar posición repetida
        setInterval(() => {
          const x = 1000;
          const y = 1000;
          const buf = Buffer.alloc(9);
          buf.writeUInt8(0x10, 0);
          buf.writeInt32LE(x, 1);
          buf.writeInt32LE(y, 5);
          ws.send(buf);
        }, 100);
      }

      if (mode === 'alimentar') {
        setInterval(() => ws.send(Buffer.from([0x12])), 300);
      }

      if (mode === 'dividir') {
        setInterval(() => ws.send(Buffer.from([0x11])), 500);
      }

      if (mode === 'burst') {
        ws.send(Buffer.from([0x11])); // split
        setTimeout(() => ws.send(Buffer.from([0x12])), 200); // feed
        setInterval(() => {
          ws.send(Buffer.from([0x11]));
          setTimeout(() => ws.send(Buffer.from([0x12])), 200);
        }, 1000);
      }
    });

    ws.on('error', (err) => {
      console.error(`❌ Error bot ${i + 1}:`, err.message);
    });
  }
});

client.login(DISCORD_TOKEN);
