// Clase que representa un usuario del sistema
class Usuario {
    constructor(nombre, apellido, numeroIdentificacion, direccion, usuario, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroIdentificacion = numeroIdentificacion;
        this.direccion = direccion;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.alertasSeleccionadas = []; // Alertas que el usuario quiere recibir
    }

    agregarAlerta(tipoAlerta) {
        // Agrega alerta si no está ya en la lista
        if (!this.alertasSeleccionadas.includes(tipoAlerta)) {
            this.alertasSeleccionadas.push(tipoAlerta);
        }
    }

    eliminarAlerta(tipoAlerta) {
        // Quita la alerta del usuario
        this.alertasSeleccionadas = this.alertasSeleccionadas.filter(a => a !== tipoAlerta);
    }

    obtenerNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }

    actualizarDatos(nombre, apellido, direccion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
    }
}

// Clase que representa un tipo de alerta
class Alerta {
    constructor(tipo, icono) {
        this.tipo = tipo;       // Ej: "Tránsito", "Clima"
        this.icono = icono;     // Emoji para mostrar en la UI
        this.alertas = [];      // Lista de notificaciones
    }

    agregarNotificacion(titulo, descripcion) {
        // Agrega un aviso con fecha y hora
        this.alertas.push({
            titulo,
            descripcion,
            fecha: new Date().toLocaleString('es-CO')
        });
    }

    obtenerAlertas() {
        return this.alertas;
    }

    limpiarAlertas() {
        this.alertas = [];
    }
}