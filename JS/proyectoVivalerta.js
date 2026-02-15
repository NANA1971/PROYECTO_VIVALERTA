// ==========================================
// CLASES - PROGRAMACIÓN ORIENTADA A OBJETOS
// ==========================================

// Clase Base: Usuario
class Usuario {
    constructor(nombre, apellido, numeroIdentificacion, direccion, usuario, contrasena) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.numeroIdentificacion = numeroIdentificacion;
        this.direccion = direccion;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.alertasSeleccionadas = [];
    }

    agregarAlerta(tipoAlerta) {
        if (!this.alertasSeleccionadas.includes(tipoAlerta)) {
            this.alertasSeleccionadas.push(tipoAlerta);
        }
    }

    eliminarAlerta(tipoAlerta) {
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

// Clase Base: Alerta
class Alerta {
    constructor(tipo, icono) {
        this.tipo = tipo;
        this.icono = icono;
        this.alertas = [];
    }

    agregarNotificacion(titulo, descripcion) {
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

// Clases Heredadas - Polimorfismo
class AlertaTransito extends Alerta {
    constructor() {
        super('Tránsito', '🚗');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion(
            'Congestión en Autopista Sur',
            'Se reporta tráfico pesado en dirección norte. Tiempo estimado de retraso: 25 minutos.'
        );
        this.agregarNotificacion(
            'Accidente en Avenida 80',
            'Accidente menor reportado. Carril derecho cerrado temporalmente.'
        );
        this.agregarNotificacion(
            'Vía Cerrada por Obras',
            'Calle 100 con Carrera 15 en mantenimiento hasta las 6:00 PM.'
        );
    }
}

class AlertaClima extends Alerta {
    constructor() {
        super('Clima', '🌤️');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion(
            'Pronóstico del Día',
            'Temperatura: 22°C. Cielo parcialmente nublado. Probabilidad de lluvia: 40%.'
        );
        this.agregarNotificacion(
            'Alerta de Lluvias',
            'Se esperan lluvias moderadas entre las 2:00 PM y 5:00 PM.'
        );
        this.agregarNotificacion(
            'Condiciones de Viento',
            'Vientos de 15 km/h desde el noreste. Buenas condiciones generales.'
        );
    }
}

class AlertaSalud extends Alerta {
    constructor() {
        super('Salud', '🏥');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion(
            'Campaña de Vacunación',
            'Jornada de vacunación gratuita contra la influenza en centros de salud locales.'
        );
        this.agregarNotificacion(
            'Alerta Sanitaria',
            'Aumento de casos de dengue en la región. Elimine criaderos de mosquitos.'
        );
        this.agregarNotificacion(
            'Recomendación de Salud',
            'Mantenga hidratación adecuada debido a altas temperaturas.'
        );
    }
}

class AlertaEventos extends Alerta {
    constructor() {
        super('Eventos', '🎉');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion(
            'Festival de Música',
            'Gran concierto en el Parque Simón Bolívar este sábado a las 5:00 PM. Entrada libre.'
        );
        this.agregarNotificacion(
            'Feria Gastronómica',
            'Feria de comida internacional en el centro comercial. Viernes a domingo.'
        );
        this.agregarNotificacion(
            'Maratón Ciudad',
            'Cierre de vías el domingo por maratón anual. Consulte rutas alternativas.'
        );
    }
}

class AlertaNoticias extends Alerta {
    constructor() {
        super('Noticias', '📰');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion(
            'Noticia Política',
            'Aprobado nuevo presupuesto municipal para mejoras en transporte público.'
        );
        this.agregarNotificacion(
            'Economía Local',
            'Apertura de nuevas oportunidades de empleo en sector tecnológico.'
        );
        this.agregarNotificacion(
            'Educación',
            'Inician inscripciones para cursos gratuitos de capacitación digital.'
        );
    }
}

// ==========================================
// SISTEMA DE GESTIÓN
// ==========================================

class SistemaGestion {
    constructor() {
        this.usuarios = this.cargarUsuarios();
        this.usuarioActual = null;
        this.alertas = {
            transito: new AlertaTransito(),
            clima: new AlertaClima(),
            salud: new AlertaSalud(),
            eventos: new AlertaEventos(),
            noticias: new AlertaNoticias()
        };
    }

    cargarUsuarios() {
        const usuariosGuardados = localStorage.getItem('vivalerta_usuarios');
        if (usuariosGuardados) {
            const data = JSON.parse(usuariosGuardados);
            return data.map(u => {
                const usuario = new Usuario(
                    u.nombre,
                    u.apellido,
                    u.numeroIdentificacion,
                    u.direccion,
                    u.usuario,
                    u.contrasena
                );
                usuario.alertasSeleccionadas = u.alertasSeleccionadas;
                return usuario;
            });
        }
        return [];
    }

    guardarUsuarios() {
        localStorage.setItem('vivalerta_usuarios', JSON.stringify(this.usuarios));
    }

    registrarUsuario(nombre, apellido, identificacion, direccion, usuario, contrasena, alertas) {
        // Verificar si el usuario ya existe
        const existeUsuario = this.usuarios.find(u => u.usuario === usuario);
        if (existeUsuario) {
            return { exito: false, mensaje: 'El nombre de usuario ya existe' };
        }

        // Verificar si la identificación ya existe
        const existeId = this.usuarios.find(u => u.numeroIdentificacion === identificacion);
        if (existeId) {
            return { exito: false, mensaje: 'El número de identificación ya está registrado' };
        }

        // Crear nuevo usuario
        const nuevoUsuario = new Usuario(nombre, apellido, identificacion, direccion, usuario, contrasena);
        
        // Agregar alertas seleccionadas
        alertas.forEach(alerta => nuevoUsuario.agregarAlerta(alerta));

        this.usuarios.push(nuevoUsuario);
        this.guardarUsuarios();

        return { exito: true, mensaje: 'Usuario registrado exitosamente' };
    }

    iniciarSesion(usuario, contrasena) {
        const usuarioEncontrado = this.usuarios.find(u => u.usuario === usuario);

        if (!usuarioEncontrado) {
            return { exito: false, mensaje: 'El usuario no está registrado. Por favor regístrese primero.' };
        }

        if (usuarioEncontrado.contrasena !== contrasena) {
            return { exito: false, mensaje: 'Contraseña incorrecta. Por favor intente nuevamente.' };
        }

        this.usuarioActual = usuarioEncontrado;
        return { exito: true, mensaje: 'Inicio de sesión exitoso', usuario: usuarioEncontrado };
    }

    cerrarSesion() {
        this.usuarioActual = null;
    }

    actualizarUsuario(nombre, apellido, direccion, alertas) {
        if (this.usuarioActual) {
            this.usuarioActual.actualizarDatos(nombre, apellido, direccion);
            this.usuarioActual.alertasSeleccionadas = alertas;
            this.guardarUsuarios();
            return { exito: true, mensaje: 'Datos actualizados correctamente' };
        }
        return { exito: false, mensaje: 'No hay usuario en sesión' };
    }

    obtenerAlertasUsuario() {
        if (!this.usuarioActual) return [];

        return this.usuarioActual.alertasSeleccionadas.map(tipo => {
            return {
                tipo: tipo,
                alerta: this.alertas[tipo]
            };
        });
    }
}

// ==========================================
// APLICACIÓN PRINCIPAL
// ==========================================

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
        // Formulario de Login
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarLogin();
        });

        // Formulario de Registro
        document.getElementById('register-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarRegistro();
        });

        // Formulario de Perfil
        document.getElementById('profile-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarActualizacionPerfil();
        });
    }

    mostrarPantallaInicial() {
        this.mostrarPantalla('welcome-screen');
    }

    mostrarPantalla(pantallaId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(pantallaId).classList.add('active');
    }

    showWelcome() {
        this.mostrarPantalla('welcome-screen');
    }

    showLogin() {
        this.mostrarPantalla('login-screen');
        document.getElementById('login-form').reset();
        this.ocultarMensaje('login-error');
    }

    showRegister() {
        this.mostrarPantalla('register-screen');
        document.getElementById('register-form').reset();
        this.ocultarMensaje('register-error');
    }

    showDashboard() {
        if (!this.sistema.usuarioActual) {
            this.showLogin();
            return;
        }

        this.mostrarPantalla('dashboard-screen');
        this.cargarDashboard();
    }

    showProfile() {
        if (!this.sistema.usuarioActual) {
            this.showLogin();
            return;
        }

        this.mostrarPantalla('profile-screen');
        this.cargarDatosPerfil();
    }

    procesarLogin() {
        const usuario = document.getElementById('login-username').value.trim();
        const contrasena = document.getElementById('login-password').value;

        if (!usuario || !contrasena) {
            this.mostrarMensaje('login-error', 'Por favor complete todos los campos');
            return;
        }

        const resultado = this.sistema.iniciarSesion(usuario, contrasena);

        if (resultado.exito) {
            this.showDashboard();
        } else {
            this.mostrarMensaje('login-error', resultado.mensaje);
        }
    }

    procesarRegistro() {
        const nombre = document.getElementById('reg-nombre').value.trim();
        const apellido = document.getElementById('reg-apellido').value.trim();
        const identificacion = document.getElementById('reg-identificacion').value.trim();
        const direccion = document.getElementById('reg-direccion').value.trim();
        const usuario = document.getElementById('reg-usuario').value.trim();
        const contrasena = document.getElementById('reg-password').value;

        // Obtener alertas seleccionadas
        const checkboxes = document.querySelectorAll('input[name="alerta"]:checked');
        const alertas = Array.from(checkboxes).map(cb => cb.value);

        // Validaciones
        if (!nombre || !apellido || !identificacion || !direccion || !usuario || !contrasena) {
            this.mostrarMensaje('register-error', 'Por favor complete todos los campos');
            return;
        }

        if (alertas.length === 0) {
            this.mostrarMensaje('register-error', 'Por favor seleccione al menos una alerta');
            return;
        }

        if (contrasena.length < 6) {
            this.mostrarMensaje('register-error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const resultado = this.sistema.registrarUsuario(
            nombre, apellido, identificacion, direccion, usuario, contrasena, alertas
        );

        if (resultado.exito) {
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            this.showLogin();
        } else {
            this.mostrarMensaje('register-error', resultado.mensaje);
        }
    }

    procesarActualizacionPerfil() {
        const nombre = document.getElementById('prof-nombre').value.trim();
        const apellido = document.getElementById('prof-apellido').value.trim();
        const direccion = document.getElementById('prof-direccion').value.trim();

        const checkboxes = document.querySelectorAll('input[name="alerta-prof"]:checked');
        const alertas = Array.from(checkboxes).map(cb => cb.value);

        if (!nombre || !apellido || !direccion) {
            alert('Por favor complete todos los campos');
            return;
        }

        if (alertas.length === 0) {
            alert('Por favor seleccione al menos una alerta');
            return;
        }

        const resultado = this.sistema.actualizarUsuario(nombre, apellido, direccion, alertas);

        if (resultado.exito) {
            const mensaje = document.getElementById('profile-message');
            mensaje.textContent = resultado.mensaje;
            mensaje.classList.add('active');
            setTimeout(() => {
                mensaje.classList.remove('active');
                this.showDashboard();
            }, 2000);
        }
    }

    cargarDashboard() {
        const usuario = this.sistema.usuarioActual;
        
        // Actualizar header
        document.getElementById('user-name-header').textContent = usuario.obtenerNombreCompleto();
        document.getElementById('dashboard-welcome').textContent = `¡Bienvenido, ${usuario.nombre}!`;

        // Cargar alertas
        const container = document.getElementById('alerts-container');
        container.innerHTML = '';

        const alertasUsuario = this.sistema.obtenerAlertasUsuario();

        alertasUsuario.forEach(({tipo, alerta}) => {
            const card = this.crearTarjetaAlerta(alerta);
            container.appendChild(card);
        });
    }

    crearTarjetaAlerta(alerta) {
        const card = document.createElement('div');
        card.className = 'alert-card';

        const header = document.createElement('div');
        header.className = 'alert-header';

        const icon = document.createElement('div');
        icon.className = 'alert-icon';
        icon.textContent = alerta.icono;

        const title = document.createElement('div');
        title.className = 'alert-title';
        title.textContent = alerta.tipo;

        header.appendChild(icon);
        header.appendChild(title);

        const content = document.createElement('div');
        content.className = 'alert-content';

        const alertasData = alerta.obtenerAlertas();
        alertasData.forEach(alertaItem => {
            const item = document.createElement('div');
            item.className = 'alert-item';

            const itemTitle = document.createElement('h4');
            itemTitle.textContent = alertaItem.titulo;

            const itemDesc = document.createElement('p');
            itemDesc.textContent = alertaItem.descripcion;

            const itemTime = document.createElement('div');
            itemTime.className = 'alert-time';
            itemTime.textContent = alertaItem.fecha;

            item.appendChild(itemTitle);
            item.appendChild(itemDesc);
            item.appendChild(itemTime);
            content.appendChild(item);
        });

        card.appendChild(header);
        card.appendChild(content);

        return card;
    }

    cargarDatosPerfil() {
        const usuario = this.sistema.usuarioActual;

        document.getElementById('prof-nombre').value = usuario.nombre;
        document.getElementById('prof-apellido').value = usuario.apellido;
        document.getElementById('prof-identificacion').value = usuario.numeroIdentificacion;
        document.getElementById('prof-direccion').value = usuario.direccion;

        // Marcar checkboxes de alertas
        document.querySelectorAll('input[name="alerta-prof"]').forEach(checkbox => {
            checkbox.checked = usuario.alertasSeleccionadas.includes(checkbox.value);
        });

        this.ocultarMensaje('profile-message');
    }

    logout() {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            this.sistema.cerrarSesion();
            this.showWelcome();
        }
    }

    mostrarMensaje(elementoId, mensaje) {
        const elemento = document.getElementById(elementoId);
        elemento.textContent = mensaje;
        elemento.classList.add('active');
    }

    ocultarMensaje(elementoId) {
        const elemento = document.getElementById(elementoId);
        elemento.textContent = '';
        elemento.classList.remove('active');
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new AplicacionVivalerta();
});