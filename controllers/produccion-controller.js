const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../produccion.json');

const leerDatos = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

const guardarDatos = (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataPath, jsonData);
};

// Controladores para las rutas
// Endpoints POST

// Crear la matriz de producción
exports.crearMatriz = (req, res) => {
    const { N } = req.body;

    if (N < 3 || N > 50) {
        return res.status(400).json({
            error: 'El número de vacas debe estar entre 3 y 50.'
        });
    }

    const matriz = Array.from({ length: 7 }, () => Array(N).fill(0.0));

    const datos = {
        vacas: N,
        produccion: matriz
    };
    guardarDatos(datos);

    res.status(201).json({
        message: `Matriz creada exitosamente con ${N} vacas.`,
        matriz
    });
};

// Ingresar la producción de una vaca
exports.ingresarProduccion = (req, res) => {
    const { dia, produccion } = req.body;

    if (dia < 1 || dia > 7) {
        return res.status(400).json({
            error: 'El día debe estar entre 1 y 7.'
        });
    }

    const datos = leerDatos();

    if (Number(produccion.length) !== Number(datos.vacas)) {
        return res.status(400).json({
            error: `Se esperaban ${datos.vacas} vacas, pero se recibió ${produccion.length}.`
        });
    }

    for (let i = 0; i < produccion.length; i++) {
        if (produccion[i] < 0 || produccion[i] > 11.9) {
            return res.status(400).json({
                error: `La producción de la vaca ${i + 1} está fuera del rango permitido (0.0 - 11.9 litros).`
            });
        }
    }

    datos.produccion[dia - 1] = produccion;

    guardarDatos(datos);

    res.status(200).json({
        message: `Producción registrada con éxito para el día ${dia}.`
    });
};

// Endpoints GET

// Obtener producción total por día
exports.getProduccionTotal = (req, res) => {
    try {
        const datos = leerDatos(); 

        if (!datos.produccion || datos.produccion.length === 0) {
            return res.status(400).json({
                error: 'No se ha registrado producción aún.'
            });
        }

        const produccionTotalPorDia = datos.produccion.map(dia => dia.reduce((a, b) => a + b, 0));

        return res.json({
            produccionTotalPorDia
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al leer los datos de producción.'
        });
    }
};

// Obtener día de mayor y menor producción
exports.getMaxMinProduccion = (req, res) => {
    try {
        const datos = leerDatos();  

        if (!datos.produccion || datos.produccion.length === 0) {
            return res.status(400).json({
                error: 'No se ha registrado producción aún.'
            });
        }

        const produccionTotalPorDia = datos.produccion.map(dia => dia.reduce((a, b) => a + b, 0));

        const diaMaximaProduccion = produccionTotalPorDia.indexOf(Math.max(...produccionTotalPorDia)) + 1;
        const diaMinimaProduccion = produccionTotalPorDia.indexOf(Math.min(...produccionTotalPorDia)) + 1;

        return res.json({
            diaMaximaProduccion: `Día ${diaMaximaProduccion}`,
            diaMinimaProduccion: `Día ${diaMinimaProduccion}`
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al leer los datos de producción.'
        });
    }
};

// Obtener la vaca que más produjo por día
exports.getVacaTopDia = (req, res) => {
    try {
        const datos = leerDatos(); 

        if (!datos.produccion || datos.produccion.length === 0) {
            return res.status(400).json({
                error: 'No se ha registrado producción aún.'
            });
        }
        const vacaTopPorDia = datos.produccion.map(dia => {
            const maxProduccion = Math.max(...dia); 
            return dia
                .map((produccion, index) => (produccion === maxProduccion ? `Vaca ${index + 1}` : null))
                .filter(vaca => vaca !== null); 
        });

        return res.json({
            vacaTopPorDia
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al leer los datos de producción.'
        });
    }
};