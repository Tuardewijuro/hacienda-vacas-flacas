const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productionRoutes = require('./routes/rutas-produccion');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/produccion', productionRoutes);

app.use(express.static('frontend'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});