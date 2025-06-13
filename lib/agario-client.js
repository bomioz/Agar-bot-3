class Bot {
  constructor() {
    this.nickname = '';
  }

  connect(region, party) {
    console.log(`Conectando a ${region} con código ${party}`);
    // Aquí debes implementar conexión real con el cliente de Agar.io.
  }

  setTargetNickname(name) {
    console.log(`Siguiendo al jugador: ${name}`);
  }

  once(event, callback) {
    if (event === 'connected') {
      setTimeout(callback, 1000); // Simula conexión
    }
  }

  on(event, callback) {
    // Simula eventos
  }
}

module.exports = { Bot };
