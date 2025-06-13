const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const validRegions = ['useast1', 'useast2', 'uswest1'];
const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];

client.on('ready', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignorar mensajes de bots

  const prefix = '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    return message.reply('Pong!');
  }

  if (command === 'bots') {
    if (args.length !== 3) {
      return message.reply('Uso correcto: `!bots <codigo_party> <region> <modo>`');
    }

    const [partyCode, region, mode] = args;

    if (!validRegions.includes(region.toLowerCase())) {
      return message.reply('Región inválida. Usa: `useast1`, `useast2` o `uswest1`');
    }

    if (!validModes.includes(mode.toLowerCase())) {
      return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
    }

    // Aquí iría la función que envía los bots con esos parámetros
    message.reply(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

    // Por ahora sólo responde; luego integrarás la lógica real para enviar bots
  }
});

client.login(process.env.DISCORD_TOKEN);
