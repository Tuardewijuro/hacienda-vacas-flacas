const express = require('express');
const dotenv = require('dotenv');
const productionRoutes = require('./routes/rutas-produccion');

// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Hacienda Las 7 Vacas Flacas');
});

// Usar las rutas de producción
app.use('/api/production', productionRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});