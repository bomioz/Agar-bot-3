const validRegions = ['useast1', 'useast2', 'uswest1'];
const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!bots')) return;

  const args = message.content.trim().split(/\s+/);

  if (args.length < 4) {
    return message.channel.send('Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const partyCode = args[1];
  // Unir las palabras de región, ej: 'us east 1' => 'useast1'
  const regionRaw = args.slice(2, args.length - 1).join('').toLowerCase();
  const mode = args[args.length - 1].toLowerCase();

  if (!validRegions.includes(regionRaw)) {
    return message.channel.send('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
  }

  if (!validModes.includes(mode)) {
    return message.channel.send('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  message.channel.send(`Enviando bots a la party ${partyCode} en la región ${regionRaw} en modo ${mode}...`);

  // Aquí llamas la función que crea y manda los bots reales
});
