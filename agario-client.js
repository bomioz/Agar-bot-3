// lib/agario-client.js

const WebSocket = require('ws');

class Bot {
  constructor({ nickname, party, region, mode }) {
    this.nickname = nickname;
    this.party = party;
    this.region = region;
    this.mode = mode.toLowerCase();
    this.ws = null;
  }

  getServerUrl() {
    // Mapear regiones a URLs válidas (puedes ajustar según lo que funciona)
    const servers = {
      'us-east-1': 'ws-us-east-1.agar.io',
      'us-east1': 'ws-us-east-1.agar.io',
      'east1': 'ws-us-east-1.agar.io',
      'us-west-1': 'ws-us-west-1.agar.io',
      'west1': 'ws-us-west-1.agar.io',
      'eu-west-1': 'ws-eu-west-1.agar.io',
      'eu1': 'ws-eu-west-1.agar.io',
      // añade las demás regiones que uses
    };

    // Elige servidor según región, o un default
    return servers[this.region.toLowerCase()] || 'ws.agar.io';
  }

  connect() {
    const url = `wss://${this.getServerUrl()}/`;
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log(`Bot conectado al servidor ${url}`);

      // Enviar datos de inicio (simplificado)
      this.ws.send(JSON.stringify({
        nick: this.nickname,
        party: this.party,
        mode: this.mode,
      }));
    });

    this.ws.on('message', (data) => {
      // Aquí iría la lógica para manejar el juego (seguir, dividir, etc)
      // Por simplicidad, solo mostramos mensaje
      // console.log(`Mensaje del servidor: ${data}`);
    });

    this.ws.on('close', () => {
      console.log('Conexión cerrada');
    });

    this.ws.on('error', (error) => {
      console.error('Error de conexión:', error.message);
    });
  }
}

module.exports = { Bot };
