class SistemaGestion {
    constructor() {
        this.usuarios = this.cargarUsuarios(); // Trae del localStorage
        this.usuarioActual = null;
        this.alertas = {   // Instancia todas las alertas del sistema
            transito: new AlertaTransito(),
            clima: new AlertaClima(),
            salud: new AlertaSalud(),
            eventos: new AlertaEventos(),
            noticias: new AlertaNoticias()
        };
    }

    cargarUsuarios() {
        const data = JSON.parse(localStorage.getItem('vivalerta_usuarios')) || [];
        return data.map(u => {
            const usuario = new Usuario(u.nombre, u.apellido, u.numeroIdentificacion, u.direccion, u.usuario, u.contrasena);
            usuario.alertasSeleccionadas = u.alertasSeleccionadas;
            return usuario;
        });
    }

    guardarUsuarios() {
        localStorage.setItem('vivalerta_usuarios', JSON.stringify(this.usuarios));
    }

    registrarUsuario(nombre, apellido, identificacion, direccion, usuario, contrasena, alertas) {
        if (this.usuarios.find(u => u.usuario === usuario)) return { exito: false, mensaje: 'Usuario ya existe' };
        if (this.usuarios.find(u => u.numeroIdentificacion === identificacion)) return { exito: false, mensaje: 'ID ya registrado' };
        
        const nuevoUsuario = new Usuario(nombre, apellido, identificacion, direccion, usuario, contrasena);
        alertas.forEach(a => nuevoUsuario.agregarAlerta(a));
        this.usuarios.push(nuevoUsuario);
        this.guardarUsuarios();
        return { exito: true, mensaje: 'Usuario registrado' };
    }

    iniciarSesion(usuario, contrasena) {
        const u = this.usuarios.find(u => u.usuario === usuario);
        if (!u) return { exito: false, mensaje: 'Usuario no registrado' };
        if (u.contrasena !== contrasena) return { exito: false, mensaje: 'Contraseña incorrecta' };
        this.usuarioActual = u;
        return { exito: true, usuario: u };
    }

    cerrarSesion() {
        this.usuarioActual = null;
    }

    actualizarUsuario(nombre, apellido, direccion, alertas) {
        if (!this.usuarioActual) return { exito: false, mensaje: 'No hay usuario en sesión' };
        this.usuarioActual.actualizarDatos(nombre, apellido, direccion);
        this.usuarioActual.alertasSeleccionadas = alertas;
        this.guardarUsuarios();
        return { exito: true, mensaje: 'Datos actualizados' };
    }

    obtenerAlertasUsuario() {
        if (!this.usuarioActual) return [];
        return this.usuarioActual.alertasSeleccionadas.map(tipo => ({ tipo, alerta: this.alertas[tipo] }));
    }
}