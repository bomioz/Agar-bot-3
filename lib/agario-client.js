class Bot {
  constructor(nickname, url) {
    this.nickname = nickname;
    this.url = url;
  }

  connect(partyCode, mode = 'seguir') {
    console.log(`✅ [BOT] ${this.nickname} se está conectando a la party ${partyCode} en ${this.url} con modo: ${mode}`);
    
    // Aquí iría la lógica real de conexión al WebSocket
    // Simulación por ahora (puedes reemplazar esto luego con lógica real)
    setTimeout(() => {
      console.log(`🎉 [BOT] ${this.nickname} conectado exitosamente.`);
    }, 2000);
  }
}

module.exports = {
  Bot
};
