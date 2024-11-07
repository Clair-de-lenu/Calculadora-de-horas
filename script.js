window.onload = cargarDatos;

const inputs = document.querySelectorAll('#horaInicio, #horaFin, #descanso');
inputs.forEach(input => input.addEventListener('input', verificarDatosCompletos));

function calcularHoras() {
    const { horaInicio, horaFin, descanso } = obtenerValores();

    const mensaje = (horaInicio && horaFin)
        ? calcularDiferencia(horaInicio, horaFin, descanso)
        : 'Por favor, ingresa ambas horas y el descanso.';
    
    document.getElementById('resultado').textContent = mensaje;
    guardarDatos();
}

function obtenerValores() {
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;
    const descanso = parseInt(document.getElementById('descanso').value) || 0;
    return { horaInicio, horaFin, descanso };
}

function calcularDiferencia(horaInicio, horaFin, descanso) {
    const inicio = new Date(`1970-01-01T${horaInicio}:00`);
    const fin = new Date(`1970-01-01T${horaFin}:00`);
    let diferencia = fin - inicio;

    if (diferencia < 0) {
        fin.setDate(fin.getDate() + 1);
        diferencia = fin - inicio;
    }

    diferencia -= descanso * 60 * 1000;

    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `Horas trabajadas: ${horas} horas y ${minutos} minutos, con ${descanso} minutos de descanso descontados.`;
}

function verificarDatosCompletos() {
    const completo = [...inputs].every(input => input.value);
    document.getElementById('calcular-btn').disabled = !completo;
}

function guardarDatos() {
    const datos = obtenerValores();
    localStorage.setItem('horasTrabajo', JSON.stringify(datos));
}

function cargarDatos() {
    const datosGuardados = JSON.parse(localStorage.getItem('horasTrabajo'));
    if (datosGuardados) {
        document.getElementById('horaInicio').value = datosGuardados.horaInicio || '';
        document.getElementById('horaFin').value = datosGuardados.horaFin || '';
        document.getElementById('descanso').value = datosGuardados.descanso || '';
        verificarDatosCompletos();
    }
}
