// Funciones para interactuar con el backend y mostrar mensajes al usuario

// Crear matriz de producción
document.getElementById('crearMatriz').addEventListener('click', () => {
    const numVacas = document.getElementById('numVacas').value;

    if (numVacas < 3 || numVacas > 50 || isNaN(numVacas)) {
        alert('Por favor ingrese un número de vacas entre 3 y 50.');
        return;
    }

    fetch('/api/produccion/crear-matriz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ N: numVacas })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            document.getElementById('ingresoProduccion').style.display = 'block';
            generarCamposProduccion(numVacas); 
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(err => console.error('Error:', err));
});

// Generar campos para ingresar la producción de las vacas
function generarCamposProduccion(numVacas) {
    const vacasContainer = document.getElementById('vacasContainer');
    vacasContainer.innerHTML = ''; 

    for (let i = 1; i <= numVacas; i++) {
        const label = document.createElement('label');
        label.textContent = `Vaca ${i}: `;
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `vaca${i}`;
        input.placeholder = `Producción vaca ${i}`;
        input.min = 0.0;
        input.max = 11.9;
        input.step = 0.1;
        vacasContainer.appendChild(label);
        vacasContainer.appendChild(input);
        vacasContainer.appendChild(document.createElement('br')); 
    }
}

// Mostrar campos para ingresar la producción de las vacas
document.getElementById('ingresarProduccion').addEventListener('click', () => {
    const dia = document.getElementById('dia').value;
    const vacasContainer = document.getElementById('vacasContainer');
    const numVacas = document.querySelectorAll('#vacasContainer input').length;

    if (dia < 1 || dia > 7 || isNaN(dia)) {
        alert('Por favor ingrese un día entre 1 y 7.');
        return;
    }

    const produccion = [];
    for (let i = 1; i <= numVacas; i++) {
        const produccionVaca = document.getElementById(`vaca${i}`).value;
        if (produccionVaca < 0 || produccionVaca > 11.9 || isNaN(produccionVaca)) {
            alert(`Por favor ingrese una producción válida para la vaca ${i} (0.0 - 11.9).`);
            return;
        }
        produccion.push(parseFloat(produccionVaca));
    }

    fetch('/api/produccion/ingresar-produccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dia, produccion })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(err => console.error('Error:', err));
});

// Mostrar producción total por día
document.getElementById('verProduccionTotal').addEventListener('click', () => {
    fetch('/api/produccion/produccion-total')
    .then(response => response.json())
    .then(data => {
        if (data.produccionTotalPorDia) {
            alert(`Producción Total por Día: ${data.produccionTotalPorDia.join(', ')}`);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Hubo un problema al obtener la producción total.');
    });
});

// Mostrar vacas con mayor producción por día
document.getElementById('verVacaTopDia').addEventListener('click', () => {
    fetch('/api/produccion/vaca-top-dia')
    .then(response => response.json())
    .then(data => {
        if (data.vacaTopPorDia) {
            let mensaje = "Vacas con mayor producción por día:\n";
            data.vacaTopPorDia.forEach((vacas, index) => {
                mensaje += `Día ${index + 1}: ${vacas.join(', ')}\n`;
            });
            alert(mensaje);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Hubo un problema al obtener las vacas top por día.');
    });
});

// Mostrar día de mayor y menor producción
document.getElementById('verMaxMinProduccion').addEventListener('click', () => {
    fetch('/api/produccion/max-min-produccion')
    .then(response => response.json())
    .then(data => {
        if (data.diaMaximaProduccion && data.diaMinimaProduccion) {
            alert(`Día de mayor producción: ${data.diaMaximaProduccion}\nDía de menor producción: ${data.diaMinimaProduccion}`);
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Hubo un problema al obtener el día de mayor y menor producción.');
    });
});