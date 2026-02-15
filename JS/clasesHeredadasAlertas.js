class AlertaTransito extends Alerta {
    constructor() {
        super('Tránsito', '🚗');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion('Congestión en Autopista Sur', 'Tráfico pesado, retraso 25 min.');
        this.agregarNotificacion('Accidente en Avenida 80', 'Carril derecho cerrado temporalmente.');
        this.agregarNotificacion('Vía Cerrada por Obras', 'Mantenimiento hasta las 6:00 PM.');
    }
}

class AlertaClima extends Alerta {
    constructor() {
        super('Clima', '🌤️');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion('Pronóstico del Día', '22°C, parcialmente nublado, 40% prob. lluvia.');
        this.agregarNotificacion('Alerta de Lluvias', 'Se esperan lluvias moderadas 2-5 PM.');
        this.agregarNotificacion('Condiciones de Viento', 'Vientos 15 km/h noreste.');
    }
}

// Igual para AlertaSalud, AlertaEventos y AlertaNoticias...
class AlertaSalud extends Alerta {
    constructor() {
        super('Salud', '🏥');
        this.generarAlertasIniciales();
    }

    generarAlertasIniciales() {
        this.agregarNotificacion('Campaña de Vacunación', 'Vacunas disponibles en centro de salud local.');
        this.agregarNotificacion('Consejo de Salud', 'Mantener higiene y descansar adecuadamente.');
        this.agregarNotificacion('Alerta Sanitaria', 'Precaución por brote estacional.');
    }
}