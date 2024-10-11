function calcularHoras() {
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;

    if (horaInicio && horaFin) {
        const inicio = new Date(`1970-01-01T${horaInicio}:00`);
        const fin = new Date(`1970-01-01T${horaFin}:00`);

        let diferencia = fin - inicio;

        // Si la hora de fin es menor a la de inicio, consideramos que el turno pasa a la medianoche
        if (diferencia < 0) {
            fin.setDate(fin.getDate() + 1); // Añadimos un día
            diferencia = fin - inicio;
        }

        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('resultado').textContent = `Horas trabajadas: ${horas} horas y ${minutos} minutos.`;
    } else {
        document.getElementById('resultado').textContent = 'Por favor, ingresa ambas horas.';
    }
}