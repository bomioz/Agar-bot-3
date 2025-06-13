const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const regionesValidas = ['us east 1', 'us east 2', 'us west 1'];
const modosValidos = ['seguir', 'alimentar', 'dividir', 'burst'];

client.on('messageCreate', async (message) => {
  if (!message.content.toLowerCase().startsWith('!bots')) return;

  // Divide por espacios, ignorando múltiples espacios
  const args = message.content.trim().split(/\s+/);

  if (args.length !== 5) {
    return message.reply('Uso correcto: `!bots <codigo_party> <region> <modo>`');
  }

  const codigoParty = args[1];
  const region = `${args[2].toLowerCase()} ${args[3].toLowerCase()}`;
  const modo = args[4].toLowerCase();

  if (!regionesValidas.includes(region)) {
    return message.reply('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
  }

  if (!modosValidos.includes(modo)) {
    return message.reply('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  // Aquí iría la función para lanzar los bots (simplificada)
  message.reply(`Enviando bots a la party ${codigoParty} en la región ${region} en modo ${modo}...`);

  // TODO: colocar aquí llamada para iniciar bots
});

client.login(process.env.DISCORD_TOKEN);
