// lib/agario-client.js

const WebSocket = require('ws');

class Bot {
  constructor({ nickname, party, region, mode }) {
    this.nickname = nickname;
    this.party = party;
    this.region = region;
    this.mode = mode;

    this.ws = null;
  }

  connect() {
    // Define URL del servidor basado en la región
    const servers = {
      'us-east-1': 'wss://ws-us-east-1.agar.io',
      'us-east-2': 'wss://ws-us-east-2.agar.io',
      'us-west-1': 'wss://ws-us-west-1.agar.io',
      'east-1': 'wss://ws-east-1.agar.io',
      'east-2': 'wss://ws-east-2.agar.io',
      'west-1': 'wss://ws-west-1.agar.io',
      // agrega más regiones si necesitas
    };

    const serverUrl = servers[this.region.toLowerCase()];
    if (!serverUrl) {
      throw new Error(`Región inválida: ${this.region}`);
    }

    this.ws = new WebSocket(serverUrl);

    this.ws.on('open', () => {
      console.log(`${this.nickname} conectado al servidor Agar.io en ${this.region}`);
      // Aquí envías la unión a la party y modo (seguimiento, burst, etc)
      // Ejemplo básico, necesitarás adaptar según el protocolo Agar.io real
      this.ws.send(JSON.stringify({
        type: 'join_party',
        party: this.party,
        nickname: this.nickname,
        mode: this.mode,
      }));
    });

    this.ws.on('message', (data) => {
      // Maneja mensajes recibidos
      // console.log(`Mensaje recibido: ${data}`);
    });

    this.ws.on('close', () => {
      console.log(`${this.nickname} desconectado.`);
    });

    this.ws.on('error', (err) => {
      console.error(`Error en bot ${this.nickname}:`, err);
    });
  }
}

module.exports = {
  Bot,
};
