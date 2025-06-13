// agario-client.js
// Cliente personalizado para conectar bots reales a Agar.io

const WebSocket = require('ws');

class AgarioClient {
  constructor(nickname, partyCode, region) {
    this.nickname = nickname;
    this.partyCode = partyCode;
    this.region = region;
    this.ws = null;
    this.connected = false;
  }

  getServerUrl() {
    // Mapea la región al servidor Agar.io real
    const regionServers = {
      east1: 'wss://wseast1.agario.miniclippt.com',
      west1: 'wss://wswest1.agario.miniclippt.com',
      east2: 'wss://wseast2.agario.miniclippt.com',
      west2: 'wss://wswest2.agario.miniclippt.com',
      // Puedes agregar más servidores si se necesita
    };
    return regionServers[this.region.toLowerCase()] || regionServers.east1;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.getServerUrl());

      this.ws.on('open', () => {
        this.connected = true;
        this.sendJoinParty();
        resolve();
      });

      this.ws.on('message', (data) => {
        // Aquí podrías manejar mensajes entrantes si quieres
        // Por ahora no necesitamos para bots básicos
      });

      this.ws.on('close', () => {
        this.connected = false;
        console.log(`[Bot] Desconectado de la party ${this.partyCode}`);
      });

      this.ws.on('error', (err) => {
        console.error(`[Bot] Error en WebSocket:`, err);
        reject(err);
      });
    });
  }

  sendJoinParty() {
    if (!this.connected) return;

    // Envía mensaje para unirse a la party con el nickname
    // El protocolo de Agar.io usa paquetes binarios, esto es un ejemplo simulado
    // Asegúrate que el cliente real maneje bien esto, puedes ajustar para tu versión
    const joinPacket = JSON.stringify({
      cmd: 'party',
      action: 'join',
      partyCode: this.partyCode,
      nickname: this.nickname,
    });
    this.ws.send(joinPacket);
    console.log(`[Bot] Enviado join party ${this.partyCode} como ${this.nickname}`);
  }

  // Método para hacer que el bot haga acciones: seguir, alimentar, dividir, burst, etc.
  performAction(action) {
    if (!this.connected) return;
    // Aquí depende del protocolo, es un ejemplo:
    const actionPacket = JSON.stringify({
      cmd: 'action',
      type: action,
    });
    this.ws.send(actionPacket);
  }

  disconnect() {
    if (this.ws) this.ws.close();
  }
}

module.exports = AgarioClient;
