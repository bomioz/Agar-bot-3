const validRegions = ['us east 1', 'us east 2', 'us west 1'];
const validModes = ['seguir', 'alimentar', 'dividir', 'burst'];

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith('!bots')) return;

  const args = message.content.trim().split(/\s+/);
  // !bots <partyCode> <region> <mode>
  if (args.length !== 4) {
    return message.channel.send('Uso correcto: `!bots <código_party> <región> <modo>`');
  }

  const partyCode = args[1];
  const region = args[2].toLowerCase();
  const mode = args[3].toLowerCase();

  if (!validRegions.includes(region)) {
    return message.channel.send('Región inválida. Usa: `us east 1`, `us east 2` o `us west 1`');
  }

  if (!validModes.includes(mode)) {
    return message.channel.send('Modo inválido. Usa: `seguir`, `alimentar`, `dividir` o `burst`');
  }

  // Aquí va el código para iniciar los bots con partyCode, region y mode
  message.channel.send(`Enviando bots a la party ${partyCode} en la región ${region} en modo ${mode}...`);

  // TODO: Ejecutar la función para enviar bots según esos parámetros
});
