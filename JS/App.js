class AplicacionVivalerta {
    constructor() {
        this.sistema = new SistemaGestion();
        this.inicializar();
    }

    inicializar() {
        this.configurarEventos();
        this.mostrarPantallaInicial();
    }

    configurarEventos() {
        document.getElementById('login-form').addEventListener('submit', e => { e.preventDefault(); this.procesarLogin(); });
        document.getElementById('register-form').addEventListener('submit', e => { e.preventDefault(); this.procesarRegistro(); });
        document.getElementById('profile-form').addEventListener('submit', e => { e.preventDefault(); this.procesarActualizacionPerfil(); });
    }

    // Funciones de mostrar pantalla, login, registro, dashboard, perfil, logout...
}
class SistemaGestion {
    constructor() {
        this.usuarios = [];
        this.alertas = [];
        this.usuarioActual = null;
    }
}